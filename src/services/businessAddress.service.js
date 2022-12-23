const httpStatus = require('http-status');
// eslint-disable-next-line camelcase
const { Business_address } = require('../models/Business_address');
const { Store } = require('../models/Store');
const { userService } = require('./index');
const ApiError = require('../utils/ApiError');

/**
 * Create a new delivery address
 * @param {ObjectId} storeId
 * @param {object} addressBody
 * @return {promise<businessAddress>}
 */
const createBusinessAddress = async (storeId, addressBody) => {
  const address = await Business_address.findOne({ where: { StoreId: storeId } });

  if (address) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Address already exists');
  }

  const store = await Store.findByPk(storeId);

  const businessAddress = await Business_address.create(addressBody);
  store.setBusiness_address(businessAddress);

  return businessAddress;
};

/**
 * Get delivery addresses
 * @return {promise<businessAddress>}
 */
const getBusinessAddresses = async () => {
  const businessAddress = await Business_address.findAll();
  return businessAddress;
};

/**
 * Get delivery address
 * @param {string} addressId
 * @return {promise<businessAddress>}
 */
const getBusinessAddress = async (addressId) => {
  const businessAddress = await Business_address.findByPk(addressId);
  if (!businessAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  return businessAddress;
};

/**
 * Update delivery address
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @param {object} addressBody
 * @return {promise<businessAddress>}
 */
const updateBusinessAddress = async (userId, addressId, addressBody) => {
  const businessAddress = await Business_address.findByPk(addressId);
  if (!businessAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const { type } = await userService.getUserById(userId);
  const { UserId } = await Store.findOne({ where: { UserId: userId } });

  if (UserId === userId || type === 'admin') {
    Object.assign(businessAddress, addressBody);
    // eslint-disable-next-line no-return-await
    return await Business_address.update(businessAddress.dataValues, { where: { id: addressId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot edit');
};

/**
 * Delete delivery address
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @return {promise<businessAddress>}
 */
const deleteBusinessAddress = async (userId, addressId) => {
  const businessAddress = await Business_address.findByPk(addressId);
  if (!businessAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const { type } = await userService.getUserById(userId);
  const { UserId } = await Store.findOne({ where: { UserId: userId } });

  if (UserId === userId || type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Business_address.destroy({ where: { id: addressId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete');
};

module.exports = {
  createBusinessAddress,
  getBusinessAddresses,
  getBusinessAddress,
  updateBusinessAddress,
  deleteBusinessAddress,
};
