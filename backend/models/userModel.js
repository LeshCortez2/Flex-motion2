const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

async function createUser(name, email, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();
  const query = `
    INSERT INTO users (id, name, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, role
  `;
  const values = [id, name, email, hashedPassword, role];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

async function comparePassword(enteredPassword, storedPassword) {
  return await bcrypt.compare(enteredPassword, storedPassword);
}

module.exports = { createUser, findUserByEmail, comparePassword };
