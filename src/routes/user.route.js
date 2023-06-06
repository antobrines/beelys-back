/* eslint-disable no-unused-vars */
const express = require('express');
const validate = require('../middlewares/validate');
const {
  removeReqBody
} = require('../middlewares/removeBody.middleware');

const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const router = express.Router();
const {
  isUniqueMail,
  isValidate,
  isConnected
} = require('../middlewares/user.middleware');
const removeElement = ['_id', 'password', 'is_validate', 'email'];

router.post(
  '/register',
  [
    validate(userValidation.register),
    isUniqueMail
  ],
  userController.register
);
router.post('/login', [validate(userValidation.login), isValidate], userController.login);
router.get('/confirm', userController.confirm);
router.get('/pog', [validate(null), isConnected], userController.test);
router.put('/', [validate(userValidation.updateUser), isConnected], userController.update);
router.put('/password', [validate(userValidation.updatePassword), isConnected], userController.updatePassword);
router.get('/me', [validate(null), isConnected], userController.me);
router.get('/invoices', [isConnected], userController.getMyInvoice);




module.exports = router;