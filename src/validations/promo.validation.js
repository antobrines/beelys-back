const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    code: Joi.string().trim().min(2).max(30).required(),
    pourcent: Joi.number().max(50).required(),
    expirationDate: Joi.date().required(),
    startDate: Joi.date().required(),
    minSolde: Joi.number(),
    minProduct: Joi.number()
  })
};

const update = {
  body: Joi.object().keys({
    code: Joi.string().trim().min(2).max(30),
    pourcent: Joi.number().max(5),
    expirationDate: Joi.date(),
    startDate: Joi.date(),
    minSolde: Joi.number(),
    minProduct: Joi.number()
  })
};


const getAll = null;

module.exports = {
  create,
  update,
  getAll
};