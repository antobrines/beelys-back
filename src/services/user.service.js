const {
  User
} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const stripeService = require('../services/stripe.service');

const create = async (userBody) => {
  userBody.password = bcrypt.hashSync(userBody.password, 10);
  return User.create(userBody);
};

const confirm = async (email_user) => {
  const filter = {
    email: email_user
  };
  const update = {
    is_validate: true
  };
  await User.findOneAndUpdate(filter, update);
  let user = await User.findOne(filter);
  return user;
};

const compareAsync = (param1, param2) => {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(param1, param2, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const login = async (req) => {
  const {
    email,
    password
  } = req.body;

  const user = await User.findOne({
    is_validate: true,
    email: email
  });

  const accessToken = await jwt.sign({
    email: user.email,
    roles: user.roles,
    userId: user._id,
    customerId: user.customer_id
  }, config.jwt.secret);

  const test = await compareAsync(password, user.password);
  if (test) {
    return accessToken;
  }
  return 'Invalid Credentiel';
};

const update = async (req) => {
  const {
    userId
  } = req.user;
  const user = await User.findOneAndUpdate({
    _id: userId
  }, req.body, {
    new: true
  });
  return user;
};

const updatePassword = async (req) => {
  const {
    userId
  } = req.user;
  const user = await User.findOne({
    _id: userId
  });

  const goodPassword = await compareAsync(req.body.last_password, user.password);
  if (goodPassword) {
    const newPassword = {
      password: bcrypt.hashSync(req.body.password, 10)
    };
    await User.findOneAndUpdate({
      _id: userId
    }, newPassword, {
      new: true
    });
    return true;
  }
  return false;
};

const me = async (req) => {
  const {
    userId
  } = req.user;
  const user = await User.findOne({
    _id: userId
  });
  return user;
};

const getMyInvoice = async (req) => {
  return await stripeService.getInvoice(req);
};

module.exports = {
  create,
  confirm,
  login,
  update,
  me,
  updatePassword,
  getMyInvoice
};