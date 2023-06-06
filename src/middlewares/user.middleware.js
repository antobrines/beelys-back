const httpStatus = require('http-status');
const {
  Error
} = require('mongoose');
const {
  User
} = require('../models');
const errorF = require('../utils/error');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const isUniqueMail = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user) {
    const error = new Error('Votre email existe déjà');
    errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);
  } else {
    return next();
  }
};

const isValidate = async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    const error = new Error('Mauvais credentiel');
    return errorF(error.message, error, httpStatus.UNAUTHORIZED, res, next);
  } else if (!user.is_validate) {
    const error = new Error('Vous n\'avez pas encore valider votre email');
    return errorF(error.message, error, httpStatus.UNAUTHORIZED, res, next);
  } else {
    return next();
  }

};

const isConnected = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwt.secret, (error, user) => {
      if (error) {
        errorF('Vous n\'êtes pas connecté', error, 404, res, next);
      }

      req.user = user;
      next();
    });
  } else {
    const err = new Error('Il semblerait qu\'il manque le token');
    errorF(err.message, err, 404, res, next);
  }
};

const isAdmin = async (req, res, next) => {
  const roles = req.user.roles;
  if (roles.includes('619e5ba8776ca728e6f2c9a2')) {
    return next();
  }
  const error = new Error('Vous n\'êtes pas autorisé');
  errorF(error.message, error, httpStatus.UNAUTHORIZED, res, next);
};

module.exports = {
  isUniqueMail,
  isValidate,
  isConnected,
  isAdmin
};