// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const bannerService = require('../services/banner.service');
const successF = require('../utils/success');

const create = catchAsync(async (req, res, next) => {
  const result = await bannerService.create(req);
  successF('Bannière créée', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const result = await bannerService.update(req);
  successF('Bannière modifiée', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await bannerService.getOne(req);
  successF('Une bannière', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await bannerService.getAll();
  successF('Toute les bannières', result, 200, res, next);

});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await bannerService.deleteOne(req);
  successF('Suppression effectué', result, 200, res, next);

});



module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
};