import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "../database";
import { ApiError } from "../exceptions/errorApi";
import { BookingCreateDto } from '../types/booking.types';
import { formatDate, formatTime } from "../utils/dateUtil";

class BookingsService {
    private normalizeDate({date, startTime, endTime}: {date: string, startTime: string, endTime: string}) {
        const dateTime = new Date(date)
        const startDateTime = `${date}T${startTime}:00`
        const endDateTime = `${date}T${endTime}:00`
        return {
            date: dateTime,
            startTime: new Date(startDateTime),
            endTime: new Date(endDateTime)
        }
    }    

    private createResponse({id, date, startTime, endTime}: {id: number, date: Date, startTime: Date, endTime: Date}){
        const formattedDate = formatDate(date);
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);    
        return {
            id,
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime
        }
    }

    private async isTimeSlotAvailable(date: Date, startTime: Date, endTime: Date): Promise<boolean> {
        const overlappingBookings = await prisma.booking.findMany({
            where: {
                date: date,
                OR: [
                    {
                        startTime: { lt: endTime },
                        endTime: { gt: startTime },
                    },
                ],
            },
        });

        return overlappingBookings.length === 0;
    }    

    async getOne(id: number, userId: number) {
        try{
            const booking = await prisma.booking.findUnique({
                where: {
                    id,
                    userId
                },
                include: {
                    user: true
                }
            })
            if (!booking) throw ApiError.BadRequest("Booking record not found")
            return this.createResponse(booking)
        }catch(error){
            if (error instanceof PrismaClientKnownRequestError) {
                throw ApiError.BadRequest(`${error.meta!.cause}`)
            }
            throw ApiError.BadRequest("Some error while getting one booking record", [error])
        }
    }


    async create(bookingCreateData: BookingCreateDto, userId: number) {
        const {date, startTime, endTime} = this.normalizeDate(bookingCreateData)

        const isAvailable = await this.isTimeSlotAvailable(date, startTime, endTime)
        if (!isAvailable) throw ApiError.BadRequest('This time slot overlaps with an existing one')

        const newBooking = await prisma.booking.create({
                data: {
                    date,
                    startTime,
                    endTime,
                    user: {
                        connect: { id: userId },
                    },
                },
                include: {
                    user: true
                }
            });
        const response = this.createResponse(newBooking)    
        return  {
            ...response,
            user: newBooking.user.username
        } 
    }

    async deleteOne (id: number, userId: number) {
        try{
            const deletedBooking = await prisma.booking.delete({
                where: { 
                    id, 
                    userId,
                }
            })
            return this.createResponse(deletedBooking)
        }catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw ApiError.BadRequest(`${error.meta!.cause}`)
            }
            throw ApiError.BadRequest('Some unexpected error', [error])
        }
        
    }

    async getAll(userId: number){
        try{
            const bookings = await prisma.booking.findMany({
                where: {
                    userId
                }
            })
            return bookings.map(this.createResponse)
        }catch(error){
            throw ApiError.BadRequest('Some error while getting all bookings.')
        }
    }
}

export default new BookingsService ()
