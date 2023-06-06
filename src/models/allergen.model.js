const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const AllergenSchema = mongoose.Schema({
  name: {
    type: types.String,
    required: true
  },
  information: {
    type: types.String,
    require: true
  }
});

const Allergen = mongoose.model('Allergen', AllergenSchema);

module.exports = Allergen;