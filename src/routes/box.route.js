const express = require('express');
const validate = require('../middlewares/validate');
const boxController = require('../controllers/box.controller');
// const boxValidation = require('../validations/box.validation');


const router = express.Router();

router.post('/', validate(null), boxController.create);
router.put('/:_id', validate(null), boxController.update);
router.get('/:_id', validate(null), boxController.getOne);
router.get('/', validate(null), boxController.getAll);
router.delete('/', validate(null), boxController.deleteOne);


module.exports = router;