const express = require('express');
const validate = require('../middlewares/validate');
const bannerController = require('../controllers/banner.controller');
const {
  isConnected,
  isAdmin
} = require('../middlewares/user.middleware');
// const bannerValidation = require('../validations/banner.validation');


const router = express.Router();

router.post('/', validate(null), bannerController.create);
router.put('/:_id', [validate(null), isConnected, isAdmin], bannerController.update);
router.get('/:_id', validate(null), bannerController.getOne);
router.get('/', validate(null), bannerController.getAll);
router.delete('/:_id', [validate(null), isConnected, isAdmin], bannerController.deleteOne);

module.exports = router;