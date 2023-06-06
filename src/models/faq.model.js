const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const FaqSchema = mongoose.Schema({
  response: {
    type: types.String,
    required: true
  },
  question: {
    type: types.String,
    required: true
  },
  position: {
    type: types.Number,
    required: true
  }

});

const Faq = mongoose.model('Faq', FaqSchema);

module.exports = Faq;