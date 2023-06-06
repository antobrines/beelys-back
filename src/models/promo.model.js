const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const PromoModel = mongoose.Schema({
  code: {
    type: types.String,
    unique: true,
    required: true
  },
  pourcent: {
    type: types.Number,
    required: true
  },
  expirationDate: {
    type: types.Date,
    required: true
  },
  startDate: {
    type: types.Date,
    required: true
  },
  minSold: {
    type: types.Number,
    required: false
  },
  minProduct: {
    type: types.Number,
    required: false
  },
});

const Promo = mongoose.model('Promo', PromoModel);

module.exports = Promo;