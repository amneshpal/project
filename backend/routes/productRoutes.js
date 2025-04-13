// // routes/productRoutes.js

// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');
// const auth = require('../middleware/auth');
// const authorize = require('../middleware/authorize'); // ✅ Correct middleware

// // ✅ Create a product (Vendor only)
// router.post('/', auth, authorize('vendor'), async (req, res) => {
//   const { name, price, stock, category } = req.body;
//   try {
//     const product = new Product({
//       name,
//       price,
//       stock,
//       category,
//       vendorId: req.user.id,
//       createdAt: new Date()
//     });
//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     console.error('Product creation error:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ✅ Get current vendor's products
// router.get('/mine', auth, authorize('vendor'), async (req, res) => {
//   try {
//     const products = await Product.find({ vendorId: req.user.id });
//     res.json(products);
//   } catch (err) {
//     console.error('Fetch error:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ✅ Update product
// router.put('/:id', auth, authorize('vendor'), async (req, res) => {
//   const { name, price, stock, category } = req.body;
//   try {
//     const product = await Product.findOne({ _id: req.params.id, vendorId: req.user.id });
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     Object.assign(product, { name, price, stock, category });
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     console.error('Update error:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // ✅ Delete product
// router.delete('/:id', auth, authorize('vendor'), async (req, res) => {
//   try {
//     const product = await Product.findOneAndDelete({ _id: req.params.id, vendorId: req.user.id });
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     console.error('Delete error:', err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize'); // role-based middleware

// ✅ Create a product (Vendor only)
router.post('/', auth, authorize('vendor'), async (req, res) => {
  const { name, price, stock, category } = req.body;
  try {
    const product = new Product({
      name,
      price,
      stock,
      category,
      vendorId: req.user.id
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Product creation error:', err);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
});

// ✅ Get current vendor's products
router.get('/mine', auth, authorize('vendor'), async (req, res) => {
  try {
    const products = await Product.find({ vendorId: req.user.id });
    res.json(products);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// ✅ Update product
router.put('/:id', auth, authorize('vendor'), async (req, res) => {
  const { name, price, stock, category } = req.body;
  try {
    const product = await Product.findOne({ _id: req.params.id, vendorId: req.user.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    Object.assign(product, { name, price, stock, category });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('❌ Update error:', err);
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
});

// ✅ Delete product
router.delete('/:id', auth, authorize('vendor'), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, vendorId: req.user.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
});

module.exports = router;
