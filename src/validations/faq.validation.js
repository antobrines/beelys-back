const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    question: Joi.string().trim().min(2).max(50).required(),
    response: Joi.string().trim().min(2).max(200).required(),
    position: Joi.number(),
  })
};

const update = {
  body: Joi.object().keys({
    question: Joi.string().trim().min(2).max(50).required(),
    response: Joi.string().trim().min(2).max(200).required(),
    position: Joi.number(),

  })
};

const getAll = null;

module.exports = {
  create,
  update,
  getAll
};