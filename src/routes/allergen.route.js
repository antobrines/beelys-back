const express = require('express');
const validate = require('../middlewares/validate');
const allergenController = require('../controllers/allergen.controller');
const allergenValidation = require('../validations/allergen.validation');


const router = express.Router();

router.post('/', validate(allergenValidation.create), allergenController.create);
router.put('/:_id', validate(allergenValidation.create), allergenController.update);
router.get('/:_id', validate(null), allergenController.getOne);
router.get('/', validate(null), allergenController.getAll);
router.delete('/', validate(null), allergenController.deleteOne);


module.exports = router;