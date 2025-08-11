const express = require('express');
const { createRideHandler, updateRideStatusHandler, getRideByIdHandler } = require('../controllers/rideController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createRideHandler);
router.put('/:id/status', protect, updateRideStatusHandler);
router.get('/:id', protect, getRideByIdHandler);

module.exports = router;
