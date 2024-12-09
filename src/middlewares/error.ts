import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { ApiError } from "../exceptions/errorApi";

const errorMiddleware: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        });
        return
    }
    console.log(err)
    res.status(500).json({
        message: "Unexpected error",
    });
}

export default errorMiddleware;
