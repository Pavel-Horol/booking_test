import { NextFunction, Request, Response } from "express";
import authService from "../services/authService";
import { body } from "express-validator";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body;
            const loginResponse = await authService.login(username, password)
            res.json(loginResponse)
        }catch (error) {
            next(error)
        }
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body;
            const registrationResponse = await authService.registration(username, password)
            res.json(registrationResponse)
        }catch (error) {
            next(error)
        }
    }
}

export default new AuthController ()