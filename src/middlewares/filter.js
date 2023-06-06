const errorF = require('../utils/error');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config');

const filterF = (allowed = []) => (req, res, next) => {
  const {
    filter
  } = req.query;
  var isRight = true;
  var filterTrue = {};
  let isAdmin = false;
  const authHeader = req.headers.authorization;
  var token = null;
  if (authHeader) {
    token = authHeader.split(' ')[1];
  }

  jwt.verify(token, config.jwt.secret, (error, user) => {
    if (user) { // dans le cas où le token expire entre temps de connexion et de suppression client
      const roles = user.roles;
      if (roles.includes('619e5ba8776ca728e6f2c9a2')) {
        isAdmin = true;
      }
    }
  });
  if (filter) {
    const arrayFilter = filter.split(';');
    arrayFilter.forEach(element => {
      const splitElement = element.split('=');
      if (splitElement.length < 2) {
        isRight = false;
        const error = new Error('Il semblerait avoir une erreur dans le filtre (manque un =)');
        return errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);
      }
      if (!allowed.includes(splitElement[0]) && !isAdmin) {
        isRight = false;
        const error = new Error(`Le champs "${splitElement[0]}" n'est pas autorisé`);
        return errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);
      }
      const elementAll = splitElement[1].split('+');
      if (String(splitElement[0]) == 'id') {
        filterTrue[splitElement[0]] = String(splitElement[1]);
      } else if (String(splitElement[0]) == 'slug') {
        filterTrue[splitElement[0]] = {
          $eq: String(splitElement[1])
        };
      } else if (elementAll.length > 1) {
        filterTrue[splitElement[0]] = {
          $all: elementAll
        };
      } else {
        filterTrue[splitElement[0]] = {
          $regex: new RegExp(String(splitElement[1]), 'i')
        };
      }
      if (typeof splitElement[1] == 'boolean') {
        filterTrue[splitElement[0]] = splitElement[1];
      }
    });
  }
  req.filter = filterTrue;
  if (isRight)
    next();
};

module.exports = filterF;