// authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be in .env
    req.user = decoded;  // Attach the user data to the request object
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
