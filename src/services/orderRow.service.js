const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { OrderRow } = require('../models/OrderRow');
const { Product } = require('../models/product');

/**
 * Get order rows
 * @returns {Promise<orderRows>}
 */
const getOrderRows = async () => {
  const orderRows = await OrderRow.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return orderRows;
};

/**
 * Get order row
 * @param {ObjectId} id
 * @returns {Promise<orderRow>}
 */
const getOrderRow = async (id) => {
  const orderRow = await OrderRow.findById(id);
  if (!orderRow) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order row not found');
  }
  return orderRow;
};

/**
 * Create order row
 * @param {object} requestBody
 * @returns {Promise<createdOrderRow>}
 */
const createOrderRow = async (requestBody) => {
  // decrease product quantity
  requestBody.forEach(async (order) => {
    const product = await Product.findByPk(order.ProductId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    if (product.dataValues.quantity < order.quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot order more than available quantity');
    }
    await product.decrement({ quantity: order.quantity });
  });

  const createdOrderRow = await OrderRow.bulkCreate(requestBody);
  return createdOrderRow;
};

module.exports = {
  getOrderRows,
  getOrderRow,
  createOrderRow,
};
