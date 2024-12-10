import { Router } from "express";
import bookingRouter from './bookingsRouter'
import authRouter from './authRouter'
import authMiddleware from "../middlewares/auth";

const router = Router()

router.use('/bookings', authMiddleware ,bookingRouter)
router.use('/auth', authRouter)


export default router