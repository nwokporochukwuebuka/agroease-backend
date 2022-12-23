const express = require('express');
const validate = require('../middleware/validate');
const { businessAddressValidation } = require('../validations');
const { businessAddressController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(auth(), businessAddressController.getBusinessAddresses);
router
  .route('/store/:storeId')
  .post(auth(), validate(businessAddressValidation.createAddress), businessAddressController.createBusinessAddress);

router
  .route('/:addressId')
  .get(auth(), validate(businessAddressValidation.getAddress), businessAddressController.getBusinessAddress)
  .patch(auth(), validate(businessAddressValidation.updateAddress), businessAddressController.updateBusinessAddress)
  .delete(auth(), validate(businessAddressValidation.deleteAddress), businessAddressController.deleteBusinessAddress);

module.exports = router;
