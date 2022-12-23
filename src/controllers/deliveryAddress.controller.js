const httpStatus = require('http-status');
const { deliveryAddressService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createDeliveryAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  const deliveryAddress = await deliveryAddressService.createDeliveryAddress(userId, req.body);
  res.status(httpStatus.CREATED).json(deliveryAddress);
});

const getDeliveryAddresses = catchAsync(async (req, res) => {
  const deliveryAddresses = await deliveryAddressService.getDeliveryAddresses();
  res.status(httpStatus.OK).json(deliveryAddresses);
});

const getDeliveryAddress = catchAsync(async (req, res) => {
  const deliveryAddress = await deliveryAddressService.getDeliveryAddress(req.params.addressId);
  res.status(httpStatus.OK).json(deliveryAddress);
});

const updateDeliveryAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await deliveryAddressService.updateDeliveryAddress(userId, req.params.addressId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteDeliveryAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await deliveryAddressService.deleteDeliveryAddress(userId, req.params.addressId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createDeliveryAddress,
  getDeliveryAddresses,
  getDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
};
