const httpStatus = require('http-status');
const { billingAddressService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createBillingAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  const billingAddress = await billingAddressService.createBillingAddress(userId, req.body);
  res.status(httpStatus.CREATED).json(billingAddress);
});

const getBillingAddresses = catchAsync(async (req, res) => {
  const billingAddresses = await billingAddressService.getBillingAddresses();
  res.status(httpStatus.OK).json(billingAddresses);
});

const getBillingAddress = catchAsync(async (req, res) => {
  const billingAddress = await billingAddressService.getBillingAddress(req.params.addressId);
  res.status(httpStatus.OK).json(billingAddress);
});

const updateBillingAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await billingAddressService.updateBillingAddress(userId, req.params.addressId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteBillingAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await billingAddressService.deleteBillingAddress(userId, req.params.addressId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createBillingAddress,
  getBillingAddresses,
  getBillingAddress,
  updateBillingAddress,
  deleteBillingAddress,
};
