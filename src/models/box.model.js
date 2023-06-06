const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const BoxSchema = mongoose.Schema({

  product: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  name: {
    type: types.String,
    required: true
  },
  premade: {
    type: types.Boolean,
    required: true
  },
  price: {
    type: types.Number,
    required: true
  }
});

const Box = mongoose.model('Box', BoxSchema);

module.exports = Box;