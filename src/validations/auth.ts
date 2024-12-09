import { body } from "express-validator";

export const registrationValidation = [
    body('username')
        .notEmpty()
        .withMessage('Please enter username'),
    body('password')
        .isLength({min: 4, max: 12})
        .withMessage('Password must be within 4 and 12 characters')
]

export const loginValidation = [
    body('username')
        .notEmpty()
        .withMessage('Please enter username'),
    body('password')
        .isLength({min: 4, max: 12})
        .withMessage('Password must be within 4 and 12 characters')
]