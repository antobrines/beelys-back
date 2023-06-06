const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    product: Joi.mongoose.Schema.Types.ObjectId.required(),
    name: Joi.string().trim().min(2).max(50).required(),
    premade: Joi.boolean().required(),
    price: Joi.number().required()
  })
};

const update = {
  body: Joi.object().keys({
    product: Joi.mongoose.Schema.Types.ObjectId.required(),
    name: Joi.string().trim().min(2).max(50).required(),
    premade: Joi.boolean().required(),
    price: Joi.number().required(),
  })
};

const getAll = null;

module.exports = {
  create,
  update,
  getAll
};