const express = require('express');
const validate = require('../middleware/validate');
const { flutterwaveValidation } = require('../validations');
const { flutterwaveController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(validate(flutterwaveValidation.initializeTransaction), flutterwaveController.initializeTransaction);

router.route('/cb/payment').get(flutterwaveController.verifyPayment);

module.exports = router;
