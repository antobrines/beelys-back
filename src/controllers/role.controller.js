// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const roleService = require('../services/role.service');
const successF = require('../utils/success');

const create = catchAsync(async (req, res, next) => {
  const result = await roleService.create(req);
  successF('Créer', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const result = await roleService.update(req);
  successF('Modifier', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await roleService.getOne(req);
  successF('One', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await roleService.getAll();
  successF('All', result, 200, res, next);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await roleService.deleteOne(req);
  successF('Delete', result, 200, res, next);
});


module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
};