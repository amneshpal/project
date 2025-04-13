// Example: Controller for orders
const Order = require('../models/Order'); // Ensure that Order model is created

// Get all orders (just an example, you can adjust this based on your needs)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error getting orders:", err);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, userId } = req.body; // Assume these fields are sent from frontend
    const newOrder = new Order({ productId, quantity, userId });
    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', newOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: 'Error creating order' });
  }
};
