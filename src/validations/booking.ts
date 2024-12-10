import { body } from "express-validator";
import { ApiError } from "../exceptions/errorApi";

export const bookingValidation = [
    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 date'),
    body('startTime')
        .notEmpty()
        .withMessage('Start time is required')
        .matches(/^([0-1]\d|2[0-3]|24):([0-5]\d)$/)
        .withMessage('Start time must be in HH:mm format'),
    body('endTime')
        .notEmpty()
        .withMessage('End time is required')
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('End time must be in HH:mm format')
        .custom((endTime, { req }) => {
            const [startHours, startMinutes] = req.body.startTime.split(':').map(Number);
            const [endHours, endMinutes] = endTime.split(':').map(Number);
            const startTotalMinutes = startHours * 60 + startMinutes;
            const endTotalMinutes = endHours * 60 + endMinutes;

            if (endTotalMinutes <= startTotalMinutes) 
                throw ApiError.BadRequest('Start time must be earlier than end time');
            return true;
        })
];