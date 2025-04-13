const express = require('express');
const { getOrders, createOrder } = require('../controllers/orderController');
const router = express.Router();

// Route to get all orders
router.get('/', getOrders);

// Route to create a new order
router.post('/', createOrder);

module.exports = router;
