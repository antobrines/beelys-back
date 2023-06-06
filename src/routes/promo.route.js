const express = require('express');
const validate = require('../middlewares/validate');
const promoController = require('../controllers/promo.controller');
const promoValidation = require('../validations/promo.validation');
const {
  isConnected,
  isAdmin
} = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', [validate(promoValidation.create), isConnected, isAdmin], promoController.create);
router.put('/:_id', [validate(promoValidation.create), isConnected, isAdmin], promoController.update);
router.get('/:_id', validate(null), promoController.getOne);
router.get('/', validate(null), promoController.getAll);
router.delete('/', [isConnected, isAdmin], promoController.deleteOne);


module.exports = router;