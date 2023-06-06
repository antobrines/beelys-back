const Joi = require('joi');

const create = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(),
    position: Joi.number().require(),
    selected: Joi.boolean().require(),
    is_slider: Joi.boolean().require(),
    Image_url: Joi.string().trim().min(2).max(30).required(),
    alt: Joi.string().trim().min(2).max(30).required()
  })
};

const update = {
  body: Joi.object().keys({
    name: Joi.string().trim().min(2).max(30).required(),
    position: Joi.number(),
    selected: Joi.boolean().require(),
    is_slider: Joi.boolean().require(),
    Image_url: Joi.string().trim().min(2).max(30).required(),
    alt: Joi.string().trim().min(2).max(30).required()
  })
};


module.exports = {
  create,
  update,
};