const express = require('express');
const validate = require('../middleware/validate');
const { productUnitValidation } = require('../validations');
const { productUnitController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productUnitValidation.createProductUnit), productUnitController.createProductUnit)
  .get(productUnitController.getProductUnits);

router
  .route('/:productUnitId')
  .get(validate(productUnitValidation.getProductUnit), productUnitController.getProductUnitById)
  .patch(auth(), validate(productUnitValidation.updateProductUnit), productUnitController.updateProductUnit)
  .delete(auth(), validate(productUnitValidation.deleteProductUnit), productUnitController.deletProductUnitById);

module.exports = router;
