const mongoose = require('mongoose')

const orderItemSchema = mongoose.Schema({
    title: String,
    mainImg: String,
    quantity: Number,
    price: Number
}, {_id: false });

const orderSchema = mongoose.Schema({
    email: String,
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true
    }
}, {timestamps: true, _id: true})

module.exports = mongoose.model('Order', orderSchema);