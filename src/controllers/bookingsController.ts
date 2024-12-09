import { NextFunction, Request, Response } from "express"

class BookingsController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {

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