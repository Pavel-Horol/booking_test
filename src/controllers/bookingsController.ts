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

        }catch (error) {
            next(error)
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {

        }catch (error) {
            next(error)
        }
    }

    async deleteOne(req: Request, res: Response, next: NextFunction) {
        try {

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