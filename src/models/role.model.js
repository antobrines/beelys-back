const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const roleSchema = mongoose.Schema({
  name: {
    type: types.String,
    required: true
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;