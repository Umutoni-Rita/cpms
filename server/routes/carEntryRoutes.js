import express from 'express';
import { registerCarEntry, exitCar } from '../controllers/carEntryController.js';
import { authenticate } from '../middlewares/auth.js'; // your JWT middleware

const router = express.Router();

router.post('/', authenticate, registerCarEntry);
router.patch('/exit', authenticate, exitCar);

export default router;
