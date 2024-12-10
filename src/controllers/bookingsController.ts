import { NextFunction, Request, Response } from "express"
import bookingsService from "../services/bookingsService"

class BookingsController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const bookingCreateData = req.body

            const newBooking = await bookingsService.create(bookingCreateData, userId)
            
            res.status(201).json(newBooking)
        }catch (error) {
            next(error)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const bookings = await bookingsService.getAll(userId)
            res.json(bookings) 
        }catch (error) {
            next(error)
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const id = req.params.id
            const booking = await bookingsService.getOne(+id, userId)
            res.json(booking)
        }catch (error) {
            next(error)
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user.id
            const id = req.params.id
            const deletedBooking = await bookingsService.deleteOne(+id, userId)
            res.json(deletedBooking)
        }catch (error) {
            next(error)
        }
    }

    async updateOne(req: Request, res: Response, next: NextFunction) {
        try {

        }catch (error) {
            next(error)
        }
    }
}

export default new BookingsController ()