import { Router } from "express";
import bookingRouter from './bookingsRouter'
import authRouter from './authRouter'

const router = Router()

router.use('/bookings', bookingRouter)
router.use('/auth', authRouter)


export default router