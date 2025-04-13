// routes/adminRoutes.js

const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Get revenue per vendor (Admin only)
router.get('/revenue-per-vendor', authorize('admin'), async (req, res) => {
  try {
    const revenueData = await Order.aggregate([
      { $unwind: '$items' },
      { $group: {
        _id: '$items.vendorId',
        revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
      }},
      { $sort: { revenue: -1 } },
    ]);
    res.json(revenueData);
  } catch (err) {
    res.status(400).json({ message: 'Error calculating revenue' });
  }
});

// Get top 5 products by sales (Admin only)
router.get('/top-products', authorize('admin'), async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: {
        _id: '$items.productId',
        totalSold: { $sum: '$items.quantity' },
      }},
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      { $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      }},
      { $unwind: '$product' },
      { $project: { _id: 1, totalSold: 1, productName: '$product.name' } },
    ]);
    res.json(topProducts);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching top products' });
  }
});

module.exports = router;
