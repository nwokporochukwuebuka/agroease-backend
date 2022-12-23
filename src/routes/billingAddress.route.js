const express = require('express');
const validate = require('../middleware/validate');
const { billingAddressValidation } = require('../validations');
const { billingAddressController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(billingAddressValidation.createAddress), billingAddressController.createBillingAddress)
  .get(auth(), billingAddressController.getBillingAddresses);

router
  .route('/:addressId')
  .get(auth(), validate(billingAddressValidation.getAddress), billingAddressController.getBillingAddress)
  .patch(auth(), validate(billingAddressValidation.updateAddress), billingAddressController.updateBillingAddress)
  .delete(auth(), validate(billingAddressValidation.deleteAddress), billingAddressController.deleteBillingAddress);

module.exports = router;
