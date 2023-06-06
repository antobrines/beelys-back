/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Banner
} = require('../models');

const create = async (req) => {
  return Banner.create(req.body);
};

const getAll = async () => {
  return Banner.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const banner = await Banner.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return banner;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const banner = await Banner.findOne({
    _id: _id
  });
  return banner;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const banner = await Banner.remove({
    _id: _id
  });
  return banner.deletedCount;
};

module.exports = {
  create,
  getAll,
  update,
  deleteOne,
  getOne,
};