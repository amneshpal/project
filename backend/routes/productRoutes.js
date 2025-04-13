const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middlewares/auth');  // Correct the path here if needed

const router = express.Router();

// Example protected route
router.get('/products', authMiddleware.authenticate, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
