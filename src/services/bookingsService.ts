import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../database";
import { ApiError } from "../exceptions/errorApi";
import { BookingCreateDto, BookingUpdateDto } from "../types/booking.types";
import { formatDate, formatTime } from "../utils/dateUtil";

class BookingsService {

    normalizeDate({ date, startTime, endTime }: { date: string; startTime: string; endTime: string }) {
        const startDateTime = new Date(`${date}T${startTime}:00`);
        const endDateTime = new Date(`${date}T${endTime}:00`);
        return {
            date: new Date(date),
            startTime: startDateTime,
            endTime: endDateTime,
        };
    }

    createResponse({ id, date, startTime, endTime }: { id: number; date: Date; startTime: Date; endTime: Date }) {
        return {
            id,
            date: formatDate(date),
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
        };
    }

    async isTimeSlotAvailable(date: Date, startTime: Date, endTime: Date, excludeId?: number): Promise<boolean> {
        const overlappingBookings = await prisma.booking.findMany({
            where: {
                date,
                AND: [
                    { id: { not: excludeId } },
                    {
                        OR: [
                            { startTime: { lt: endTime }, endTime: { gt: startTime } },
                        ],
                    },
                ],
            },
        });
        return overlappingBookings.length === 0;
    }

    async getOne(id: number, userId: number) {
        try {
            const booking = await prisma.booking.findUnique({
                where: { id, userId },
                include: { user: true },
            });

            if (!booking) throw ApiError.BadRequest("Booking record not found");
            return this.createResponse(booking);
        } catch (error) {
            this.handlePrismaError(error, "Some error while getting one booking record");
        }
    }

    async create(bookingCreateData: BookingCreateDto, userId: number) {
        const { date, startTime, endTime } = this.normalizeDate(bookingCreateData);

        if (!(await this.isTimeSlotAvailable(date, startTime, endTime))) {
            throw ApiError.BadRequest("This time slot overlaps with an existing one");
        }

        const newBooking = await prisma.booking.create({
            data: {
                date,
                startTime,
                endTime,
                user: { connect: { id: userId } },
            },
            include: { user: true },
        });

        return {
            ...this.createResponse(newBooking),
            user: newBooking.user.username,
        };
    }

    async update(id: number, bookingUpdateData: BookingUpdateDto, userId: number) {
        const existingBooking = await prisma.booking.findUnique({ where: { id, userId } });

        if (!existingBooking) { throw ApiError.BadRequest("Booking record not found"); }

        const { date, startTime, endTime } = bookingUpdateData;

        if (date && startTime && endTime) {
            const normalizedData = this.normalizeDate({ date, startTime, endTime });
            const { date: normalizedDate, startTime: normalizedStartTime, endTime: normalizedEndTime } = normalizedData;

            if (!(await this.isTimeSlotAvailable(normalizedDate, normalizedStartTime, normalizedEndTime, id))) {
                throw ApiError.BadRequest("This time slot overlaps with an existing one");
            }

            const updatedBooking = await prisma.booking.update({
                where: { id },
                data: {
                    date: normalizedDate,
                    startTime: normalizedStartTime,
                    endTime: normalizedEndTime,
                },
            });

            return this.createResponse(updatedBooking);
        }

        throw ApiError.BadRequest("Invalid data provided for update");
    }


    async deleteOne(id: number, userId: number) {
        try {
            const deletedBooking = await prisma.booking.delete({
                where: { id, userId },
            });

            return this.createResponse(deletedBooking);
        } catch (error) {
            this.handlePrismaError(error, "Some unexpected error while deleting booking");
        }
    }

    async getAll(userId: number) {
        try {
            const bookings = await prisma.booking.findMany({ where: { userId } });
            return bookings.map(this.createResponse);
        } catch (error) {
            throw ApiError.BadRequest("Some error while getting all bookings.", [error]);
        }
    }

    private handlePrismaError(error: unknown, defaultMessage: string) {
        if (error instanceof PrismaClientKnownRequestError) {
            throw ApiError.BadRequest(JSON.stringify(error.meta?.cause) || defaultMessage);
        }
        throw ApiError.BadRequest(defaultMessage, [error]);
    }
}

export default new BookingsService();
