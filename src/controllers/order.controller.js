const httpStatus = require('http-status');
const { orderService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const getOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getOrders();
  res.status(httpStatus.OK).json(orders);
});

const getOrder = catchAsync(async (req, res) => {
  const {
    params: { orderId },
  } = req;
  const order = await orderService.getOrder(orderId);
  res.status(httpStatus.OK).json(order);
});

const createOrder = catchAsync(async (req, res) => {
  const { userId } = req;
  const order = await orderService.createOrder(userId, req.body);
  res.status(httpStatus.OK).json(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const {
    userId,
    body,
    params: { orderId },
  } = req;
  const order = await orderService.updateOrder(userId, orderId, body);
  res.status(httpStatus.OK).json(order);
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
};
