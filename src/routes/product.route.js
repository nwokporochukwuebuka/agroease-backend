/* eslint-disable prettier/prettier */
const express = require('express');
const { productController } = require('../controllers');
const upload = require('../config/multer');
const validate = require('../middleware/validate');
const { formDataStringConvert } = require('../middleware/formDataObjectConverter');
const { productValidation } = require('../validations');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), upload.array('images', 5), formDataStringConvert('product'), productController.createProduct)
  .get(productController.getProducts);

// admin
router.route('/admin').get(auth('adminManageProducts'), productController.getAdminProducts);

router
  .route('/:productId')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(auth(), upload.array('images', 5), formDataStringConvert('product'), productController.updateProduct)
  .delete(auth(), productController.deleteProduct);

router.route('/store/:storeId').get(productController.getStoreProducts);

module.exports = router;
