const httpStatus = require('http-status');
const { storeService, walletService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createStore = catchAsync(async (req, res) => {
  // const { userId } = req.user.dataValues;
  const { userId } = req;
  const createdStore = await storeService.createStore(userId, req.body);
  res.status(httpStatus.CREATED).json(createdStore);
});

const getStores = catchAsync(async (req, res) => {
  const stores = await storeService.getStores();
  res.status(httpStatus.OK).json(stores);
});

const getStore = catchAsync(async (req, res) => {
  const store = await storeService.getStoreById(req.params.storeId);
  res.status(httpStatus.OK).json(store);
});

const updateStore = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await storeService.updateStoreById(userId, req.params.storeId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const updateStoreWallet = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await walletService.updateStoreWallet(userId, req.params.storeId, req.params.walletId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteStoreWallet = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;

  await walletService.deleteStoreWallet(userId, req.params.storeId, req.params.walletId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

const deleteStore = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await storeService.deleteStoreById(userId, req.params.storeId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createStore,
  getStores,
  getStore,
  updateStoreWallet,
  updateStore,
  deleteStore,
  deleteStoreWallet,
};
