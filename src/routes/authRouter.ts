import { Router } from "express";
import authController from "../controllers/authController";
import { loginValidation, registrationValidation } from "../validations/auth";
import { validateRequest } from "../middlewares/validation";

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and get an access token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Nagibator2005"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *     responses:
 *       200:
 *         description: Successfully authenticated the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid credentials.
 */
router.post('/login',
    loginValidation,
    validateRequest,
    authController.login
);

/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: User registration
 *     description: Register a new user and get an access token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Nagibator2005"
 *               password:
 *                 type: string
 *                 example: "password1234"
 *     responses:
 *       201:
 *         description: Successfully registered the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       400:
 *         description: Bad request, validation failed.
 */
router.post('/registration',
    registrationValidation,
    validateRequest,
    authController.registration
);

export default router;
