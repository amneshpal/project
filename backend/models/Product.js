const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);