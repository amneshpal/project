const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const { authenticate } = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', authenticate, productRoutes);
app.use('/api/orders', authenticate, orderRoutes);
app.use('/api/analytics', authenticate, analyticsRoutes);
module.exports = app;