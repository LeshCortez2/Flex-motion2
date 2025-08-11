const express = require('express');
const { addRatingHandler, getDriverRatingHandler } = require('../controllers/ratingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addRatingHandler);
router.get('/:driverId', getDriverRatingHandler);

module.exports = router;
