const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const ProductSchema = mongoose.Schema({
  name: {
    type: types.String,
    required: true,
    unique: true
  },
  price: {
    type: types.Number,
    required: true
  },
  image_url: {
    type: types.String,
    required: true
  },
  type: {
    type: [{
      type: types.String
    }],
    required: true
  },
  products: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  allergen: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Allergen'
    }]
  },
  state: {
    type: types.String
  },
  description: {
    type: types.String,
    required: true
  },
  slug: {
    type: types.String,
    required: true,
    unique: true
  },
  id_stripe: {
    type: types.String,
    required: true,
    unique: true
  },
  price_stripe: {
    type: types.String,
    required: false,
    unique: true
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;