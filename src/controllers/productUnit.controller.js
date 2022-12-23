const httpStatus = require('http-status');
const { productUnitService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createProductUnit = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  const productUnit = await productUnitService.createProductUnit(userId, req.body);

  res.status(httpStatus.CREATED).json(productUnit);
});

const getProductUnits = catchAsync(async (req, res) => {
  const productUnits = await productUnitService.getProductUnits();
  res.status(httpStatus.OK).json(productUnits);
});

const getProductUnitById = catchAsync(async (req, res) => {
  const productUnit = await productUnitService.getProductUnitById(req.params.productUnitId);
  res.status(httpStatus.OK).json(productUnit);
});

const updateProductUnit = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await productUnitService.updateProductUnitById(userId, req.params.productUnitId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deletProductUnitById = catchAsync(async (req, res) => {
  // req.userId to be assigned to userId
  const { userId } = req;
  await productUnitService.deleteProductUnitById(userId, req.params.productUnitId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createProductUnit,
  getProductUnits,
  getProductUnitById,
  updateProductUnit,
  deletProductUnitById,
};
