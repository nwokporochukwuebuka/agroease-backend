/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { Wallet } = require('../models/Wallet');
const { Store } = require('../models/Store');
const { Revenue } = require('../models/Revenue');
const { Payout } = require('../models/Payouts');
const { userService } = require('./index');
const { flutterwaveService } = require('./index');
const banks = require('../utils/banks');
// const { createBeneficiary } = require('./flutterwave.service');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger');

/**
 * Create a new wallet
 * @param {object} walletBody
 * @return {promise<wallet>}
 */
const createWallet = async (userId, walletBody) => {
  const walletId = await userService.getWalletId(userId);

  if (walletId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wallet exists');
  }

  // eslint-disable-next-line camelcase
  // const beneficiary_id = await createBeneficiary(walletBody);
  const walletz = { ...walletBody };

  const user = await userService.getUserById(userId);

  const wallet = await Wallet.create(walletz);

  wallet.setUser(user);

  return wallet;
};

/**
 * Get wallets
 * @return {promise<wallets>}
 */
const getWallets = async () => {
  const wallets = await Wallet.findAll();
  return wallets;
};

/**
 * Get wallet
 * @param {string} walletId
 * @return {promise<wallet>}
 */
const getWallet = async (walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  return wallet;
};

/**
 * Update wallet
 * @param {object} walletBody
 * @return {promise<wallet>}
 */
const updateWallet = async (userId, walletId, walletBody) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  const { type, WalletId } = await userService.getUserById(userId);

  if (WalletId === parseInt(walletId, 10) || type === 'admin') {
    Object.assign(wallet, walletBody);
    // eslint-disable-next-line no-return-await
    return await Wallet.update(wallet.dataValues, { where: { id: walletId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot edit');
};

/**
 * Update store wallet
 * @param {ObjectId} userId
 * @param {ObjectId} storeId
 * @param {ObjectId} walletId
 * @param {object} walletBody
 * @return {promise<wallet>}
 */
const updateStoreWallet = async (userId, storeId, walletId, walletBody) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  const { UserId } = await Store.findByPk(storeId);

  const { type } = await userService.getUserById(userId);
  if (UserId === userId || type === 'admin') {
    Object.assign(wallet, walletBody);
    // eslint-disable-next-line no-return-await
    return await Wallet.update(wallet.dataValues, { where: { id: walletId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot edit');
};

/**
 * Delete store wallet
 * @param {ObjectId} userId
 * @param {ObjectId} storeId
 * @param {ObjectId} walletId
 * @return {promise<wallet>}
 */
const deleteStoreWallet = async (userId, storeId, walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }
  const { UserId } = await Store.findByPk(storeId);

  const { type } = await userService.getUserById(userId);
  if (UserId === userId || type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Wallet.destroy({ where: { id: walletId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete');
};

/**
 * Delete wallet
 * @param {*}  userId walletId
 * @return {promise<wallet>}
 */
const deleteWallet = async (userId, walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  if (!wallet) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found');
  }

  const { type, WalletId } = await userService.getUserById(userId);

  if (walletId === WalletId || type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Wallet.destroy({ where: { id: walletId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete');
};

/**
 * Get banks
 * @return {promise<wallets>}
 */
const getBanks = async () => {
  const bankList = Object.keys(banks);
  return bankList;
};

/**
 * Share balance
 * @return {promise<null>}
 */
const shareBalance = async (order) => {
  const rows = await order.getOrder_Rows();
  rows.map(async (row) => {
    const {
      dataValues: { StoreId, total_price },
    } = row;

    const store = await Store.findByPk(StoreId);

    const {
      dataValues: { WalletId },
    } = store;

    const wallet = await Wallet.findByPk(WalletId);
    await wallet.increment({ balance: total_price * 0.9 });
    const revenue = await Revenue.findByPk(1);
    await revenue.increment({ total: total_price * 0.1 });
  });

  logger.info('balance shared'.bgWhite.cyan);
};

const withdrawBalance = async (walletId) => {
  const wallet = await Wallet.findByPk(walletId);
  const { balance, id: WalletId } = wallet.dataValues;
  if (balance < 2000) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Must have atleast 2000 to withdraw');
  }
  const { status, message, reference, id: payout_id, amount, fee } = await flutterwaveService.initaitePayout(wallet);
  const payoutData = {
    status,
    message,
    reference,
    payout_id,
    amount,
    fee,
    WalletId,
  };
  const createPayout = await Payout.create(payoutData);
};

module.exports = {
  createWallet,
  getWallets,
  getWallet,
  updateStoreWallet,
  updateWallet,
  deleteWallet,
  deleteStoreWallet,
  getBanks,
  shareBalance,
  withdrawBalance,
};
