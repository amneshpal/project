// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Routes for user signup/login
const productRoutes = require('./routes/productRoutes'); // Routes for product management
const orderRoutes = require('./routes/orderRoutes'); // Routes for order management
const adminRoutes = require('./routes/adminRoutes'); // Routes for admin panel
const auth = require('./middleware/auth'); // Authentication middleware to protect routes
const cors = require('cors'); // CORS middleware for handling cross-origin requests

dotenv.config();

const app = express();

// Middleware for parsing JSON bodies and enabling CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes Setup

// Public routes for signup/login
app.use('/api/auth', userRoutes);

// Product routes (Public or Vendor-specific)
app.use('/api/products', productRoutes);  // Public access or restricted by role in the route

// Protected routes for Vendor (authentication required)
app.use('/api/vendor', auth, productRoutes); // Protected for vendors

// Protected routes for Orders (authentication required for customers)
app.use('/api/orders', auth, orderRoutes); // Protected for customers

// Protected routes for Admin (authentication required for admin)
app.use('/api/admin', auth, adminRoutes); // Protected for admin

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
