const express = require('express');
const validate = require('../middleware/validate');
const { paystackValidation } = require('../validations');
const { paystackController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(validate(paystackValidation.initializeTransaction), paystackController.initializeTransaction);

router.route('/cb').get(paystackController.paystackCallback);

module.exports = router;
