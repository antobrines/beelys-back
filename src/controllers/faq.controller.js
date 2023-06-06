// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const successF = require('../utils/success');
const faqService = require('../services/faq.service');

const create = catchAsync(async (req, res, next) => {
  const result = await faqService.create(req);
  successF('Créer', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  const result = await faqService.update(req);
  successF('Update', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await faqService.getOne(req);
  successF('One', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await faqService.getAll();
  successF('All', result, 200, res, next);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await faqService.deleteOne(req);
  successF('Delete', result, 200, res, next);
});



module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne
};