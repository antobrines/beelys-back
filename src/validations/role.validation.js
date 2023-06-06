const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required()
  })
};
const update = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required()
  })
};
const getAll = null;

module.exports = {
  create,
  update,
  getAll
};