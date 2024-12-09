import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/errorApi";
import tokenService from "../services/tokenService";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeaders = req.headers.authorization
        if(!authHeaders){
            return next(ApiError.UnauthorizedError())
        }
        
        const accessToken = authHeaders.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
    
        const userData = await tokenService.validate(accessToken) 
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next();
    } catch(error) {
        return next(ApiError.UnauthorizedError())
    }
}