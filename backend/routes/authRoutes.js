// const express = require('express');
// const router = express.Router();

// router.get('/test', (req, res) => {
//   res.json({ message: 'Test route working' });
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust path based on your file structure

const router = express.Router();

// POST /api/signup - Register a new user
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token (optional, can be used for authentication later)
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ success: true, token });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
