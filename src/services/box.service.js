/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Box
} = require('../models');

const create = async (req) => {
  return Box.create(req.body);
};

const getAll = async () => {
  return Box.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const box = await Box.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return box;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const box = await Box.findOne({
    _id: _id
  });
  return box;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Box.remove({
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