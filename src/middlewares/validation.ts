import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../exceptions/errorApi";

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        next(ApiError.BadRequest("Validations failed", [errors.array()]))
    }
    next();
}