const { createRide, updateRideStatus, getRideById } = require('../models/rideModel');

// @desc    Create a ride
async function createRideHandler(req, res) {
  try {
    const { startLocation, endLocation, polyline } = req.body;
    const ride = await createRide(req.user.id, startLocation, endLocation, polyline);
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Update ride status
async function updateRideStatusHandler(req, res) {
  try {
    const { status } = req.body;
    const updatedRide = await updateRideStatus(req.params.id, status);
    res.json(updatedRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Get ride by ID
async function getRideByIdHandler(req, res) {
  try {
    const ride = await getRideById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createRideHandler, updateRideStatusHandler, getRideByIdHandler };
