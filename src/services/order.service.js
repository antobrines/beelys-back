/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Order
} = require('../models');

const create = async (req) => {
  return Order.create(req.body);
};

const getAll = async () => {
  return Order.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const order = await Order.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return order;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const order = await Order.findOne({
    _id: _id
  });
  return order;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Order.remove({
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