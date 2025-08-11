const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

async function createRide(driverId, startLocation, endLocation, polyline) {
  const id = uuidv4();
  const query = `
    INSERT INTO rides (id, driver_id, start_location, end_location, polyline, status)
    VALUES ($1, $2, $3, $4, $5, 'pending')
    RETURNING *
  `;
  const values = [id, driverId, startLocation, endLocation, polyline];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function updateRideStatus(rideId, status) {
  const { rows } = await db.query(
    `UPDATE rides SET status = $1 WHERE id = $2 RETURNING *`,
    [status, rideId]
  );
  return rows[0];
}

async function getRideById(rideId) {
  const { rows } = await db.query(`SELECT * FROM rides WHERE id = $1`, [rideId]);
  return rows[0];
}

module.exports = { createRide, updateRideStatus, getRideById };
