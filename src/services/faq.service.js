/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const {
  Faq
} = require('../models');

const create = async (req) => {
  return Faq.create(req.body);
};

const getAll = async () => {
  return Faq.find({});
};

const update = async (req) => {
  const {
    _id
  } = req.params;
  const faq = await Faq.findOneAndUpdate({
    _id: _id
  }, req.body, {
    new: true
  });
  return faq;
};

const getOne = async (req) => {
  const {
    _id
  } = req.params;
  const faq = await Faq.findOne({
    _id: _id
  });
  return faq;
};

const deleteOne = async (req) => {
  const {
    _id
  } = req.params;
  const result = await Faq.remove({
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