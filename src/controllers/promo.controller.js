const catchAsync = require('../utils/catchAsync');
const promoService = require('../services/promo.service');
const successF = require('../utils/success');

const create = catchAsync(async (req, res, next) => {
  const result = await promoService.create(req);
  successF('Créer', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const result = await promoService.update(req);
  successF('Modifier', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await promoService.getOne(req);
  successF('One', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await promoService.getAll();
  successF('All', result, 200, res, next);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await promoService.deleteOne(req);
  successF('Delete', result, 200, res, next);
});

module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
};