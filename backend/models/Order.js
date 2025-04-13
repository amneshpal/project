const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
  status: { type: String, default: 'Pending' },
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);