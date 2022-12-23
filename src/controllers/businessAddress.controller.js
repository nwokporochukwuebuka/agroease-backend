const httpStatus = require('http-status');
const { businessAddressService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createBusinessAddress = catchAsync(async (req, res) => {
  const businessAddress = await businessAddressService.createBusinessAddress(req.params.storeId, req.body);
  res.status(httpStatus.CREATED).json(businessAddress);
});

const getBusinessAddresses = catchAsync(async (req, res) => {
  const businiessAddresses = await businessAddressService.getBusinessAddresses();
  res.status(httpStatus.OK).json(businiessAddresses);
});

const getBusinessAddress = catchAsync(async (req, res) => {
  const businessAddress = await businessAddressService.getBusinessAddress(req.params.addressId);
  res.status(httpStatus.OK).json(businessAddress);
});

const updateBusinessAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await businessAddressService.updateBusinessAddress(userId, req.params.addressId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteBusinessAddress = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await businessAddressService.deleteBusinessAddress(userId, req.params.addressId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createBusinessAddress,
  getBusinessAddresses,
  getBusinessAddress,
  updateBusinessAddress,
  deleteBusinessAddress,
};
