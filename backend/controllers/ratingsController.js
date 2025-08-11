const { addRating, getDriverAverageRating } = require('../models/ratingModel');

// @desc    Add rating for a driver
async function addRatingHandler(req, res) {
  try {
    const { rideId, driverId, stars, comment } = req.body;
    const rating = await addRating(rideId, req.user.id, driverId, stars, comment);
    res.json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// @desc    Get average rating for a driver
async function getDriverRatingHandler(req, res) {
  try {
    const averageRating = await getDriverAverageRating(req.params.driverId);
    res.json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addRatingHandler, getDriverRatingHandler };
