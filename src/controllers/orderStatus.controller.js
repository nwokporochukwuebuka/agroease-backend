const httpStatus = require('http-status');
const { orderStatusService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createOrderStatus = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  const orderStatus = await orderStatusService.createOrderStatus(userId, req.body);

  res.status(httpStatus.CREATED).json(orderStatus);
});

const getOrderStatuses = catchAsync(async (req, res) => {
  const orderStatuss = await orderStatusService.getOrderStatuses();
  res.status(httpStatus.OK).json(orderStatuss);
});

const getOrderStatusById = catchAsync(async (req, res) => {
  const orderStatus = await orderStatusService.getOrderStatusById(req.params.orderStatusId);
  res.status(httpStatus.OK).json(orderStatus);
});

const updateOrderStatus = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await orderStatusService.updateOrderStatusById(userId, req.params.orderStatusId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deletOrderStatusById = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await orderStatusService.deleteOrderStatusById(userId, req.params.orderStatusId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createOrderStatus,
  getOrderStatuses,
  getOrderStatusById,
  updateOrderStatus,
  deletOrderStatusById,
};
