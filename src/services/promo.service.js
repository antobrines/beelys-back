/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Promo
} = require('../models');

const create = async (req) => {
  return Promo.create(req.body);
};

const getAll = async () => {
  return Promo.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const promo = await Promo.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return promo;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const role = await Promo.findOne({
    _id: _id
  });
  return role;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Promo.remove({
    _id: _id
  });
  return result.deletedCount;
};

module.exports = {
  create,
  getAll,
  update,
  deleteOne,
  getOne,
};