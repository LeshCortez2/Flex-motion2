const { createUser, findUserByEmail, comparePassword } = require('../models/userModel');
const { generateToken } = require('../config/auth');

// @desc    Register a new user
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await createUser(name, email, password, role || 'passenger');
    const token = generateToken(user);
    res.json({ ...user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// @desc    Login user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (user && await comparePassword(password, user.password)) {
      const token = generateToken(user);
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role, token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser, loginUser };
