/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Role
} = require('../models');

const create = async (req) => {
  return Role.create(req.body);
};

const getAll = async () => {
  return Role.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const role = await Role.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return role;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const role = await Role.findOne({
    _id: _id
  });
  return role;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Role.remove({
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