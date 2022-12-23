const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { User } = require('../models/User');
// eslint-disable-next-line camelcase
const { Billing_address } = require('../models/Billing_address');
// eslint-disable-next-line camelcase
const { Delivery_address } = require('../models/Delivery_address');
const ApiError = require('../utils/ApiError');

/**
 * Check if email is taken
 * @param {string} email
 * @return {promise<boolean>}
 */
const isEmailTaken = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

/**
 * Check if the password is the user's stored password
 * @param {string} password
 * @return {promise<boolean>}
 */
const isPasswordMatch = async (password, user) => {
  const comp = bcrypt.compare(password, user.password);
  return comp;
};

/**
 * Create a new user
 * @param {object} userBody
 * @return {promise<User>}
 */
const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  // eslint-disable-next-line no-param-reassign
  userBody.password = await bcrypt.hashSync(userBody.password, 10);

  const { id } = await User.create(userBody);
  // eslint-disable-next-line no-return-await
  return await User.findOne({
    where: { id },
    attributes: ['id', 'firstname', 'lastname', 'phone_number', 'type'],
    include: [
      { model: Billing_address, attributes: ['country', 'state', 'city', 'zip', 'address'] },
      { model: Delivery_address, attributes: ['country', 'state', 'city', 'zip', 'address'] },
    ],
  });
};

/**
 * Get all users
 * @returns {Promise<users>}
 */
const getUsers = async () => {
  const users = await User.findAll({
    include: [
      { model: Billing_address, attributes: ['country', 'state', 'city', 'zip', 'address'] },
      { model: Delivery_address, attributes: ['country', 'state', 'city', 'zip', 'address'] },
    ],
  });
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    include: [
      { model: Billing_address, attributes: ['country', 'state', 'city', 'zip', 'address'] },
      { model: Delivery_address, attributes: ['country', 'state', 'city', 'zip', 'address'] },
    ],
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

/**
 * Get user wallet id
 * @param {ObjectId} id
 * @returns {Promise<WalletId>}
 */
const getWalletId = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const { WalletId } = user;
  return WalletId;
};

/**
 * Get user store id
 * @param {ObjectId} id
 * @returns {Promise<StoreId>}
 */
const getStoreId = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const { StoreId } = user;
  return StoreId;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  // eslint-disable-next-line no-return-await
  return await User.findOne({ where: { email }, attributes: { exclude: ['createdAt', 'updatedAt'] } });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);

  // eslint-disable-next-line no-return-await
  return await User.update(user.dataValues, {
    where: {
      id: userId,
    },
  });
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // eslint-disable-next-line no-return-await
  return await User.destroy({ where: { id: userId } });
};

module.exports = {
  createUser,
  getUsers,
  getWalletId,
  getStoreId,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  isPasswordMatch,
};
