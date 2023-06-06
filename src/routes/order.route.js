const express = require('express');
const validate = require('../middlewares/validate');
const orderController = require('../controllers/order.controller');
const orderValidation = require('../validations/order.validation');


const router = express.Router();

router.post('/', validate(null), orderController.create);
router.put('/:_id', validate(null), orderController.update);
router.get('/:_id', validate(null), orderController.getOne);
router.get('/', validate(null), orderController.getAll);
router.delete('/', validate(null), orderController.deleteOne);

module.exports = router;