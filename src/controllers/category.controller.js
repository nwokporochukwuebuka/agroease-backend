const httpStatus = require('http-status');
const { categoryService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createCategory = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  const category = await categoryService.createCategory(userId, req.body);

  res.status(httpStatus.CREATED).json(category);
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(httpStatus.OK).json(categories);
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  res.status(httpStatus.OK).json(category);
});

const updateCategory = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await categoryService.updateCategoryById(userId, req.params.categoryId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteCategoryById = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await categoryService.deleteCategoryById(userId, req.params.categoryId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
};
