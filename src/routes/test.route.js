const express = require('express');
const testController = require('../controllers/test.controller');
const validate = require('../middlewares/validate');
const {
  isConnected
} = require('../middlewares/user.middleware');

const router = express.Router();

router.get('/', validate(null), testController.create);
router.get('/createcustomer', validate(null), testController.createCustomer);
router.get('/session', isConnected, testController.testSessions);



module.exports = router;