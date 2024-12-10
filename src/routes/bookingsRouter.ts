import { Router } from "express";
import { ApiError } from "../exceptions/errorApi";
import authMiddleware from "../middlewares/auth";
import bookingsController from "../controllers/bookingsController";
import { bookingValidation } from "../validations/booking";
import { validateRequest } from "../middlewares/validation";

const router = Router()


router.post(
    '/', 
    bookingValidation,
    validateRequest,
    bookingsController.create
)

router.get('/', bookingsController.getAll)
router.get('/:id', bookingsController.getOne)
router.put('/:id', bookingsController.updateOne)
router.delete('/:id', bookingsController.deleteOne)

export default router