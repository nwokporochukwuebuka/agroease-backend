const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { ProductUnit } = require('../models/ProductUnit');
const { userService } = require('./index');

/**
 * Create a new product unit
 * @param {object} requestBody
 * @return {promise<unit>}
 */
const createProductUnit = async (userId, requestBody) => {
  const { type } = await userService.getUserById(userId);
  if (type === 'admin') {
    const unit = await ProductUnit.create(requestBody);
    return unit;
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Create Unit');
};

/**
 * Get all product unit
 * @returns {Promise<units>}
 */
const getProductUnits = async () => {
  const units = await ProductUnit.findAll();
  return units;
};

/**
 * Get product unit by id
 * @param {ObjectId} id
 * @returns {Promise<unit>}
 */
const getProductUnitById = async (id) => {
  const unit = await ProductUnit.findOne({ where: { id } });
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  return unit;
};

/**
 * Get product unit by name
 * @param {ObjectId} name
 * @returns {Promise<unit>}
 */
const getProductUnitByName = async (name) => {
  const unit = await ProductUnit.findOne({ where: { name } });
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  return unit;
};

/**
 * Update unit by id
 * @param {ObjectId} userId
 * @param {ObjectId} unitId
 * @param {Object} updateBody
 * @returns {Promise<Unit>}
 */
const updateProductUnitById = async (userId, unitId, updateBody) => {
  const unit = await ProductUnit.findByPk(unitId);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin') {
    Object.assign(unit, updateBody);

    // eslint-disable-next-line no-return-await
    return await ProductUnit.update(unit.dataValues, {
      where: {
        id: unitId,
      },
    });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Update unit');
};

/**
 * Delete unit by id
 * @param {ObjectId} unitId
 * @returns {Promise<unit>}
 */
const deleteProductUnitById = async (userId, unitId) => {
  const unit = await ProductUnit.findByPk(unitId);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Unit not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await ProductUnit.destroy({ where: { id: unitId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot delete unit');
};

module.exports = {
  createProductUnit,
  getProductUnits,
  getProductUnitById,
  getProductUnitByName,
  updateProductUnitById,
  deleteProductUnitById,
};
