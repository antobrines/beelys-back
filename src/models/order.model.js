const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const OrderSchema = mongoose.Schema({
  date: {
    type: types.Date,
    required: true
  },
  price: {
    type: types.Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;