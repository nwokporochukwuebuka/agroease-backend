const express = require('express');
const validate = require('../middleware/validate');
const { deliveryAddressValidation } = require('../validations');
const { deliveryAddressController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(deliveryAddressValidation.createAddress), deliveryAddressController.createDeliveryAddress)
  .get(auth(), deliveryAddressController.getDeliveryAddresses);

router
  .route('/:addressId')
  .get(auth(), validate(deliveryAddressValidation.getAddress), deliveryAddressController.getDeliveryAddress)
  .patch(auth(), validate(deliveryAddressValidation.updateAddress), deliveryAddressController.updateDeliveryAddress)
  .delete(auth(), validate(deliveryAddressValidation.deleteAddress), deliveryAddressController.deleteDeliveryAddress);

module.exports = router;
