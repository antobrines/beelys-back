const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(50).required()
  })
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(50).required()
  })
};


module.exports = {
  create,
  update
};