import prisma from "../database";
import { BookingCreateDto } from "../types/booking.types";

class BookingsService {
    async create(bookingCreateData: BookingCreateDto, userId: number) {
        const { date, startTime, endTime } = bookingCreateData;

        const bookingDate = new Date(date); 
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDateTime = new Date(bookingDate);
        startDateTime.setHours(startHours, startMinutes);

        const endDateTime = new Date(bookingDate);
        endDateTime.setHours(endHours, endMinutes);

        const newBooking = await prisma.booking.create({
            data: {
                date: bookingDate,
                startTime: startDateTime,
                endTime: endDateTime,
                user: {
                    connect: { id: userId },
                },
            },
        });
        return newBooking
    }

}

export default new BookingsService ()