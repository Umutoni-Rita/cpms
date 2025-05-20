const express = require('express');
const { registerCarEntry, exitCar } = require('../controllers/carEntryController.js');
const {protect} = require('../middleware/auth.js')
const router = express.Router();

router.post('/', protect, registerCarEntry);
router.patch('/exit', protect, exitCar);

module.exports = router;