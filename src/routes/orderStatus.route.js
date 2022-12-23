const express = require('express');
const validate = require('../middleware/validate');
const { orderStatusValidation } = require('../validations');
const { orderStatusController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(orderStatusValidation.createOrderStatus), orderStatusController.createOrderStatus)
  .get(auth(), orderStatusController.getOrderStatuses);

router
  .route('/:orderStatusId')
  .get(auth(), validate(orderStatusValidation.getOrderStatus), orderStatusController.getOrderStatusById)
  .patch(auth(), validate(orderStatusValidation.updateOrderStatus), orderStatusController.updateOrderStatus)
  .delete(auth(), validate(orderStatusValidation.deleteOrderStatus), orderStatusController.deletOrderStatusById);

module.exports = router;
