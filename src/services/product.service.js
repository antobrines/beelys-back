/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Product
} = require('../models');
const allergenService = require('./allergen.service');


const create = async (req) => {
  return Product.create(req.body);
};

const getAll = async (req) => {
  const products = await Product.find(req.filter);
  for await (let product of products) {
    product.allergen = await Promise.all(product.allergen.map(async (item) => {
      const allergenId = {};
      allergenId.params = {};
      allergenId.params._id = item;
      const allergen = await allergenService.getOne(allergenId);
      return allergen;
    }));
  }
  for await (let product of products) {
    product.products = await Promise.all(product.products.map(async (item) => {
      const productsId = {};
      productsId.params = {};
      productsId.params._id = item;
      const products = await getOne(productsId);
      return products;
    }));
  }
  return products;
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const product = await Product.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return product;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const product = await Product.findOne({
    _id: _id
  });
  product.allergen = await Promise.all(product.allergen.map(async (item) => {
    const allergenId = {};
    allergenId.params = {};
    allergenId.params._id = item;
    const allergen = await allergenService.getOne(allergenId);
    return allergen;
  }));
  product.products = await Promise.all(product.products.map(async (item) => {
    const productId = {};
    productId.params = {};
    productId.params._id = item;
    const product = await getOne(productId);
    return product;
  }));
  return product;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Product.remove({
    _id: _id
  });
  return result.deletedCount;
};

const addProduct = async (req) => {
  const {
    _id,
    idAdd
  } = req.params;
  var productNew = null;
  const product = await Product.findOne({
    _id: _id
  });
  if (idAdd == _id) {
    return 'Pas ajouter le produit dans le produit';
  }
  if (product) {
    if (!product.products.includes(idAdd)) {
      product.products.push(idAdd);
      productNew = await Product.updateOne(product);
    } else {
      return 'Déjà dedans';
    }
  }
  return product;
};

const removeProduct = async (req) => {
  const {
    _id,
    idAdd
  } = req.params;
  var productNew = null;
  const product = await Product.findOne({
    _id: _id
  });
  if (product) {
    if (product.products.includes(idAdd)) {
      product.products = product.products.filter((item) => {
        return item != idAdd;
      });
      productNew = await Product.updateOne(product);
    } else {
      return 'Existe pas';
    }
  }
  return product;
};

module.exports = {
  create,
  getAll,
  update,
  deleteOne,
  getOne,
  addProduct,
  removeProduct
};