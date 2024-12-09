import { Router } from "express";
import authController from "../controllers/authController";
import { loginValidation, registrationValidation } from "../validations/auth";
import { validateRequest } from "../middlewares/validation";

const router = Router()


router.post('/login',
    loginValidation,
    validateRequest,
    authController.login
)
router.post('/registration',
    registrationValidation,
    validateRequest,
    authController.registration
)

export default router