const express = require('express');
const validate = require('../middleware/validate');
const { categoryValidation } = require('../validations');
const { categoryController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(categoryValidation.createCategory), categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route('/:categoryId')
  .get(validate(categoryValidation.getCategory), categoryController.getCategoryById)
  .patch(auth(), validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(auth(), validate(categoryValidation.deleteCategory), categoryController.deleteCategoryById);

module.exports = router;
