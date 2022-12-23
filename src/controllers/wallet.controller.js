const httpStatus = require('http-status');
const { walletService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createWallet = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  const wallet = await walletService.createWallet(userId, req.body);
  res.status(httpStatus.CREATED).json(wallet);
});

const getWallets = catchAsync(async (req, res) => {
  const banks = await walletService.getWallets();
  res.status(httpStatus.OK).json(banks);
});

const getWallet = catchAsync(async (req, res) => {
  const wallet = await walletService.getWallet(req.params.addressId);
  res.status(httpStatus.OK).json(wallet);
});

const updateWallet = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await walletService.updateWallet(userId, req.params.addressId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteWallet = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await walletService.deleteWallet(userId, req.params.addressId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

const getBanks = catchAsync(async (req, res) => {
  const banks = await walletService.getBanks();
  res.status(httpStatus.OK).json(banks);
});
module.exports = {
  createWallet,
  getWallets,
  getWallet,
  updateWallet,
  deleteWallet,
  getBanks,
};
