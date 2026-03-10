const mongoose = require('mongoose');

const OrderDetailsSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('OrderDetails', OrderDetailsSchema);
