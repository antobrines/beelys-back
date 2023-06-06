/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Allergen
} = require('../models');

const create = async (req) => {
  return Allergen.create(req.body);
};

const getAll = async () => {
  return Allergen.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const allergen = await Allergen.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return allergen;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const allergen = await Allergen.findOne({
    _id: _id
  });
  return allergen;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Allergen.remove({
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