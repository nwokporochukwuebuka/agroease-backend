const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Category } = require('../models/Category');
const { userService } = require('./index');

/**
 * Create a new category
 * @param {object} requestBody
 * @return {promise<Category>}
 */
const createCategory = async (userId, requestBody) => {
  const { type } = await userService.getUserById(userId);
  if (type === 'admin') {
    const category = await Category.create(requestBody);
    return category;
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Create category');
};

/**
 * Get all categories
 * @returns {Promise<categories>}
 */
const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  const category = await Category.findOne({ where: { id } });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * Get category by name
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryByName = async (name) => {
  const category = await Category.findOne({ where: { name } });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (userId, categoryId, updateBody) => {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin') {
    Object.assign(category, updateBody);

    // eslint-disable-next-line no-return-await
    return await Category.update(category.dataValues, {
      where: {
        id: categoryId,
      },
    });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Update category');
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (userId, categoryId) => {
  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }

  const { type } = await userService.getUserById(userId);

  if (type === 'admin') {
    // eslint-disable-next-line no-return-await
    return await Category.destroy({ where: { id: categoryId } });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Create category');
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoryByName,
};
