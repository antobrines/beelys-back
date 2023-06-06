const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(),
    price: Joi.number().required(),
    image_url: Joi.string().trim().min(2).max(30).required(),
    type: Joi.string().trim().min(2).max(30).required(),
    product: Joi.array(),
  })
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(),
    price: Joi.number().required(),
    image_url: Joi.string().trim().min(2).max(30).required(),
    type: Joi.string().trim().min(2).max(30).required(),
    product: Joi.array(),
  })
};

const getAll = null;

module.exports = {
  create,
  update,
  getAll
};