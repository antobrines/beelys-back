// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const stripeService = require('../services/stripe.service');
const successF = require('../utils/success');

const create = catchAsync(async (req, res, next) => {
  const result = await stripeService.test(res);
  successF('pog', result, 200, res, next);
});

const createCustomer = catchAsync(async (req, res, next) => {
  const result = await stripeService.createCustomer(req);
  successF('pog', result, 200, res, next);
});

const testSessions = catchAsync(async (req, res, next) => {
  const result = await stripeService.test(req);
  successF('pog', result, 200, res, next);
});

module.exports = {
  create,
  createCustomer,
  testSessions
};