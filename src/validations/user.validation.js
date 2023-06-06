const Joi = require('joi');

const register = Joi.object().keys({
  first_name: Joi.string()
    .min(2)
    .max(30)
    .required(),
  last_name: Joi.string()
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().trim().min(6).required(),
  email: Joi.string().email().required(),
  birth_date: Joi.date().raw(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required(),
  telephone: Joi.string().regex(/(^[0-9]+$)/),
  zip_code: Joi.number().required(),
  adress: Joi.string().required(),
  city: Joi.string().required(),
  url_image: Joi.any(),
  customer_id: Joi.string(),
});

const updateUser = {
  body: Joi.object().keys({
    first_name: Joi.string()
      .min(2)
      .max(30),
    last_name: Joi.string()
      .min(2)
      .max(30),
    birth_date: Joi.date().raw(),
    telephone: Joi.string().regex(/(^[0-9]+$)/),
    zip_code: Joi.number(),
    adress: Joi.string(),
    city: Joi.string(),
    url_image: Joi.any(),
  })
};

const updatePassword = {
  body: Joi.object().keys({
    password: Joi.string().trim().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required(),
    last_password: Joi.string().required(),
  })
};

const updateEmail = Joi.object().keys({
  password: Joi.string().trim().min(6).required(),
  email: Joi.string().email().required(),
});

const login = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  register,
  login,
  updateUser,
  updatePassword,
  updateEmail
};