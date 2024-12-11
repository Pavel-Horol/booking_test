import { Router } from "express";
import { ApiError } from "../exceptions/errorApi";
import authMiddleware from "../middlewares/auth";
import bookingsController from "../controllers/bookingsController";
import { bookingValidation } from "../validations/booking";
import { validateRequest } from "../middlewares/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Booking
 *     description: Endpoints for managing bookings.
 *   - name: Auth
 *     description: Endpoints for user authentication.
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking with date, start time, and end time.
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the booking in YYYY-MM-DD format.
 *               startTime:
 *                 type: string
 *                 format: time
 *                 example: "15:20"
 *                 description: The start time of the booking in HH:mm format.
 *               endTime:
 *                 type: string
 *                 format: time
 *                 example: "16:20"
 *                 description: The end time of the booking in HH:mm format.
 *     responses:
 *       201:
 *         description: Successfully created the booking.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created booking.
 *                 date:
 *                   type: string
 *                   format: date
 *                   description: The date of the booking.
 *                 startTime:
 *                   type: string
 *                   format: time
 *                   example: "15:20"
 *                   description: The start time of the booking.
 *                 endTime:
 *                   type: string
 *                   format: time
 *                   example: "16:20"
 *                   description: The end time of the booking.
 *                 user:
 *                   type: string
 *                   example: "Nagibator2005"
 *                   description: The user who made the booking.
 *       400:
 *         description: Bad request, validation failed.
 *       401:
 *         description: Unauthorized, user not authenticated.
 *       500:
 *         description: Server error.
 */
router.post("/", bookingValidation, validateRequest, bookingsController.create);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings.
 *     security:
 *       - bearerAuth: []
 *     tags: [Booking]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of bookings.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   date:
 *                     type: string
 *                     format: date
 *                   startTime:
 *                     type: string
 *                     example: "15:20"
 *                   endTime:
 *                     type: string
 *                     example: "16:20"
 */
router.get("/", bookingsController.getAll);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     description: Retrieve a booking by its unique ID.
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique ID of the booking.
 *     responses:
 *       200:
 *         description: Successfully retrieved the booking.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 startTime:
 *                   type: string
 *                   example: "15:20"
 *                 endTime:
 *                   type: string
 *                   example: "16:20"
 *       404:
 *         description: Booking not found.
 *
 */
router.get("/:id", bookingsController.getOne);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update a booking by ID
 *     description: This endpoint allows updating a booking by its ID.
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The booking ID.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: The new date for the booking.
 *               time:
 *                 type: string
 *                 description: The new time for the booking.
 *     responses:
 *       200:
 *         description: Successfully updated the booking.
 *       400:
 *         description: Bad request, validation failed.
 *       404:
 *         description: Booking not found.
 */
router.put("/:id", bookingsController.updateOne);

/**
 * @swagger
 * /bookings/{id}:
 *  delete:
 *     summary: Delete booking by ID
 *     description: Delete a booking by its unique ID.
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique ID of the booking.
 *     responses:
 *       200:
 *         description: Successfully deleted the booking.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 date:
 *                   type: string
 *                   format: date
 *                 startTime:
 *                   type: string
 *                   example: "15:20"
 *                 endTime:
 *                   type: string
 *                   example: "16:20"
 *       404:
 *         description: Booking not found.
 */
router.delete("/:id", bookingsController.deleteOne);

export default router;
