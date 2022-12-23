const httpStatus = require('http-status');
// eslint-disable-next-line camelcase
const { Billing_address } = require('../models/Billing_address');
const { userService } = require('./index');
const ApiError = require('../utils/ApiError');

/**
 * Create a new delivery address
 * @param {ObjectId} userId
 * @param {object} addressBody
 * @return {promise<billingAddress>}
 */
const createBillingAddress = async (userId, addressBody) => {
  const address = await Billing_address.findOne({ where: { Userid: userId } });

  if (address) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Address already exists');
  }

  const user = await userService.getUserById(userId);

  const billingAddress = await Billing_address.create(addressBody);
  user.setBilling_address(billingAddress);

  return billingAddress;
};

/**
 * Get delivery addresses
 * @return {promise<billingAddress>}
 */
const getBillingAddresses = async () => {
  const billingAddress = await Billing_address.findAll();
  return billingAddress;
};

/**
 * Get delivery address
 * @param {string} addressId
 * @return {promise<billingAddress>}
 */
const getBillingAddress = async (addressId) => {
  const billingAddress = await Billing_address.findByPk(addressId);
  if (!billingAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  return billingAddress;
};

/**
 * Update delivery address
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @param {object} addressBody
 * @return {promise<billingAddress>}
 */
const updateBillingAddress = async (userId, addressId, addressBody) => {
  const billingAddress = await Billing_address.findByPk(addressId);
  if (!billingAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const { type } = await userService.getUserById(userId);

  if (billingAddress.UserId === userId || type === 'admin') {
    Object.assign(billingAddress, addressBody);
    // eslint-disable-next-line no-return-await
    return await Billing_address.update(billingAddress.dataValues, { where: { id: addressId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot edit');
};

/**
 * Delete delivery address
 * @param {ObjectId} userId
 * @param {ObjectId} addressId
 * @return {promise<billingAddress>}
 */
const deleteBillingAddress = async (userId, addressId) => {
  const billingAddress = await Billing_address.findByPk(addressId);
  if (!billingAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const { type } = await userService.getUserById(userId);

  if (billingAddress.UserId === userId || type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Billing_address.destroy({ where: { id: addressId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete');
};

module.exports = {
  createBillingAddress,
  getBillingAddresses,
  getBillingAddress,
  updateBillingAddress,
  deleteBillingAddress,
};
