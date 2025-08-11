const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

async function addRating(rideId, passengerId, driverId, stars, comment) {
  // Ensure passenger can only rate once per ride
  const existing = await db.query(
    `SELECT * FROM ratings WHERE ride_id = $1 AND passenger_id = $2`,
    [rideId, passengerId]
  );
  if (existing.rows.length > 0) {
    throw new Error('You have already rated this ride.');
  }

  const id = uuidv4();
  const query = `
    INSERT INTO ratings (id, ride_id, passenger_id, driver_id, stars, comment)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [id, rideId, passengerId, driverId, stars, comment];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function getDriverAverageRating(driverId) {
  const { rows } = await db.query(
    `SELECT AVG(stars) as average_rating FROM ratings WHERE driver_id = $1`,
    [driverId]
  );
  return rows[0].average_rating;
}

module.exports = { addRating, getDriverAverageRating };
