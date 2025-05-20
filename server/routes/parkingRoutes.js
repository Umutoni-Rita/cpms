const express = require('express');
const router = express.Router();
const {
  createParking,
  getAllParking,
  getParkingById,
  updateParking,
  deleteParking
} = require('../controllers/parkingController');
const { protect, restrictTo } = require('../middleware/auth');

// Only ADMIN can create, update, delete
router.post('/', protect, restrictTo('ADMIN'), createParking);
router.put('/:id', protect, restrictTo('ADMIN'), updateParking);
router.delete('/:id', protect, restrictTo('ADMIN'), deleteParking);

// Any authenticated user can view
router.get('/', protect, getAllParking);
router.get('/:id', protect, getParkingById);

/**
 * @swagger
 * /api/parking:
 *   post:
 *     summary: Create a new parking lot
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - location
 *               - spaces
 *               - fee
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               spaces:
 *                 type: integer
 *               fee:
 *                 type: number
 *     responses:
 *       201:
 *         description: Parking created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Parking'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, restrictTo('ADMIN'), createParking);

/**
 * @swagger
 * /api/parking:
 *   get:
 *     summary: Get all parking places (paginated)
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         required: false
 *         description: Results per page
 *     responses:
 *       200:
 *         description: A list of parking lots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Parking'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pages:
 *                   type: integer
 */
router.get('/', protect, getAllParking);


module.exports = router;
