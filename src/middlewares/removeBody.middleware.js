const removeReqBody = (removeElement) => async (req, res, next) => {
  const body = req.body;
  Object.keys(body).forEach(function (key) {
    if (removeElement.includes(key)) {
      delete body[key];
    }
  });
  next();
};

module.exports = {
  removeReqBody
};