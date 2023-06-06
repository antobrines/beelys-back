const express = require('express');
const validate = require('../middlewares/validate');
const faqController = require('../controllers/faq.controller');
// const faqValidation = require('../validations/faq.validation');


const router = express.Router();

router.post('/', validate(null), faqController.create);
router.put('/:_id', validate(null), faqController.update);
router.get('/:_id', validate(null), faqController.getOne);
router.get('/', validate(null), faqController.getAll);
router.delete('/:_id', validate(null), faqController.deleteOne);


module.exports = router;