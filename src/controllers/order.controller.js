// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const orderService = require('../services/order.service');
const successF = require('../utils/success');

const create = catchAsync(async (req, res, next) => {
  const result = await orderService.create(req);
  successF('Créer', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const result = await orderService.update(req);
  successF('Modifier', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await orderService.getOne(req);
  successF('One', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await orderService.getAll();
  successF('All', result, 200, res, next);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await orderService.deleteOne(req);
  const successF = require('../utils/success');
  successF('Delete', result, 200, res, next);
});



module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
};