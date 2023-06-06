const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  first_name: {
    type: types.String,
    required: true,
  },
  last_name: {
    type: types.String,
    required: true,
  },
  password: {
    type: types.String,
    required: true,
  },
  birth_date: {
    type: types.Date
  },
  phone_number: {
    type: types.String,
    required: true,
  },
  url_image: {
    type: types.String,
  },
  roles: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
    }, ],
    default: ['61b9b2e710188275524b9edb'],
  },
  is_validate: {
    type: types.Boolean,
    required: true,
    default: false,
  },
  email: {
    type: types.String,
    required: true,
    unique: true,
  },
  address: {
    type: types.String,
    required: true
  },
  city: {
    type: types.String,
    required: true
  },
  zip_code: {
    type: types.Number,
    required: true
  },
  customer_id: {
    type: types.String,
    required: false
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;