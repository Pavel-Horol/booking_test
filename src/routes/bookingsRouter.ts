import { Router } from "express";
import { ApiError } from "../exceptions/errorApi";
import authMiddleware from "../middlewares/auth";

const router = Router()


router.post('/',
    authMiddleware,
    (req, res) => {
        console.log(req.user)
        res.send('Protected route')
    }
)
router.get('/')
router.get('/:id')
router.put('/:id')
router.delete('/:id')

export default router