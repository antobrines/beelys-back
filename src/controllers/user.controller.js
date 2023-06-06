const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');
const emailService = require('../services/email.service');
const fs = require('fs');
const {
  Cache,
  ReplaceUserNameAndUrl
} = require('../services/email.service');
const httpStatus = require('http-status');
const errorF = require('../utils/error');
const successF = require('../utils/success');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const stripeService = require('../services/stripe.service');

const register = catchAsync(async (req, res, next) => {
  try {
    const customer = await stripeService.createCustomer(req);
    req.body.customer_id = customer.id;
    const userCreated = await userService.create(req.body);
    const urlTemp = emailService.GetTempURl(userCreated.email);
    console.log(process.cwd());
    let emailHtml = fs
      .readFileSync(process.cwd() + '/src/templates/confirmation-inscription.html')
      .toString();
    console.log(emailHtml);
    const username = userCreated.first_name + ' ' + userCreated.last_name;
    emailHtml = await ReplaceUserNameAndUrl(
      emailHtml,
      username,
      urlTemp
    );
    await emailService.sendHtmlEmail(
      userCreated.email,
      'Confirmation inscription',
      emailHtml
    );
    successF('oui', userCreated, 200, res, next);
  } catch (error) {
    errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);
  }
});

const login = catchAsync(async (req, res, next) => {
  const varLogged = await userService.login(req);
  if (varLogged == 'Invalid Credentiel') {
    var error = new Error('L\'adresse mail ou le mot de passe est invalide');
    return errorF(error.message, error, httpStatus.BAD_REQUEST, res, next);
  }
  successF('La connexion à bien été effectué', varLogged, 200, res, next);
});

const confirm = catchAsync(async (req, res, next) => {
  const MagicKey = req.query.key;
  const email = Cache.get(MagicKey);
  if (email) {
    const user = await userService.confirm(email);

    if (user.is_validate == true) {
      successF('Email validée', true, 200, res, next);
      Cache.del(MagicKey);
    } else {
      const error = new Error('non');
      errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);
    }
  } else {
    const error = new Error('Email non validée');
    errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);
  }
});

const test = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    successF('oui', user, 200, res, next);
  });
});

const update = catchAsync(async (req, res, next) => {
  const user = await userService.update(req);
  successF('Votre compte à bien été modifié', user, 200, res, next);
});

const me = catchAsync(async (req, res, next) => {
  const user = await userService.me(req);
  successF('Voici mon compte', user, 200, res, next);
});

const updatePassword = catchAsync(async (req, res, next) => {
  const isChange = await userService.updatePassword(req);
  if (isChange) {
    return successF('Mot de passe bien modifié', {}, 200, res, next);
  }
  const error = new Error('Votre mot de passe n\'a pas pu être modifié');
  return errorF(error.message, error, httpStatus.NOT_ACCEPTABLE, res, next);

});

const getMyInvoice = catchAsync(async (req, res, next) => {
  console.log(req.user);
  const invoices = await userService.getMyInvoice(req);
  successF('Voici vos factures', invoices, 200, res, next);
});


module.exports = {
  register,
  login,
  confirm,
  test,
  update,
  updatePassword,
  me,
  getMyInvoice
};