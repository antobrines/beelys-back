const errorF = require('../utils/error');

const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => errorF(error.message, error, 500, res, next));
};

module.exports = catchAsync;