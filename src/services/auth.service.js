const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const tokenService = require('./token.service');
const userService = require('./user.service');
const { Store } = require('../models/Store');
const { Token } = require('../models/Token');
const { User } = require('../models/User');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const logger = require('../config/logger');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await userService.isPasswordMatch(password, user.dataValues))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  const userInfo = await User.findOne({
    where: { email },
    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
    include: [{ model: Store, attributes: { exclude: ['createdAt', 'updatedAt'] } }],
  });
  return userInfo;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    where: { token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false },
  });

  logger.info(refreshTokenDoc);

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token not found');
  }
  // DELETE TOKEN AFTERWARDS
  await Token.destroy({ where: { id: refreshTokenDoc.id } });
  // await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.destroy({ where: { id: refreshTokenDoc.id } });
    // await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user.id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, error);
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    logger.info(user);
    if (!user) {
      throw new Error();
    }
    // eslint-disable-next-line no-param-reassign
    newPassword = await bcrypt.hashSync(newPassword, 10);
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.destroy({ where: { user: user.id, type: tokenTypes.RESET_PASSWORD } });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, `Password reset failed${error}`);
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    logger.info(`verifyEmailToken: ${verifyEmailTokenDoc}`);

    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    logger.info(user);
    logger.info(user.id);

    if (!user) {
      throw new Error();
    }
    await Token.destroy({ where: { user: user.id, type: tokenTypes.VERIFY_EMAIL } });
    await userService.updateUserById(user.id, { isVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * current user
 * @param {string} userId
 * @returns {Promise}
 */
const getCurrentUser = async (userId) => {
  const user = await userService.getUserById(userId);
  return user;
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
  getCurrentUser,
};
