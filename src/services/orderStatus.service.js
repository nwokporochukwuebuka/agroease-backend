const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { OrderStatus } = require('../models/OrderStatus');
const { userService } = require('./index');

/**
 * Create a new product status
 * @param {object} requestBody
 * @return {promise<status>}
 */
const createOrderStatus = async (userId, requestBody) => {
  const { type } = await userService.getUserById(userId);
  if (type === 'admin') {
    const status = await OrderStatus.create(requestBody);
    return status;
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Create status');
};

/**
 * Get all product status
 * @returns {Promise<statuss>}
 */
const getOrderStatuses = async () => {
  const statuss = await OrderStatus.findAll();
  return statuss;
};

/**
 * Get product status by id
 * @param {ObjectId} id
 * @returns {Promise<status>}
 */
const getOrderStatusById = async (id) => {
  const status = await OrderStatus.findOne({ where: { id } });
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'status not found');
  }
  return status;
};

/**
 * Get product status by name
 * @param {ObjectId} name
 * @returns {Promise<status>}
 */
const getOrderStatusByName = async (name) => {
  const status = await OrderStatus.findOne({ where: { name } });
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'status not found');
  }
  return status;
};

/**
 * Update status by id
 * @param {ObjectId} userId
 * @param {ObjectId} statusId
 * @param {Object} updateBody
 * @returns {Promise<status>}
 */
const updateOrderStatusById = async (userId, statusId, updateBody) => {
  const status = await OrderStatus.findByPk(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'status not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin') {
    Object.assign(status, updateBody);

    // eslint-disable-next-line no-return-await
    return await OrderStatus.update(status.dataValues, {
      where: {
        id: statusId,
      },
    });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Update status');
};

/**
 * Delete status by id
 * @param {ObjectId} statusId
 * @returns {Promise<status>}
 */
const deleteOrderStatusById = async (userId, statusId) => {
  const status = await OrderStatus.findByPk(statusId);
  if (!status) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order status not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await OrderStatus.destroy({ where: { id: statusId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete status');
};

module.exports = {
  createOrderStatus,
  getOrderStatuses,
  getOrderStatusById,
  getOrderStatusByName,
  updateOrderStatusById,
  deleteOrderStatusById,
};
