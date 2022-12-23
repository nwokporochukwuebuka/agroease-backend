const httpStatus = require('http-status');
// eslint-disable-next-line camelcase
const { Delivery_address } = require('../models/Delivery_address');
const { userService } = require('./index');
const ApiError = require('../utils/ApiError');

/**
 * Create a new delivery address
 * @param {objectId} userId
 * @param {object} address
 * @return {promise<deliveryAddress>}
 */
const createDeliveryAddress = async (userId, addressBody) => {
  const address = await Delivery_address.findOne({ where: { Userid: userId } });

  if (address) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Address already exists');
  }

  const user = await userService.getUserById(userId);

  const deliveryAddress = await Delivery_address.create(addressBody);
  user.setDelivery_address(deliveryAddress);

  return deliveryAddress;
};

/**
 * Get delivery addresses
 * @return {promise<deliveryAddress>}
 */
const getDeliveryAddresses = async () => {
  const deliveryAddress = await Delivery_address.findAll();
  return deliveryAddress;
};

/**
 * Get delivery address
 * @param {string} addressId
 * @return {promise<deliveryAddress>}
 */
const getDeliveryAddress = async (addressId) => {
  const deliveryAddress = await Delivery_address.findByPk(addressId);
  if (!deliveryAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  return deliveryAddress;
};

/**
 * Update delivery address
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @param {object} addressBody
 * @return {promise<deliveryAddress>}
 */
const updateDeliveryAddress = async (userId, addressId, addressBody) => {
  const deliveryAddress = await Delivery_address.findByPk(addressId);
  if (!deliveryAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const { type } = await userService.getUserById(userId);

  if (deliveryAddress.UserId === userId || type === 'admin') {
    Object.assign(deliveryAddress, addressBody);
    // eslint-disable-next-line no-return-await
    return await Delivery_address.update(deliveryAddress.dataValues, { where: { id: addressId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot edit');
};

/**
 * Delete delivery address
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @return {promise<deliveryAddress>}
 */
const deleteDeliveryAddress = async (userId, addressId) => {
  const deliveryAddress = await Delivery_address.findByPk(addressId);
  if (!deliveryAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const { type } = await userService.getUserById(userId);

  if (deliveryAddress.UserId === userId || type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Delivery_address.destroy({ where: { id: addressId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete');
};

module.exports = {
  createDeliveryAddress,
  getDeliveryAddresses,
  getDeliveryAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress,
};
