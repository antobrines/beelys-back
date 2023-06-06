// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const allergenService = require('../services/allergen.service');
const successF = require('../utils/success');

const create = catchAsync(async (req, res, next) => {
  const result = await allergenService.create(req);
  successF('Créer', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const result = await allergenService.update(req);
  successF('Modifier', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await allergenService.getOne(req);
  successF('One', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await allergenService.getAll();
  successF('All', result, 200, res, next);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await allergenService.deleteOne(req);
  successF('Supprimé', result, 200, res, next);
});



module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
};