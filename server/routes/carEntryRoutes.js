const express = require('express');
const { registerCarEntry, exitCar } = require('../controllers/carEntryController.js');
const { protect } = require('../middleware/auth.js');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Car Entries
 *   description: Managing car entries and exits
 */

/**
 * @swagger
 * /api/entries:
 *   post:
 *     summary: Register a car entry
 *     security:
 *       - bearerAuth: []
 *     tags: [Car Entries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *               - parkingCode
 *             properties:
 *               plateNumber:
 *                 type: string
 *                 example: RAB123A
 *               parkingCode:
 *                 type: string
 *                 example: PKG001
 *     responses:
 *       200:
 *         description: Car entered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car entered
 *                 ticket_id:
 *                   type: integer
 *                   example: 123456
 *       400:
 *         description: Parking not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parking not available
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error during car entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /api/entries/exit:
 *   post:
 *     summary: Register a car exit
 *     security:
 *       - bearerAuth: []
 *     tags: [Car Entries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *             properties:
 *               plateNumber:
 *                 type: string
 *                 example: RAB123A
 *     responses:
 *       200:
 *         description: Car exited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Car exited
 *                 durationHours:
 *                   type: number
 *                   example: 3
 *                 charge:
 *                   type: number
 *                   example: 1500
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Car entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Entry not found
 *       500:
 *         description: Server error during car exit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */

router.post('/', protect, registerCarEntry);
router.post('/exit', protect, exitCar);

module.exports = router;
