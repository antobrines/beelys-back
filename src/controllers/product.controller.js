// eslint-disable-next-line no-unused-vars
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/product.service');
const successF = require('../utils/success');
const stripeService = require('../services/stripe.service');

const create = catchAsync(async (req, res, next) => {
  const product = await stripeService.createProduct(req.body);
  req.body.id_stripe = product.id;
  const result = await productService.create(req);
  successF('Créer', result, 200, res, next);
});

const update = catchAsync(async (req, res, next) => {
  let result = await productService.update(req);
  if (result.id_stripe != null) {
    const product = await stripeService.updateProduct(result);
    req.body.id_stripe = product.id;
    req.body.price_stripe = product.price_stripe;

  } else {
    const product = await stripeService.createProduct(result);
    req.body.id_stripe = product.id;
    req.body.price_stripe = product.price_stripe;
  }
  result = await productService.update(req);
  successF('Modifier', result, 200, res, next);
});

const getOne = catchAsync(async (req, res, next) => {
  const result = await productService.getOne(req);
  successF('One', result, 200, res, next);
});

const getAll = catchAsync(async (req, res, next) => {
  const result = await productService.getAll(req);
  successF('All', result, 200, res, next);
});

const deleteOne = catchAsync(async (req, res, next) => {
  const result = await productService.deleteOne(req);
  successF('Delete', result, 200, res, next);
});

const addProduct = catchAsync(async (req, res, next) => {
  const result = await productService.addProduct(req);
  if (result == 'Pas ajouter le produit dans le produit') {
    return successF('Pas ajouter le produit dans le produit', result, 400, res, next);
  }
  successF('Added', result, 200, res, next);
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const result = await productService.removeProduct(req);
  successF('Remove', result, 200, res, next);
});

const buy = catchAsync(async (req, res, next) => {
  const result = await stripeService.buy(req);
  successF('Buy', result, 200, res, next);
});



module.exports = {
  create,
  getAll,
  getOne,
  update,
  deleteOne,
  addProduct,
  deleteProduct,
  buy
};