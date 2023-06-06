const express = require('express');
const validate = require('../middlewares/validate');
const productController = require('../controllers/product.controller');
const productValidation = require('../validations/product.validation');
const filterAllowed = ['type', 'slug'];
const filterF = require('../middlewares/filter');
const {
  isConnected
} = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', validate(null), productController.create);
router.put('/:_id', validate(null), productController.update);
router.get('/:_id', validate(null), productController.getOne);
router.get('/', filterF(filterAllowed), productController.getAll);
router.delete('/:_id', validate(null), productController.deleteOne);
router.post('/:_id/:idAdd', validate(null), productController.addProduct);
router.delete('/:_id/:idAdd', validate(null), productController.deleteProduct);
router.post('/buy', [isConnected], productController.buy);


module.exports = router;