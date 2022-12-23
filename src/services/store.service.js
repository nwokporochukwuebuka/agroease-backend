/* eslint-disable camelcase */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { sequelize } = require('../config/database');
const { Store } = require('../models/Store');
const { Wallet } = require('../models/Wallet');
const { User } = require('../models/User');
// eslint-disable-next-line camelcase
const { Business_address } = require('../models/Business_address');
const { userService } = require('./index');
// const { createBeneficiary } = require('./flutterwave.service');

/**
 * Get all stores
 * @returns {Promise<stores>}
 */
const getStores = async () => {
  const stores = await Store.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Business_address, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Wallet, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  return stores;
};

/**
 * Get store by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getStoreById = async (id) => {
  const store = await Store.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Business_address, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Wallet, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  return store;
};

/**
 * Get store by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getStoreByUserId = async (UserId) => {
  const store = await Store.findOne({
    where: { UserId },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Business_address, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Wallet, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }
  return store;
};

/**
 * Create a new store
 * @param {number} userId
 * @param {object} requestBody
 * @return {promise<Store>}
 */
const createStore = async (userId, requestBody) => {
  const storeId = await userService.getStoreId(userId);

  if (storeId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User is allowed 1 store');
  }

  const { wallet, store } = requestBody;
  // const beneficiary_id = await createBeneficiary(wallet);
  const walletBody = { ...wallet, type: 'store' };
  let createdStoreInfo;
  const updateUserBody = {};

  try {
    await sequelize.transaction(async (t) => {
      const storeWallet = await Wallet.create(walletBody, { transaction: t });

      store.WalletId = storeWallet.dataValues.id;

      store.UserId = userId;

      createdStoreInfo = await Store.create(store, { transaction: t });

      const user = await User.findByPk(userId);

      const { type } = user.dataValues;
      if (type === 'user') {
        updateUserBody.type = 'farmer';
      }

      updateUserBody.StoreId = createdStoreInfo.dataValues.id;

      await User.update(updateUserBody, { where: { id: userId }, transaction: t });
    });
    return await getStoreById(createdStoreInfo.dataValues.id);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Update store by id
 * @param {ObjectId} userId
 * @param {ObjectId} storeId
 * @param {Object} updateBody
 * @returns {Promise<Store>}
 */
const updateStoreById = async (userId, storeId, updateBody) => {
  const store = await Store.findByPk(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin' || store.UserId === userId) {
    Object.assign(store, updateBody);

    // eslint-disable-next-line no-return-await
    return await Store.update(store.dataValues, {
      where: {
        id: storeId,
      },
    });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot update store');
};

/**
 * Delete store by id
 * @param {ObjectId} userId
 * @param {ObjectId} storeId
 * @returns {Promise<Store>}
 */
const deleteStoreById = async (userId, storeId) => {
  const store = await Store.findByPk(storeId);
  if (!store) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Store not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin' || store.UserId === userId) {
    // eslint-disable-next-line no-return-await
    return await Store.destroy({ where: { id: storeId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Create category');
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
  getStoreByUserId,
};
