const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const BannerSchema = mongoose.Schema({
  name: {
    type: types.String,
    required: true
  },
  image_url: {
    type: types.String,
    required: true
  },
  position: {
    type: types.Number,
    required: false,
    default: null
  },
  selected: {
    type: types.Boolean,
    required: true,
    default: false
  },
  is_slider: {
    type: types.Boolean,
    required: true
  },
  alt: {
    type: types.String,
    required: true
  }
});

const Banner = mongoose.model('Banner', BannerSchema);

module.exports = Banner;