/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { productService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createProduct = catchAsync(async (req, res) => {
  
  const { userId, files, body } = req;
  await productService.createProduct(userId, body, files);
  res.status(httpStatus.CREATED).json({status: 'success', message: 'product created'});
});

const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getProducts();
  res.status(httpStatus.OK).json(products);
});

const getStoreProducts = catchAsync(async (req, res) => {
  const { storeId } = req.params;
  const products = await productService.getStoreProducts(storeId);
  res.status(httpStatus.OK).json(products);
});

const getProduct = catchAsync(async (req, res) => {
  const products = await productService.getProductsById(req.params.productId);
  res.status(httpStatus.OK).json(products);
});

const updateProduct = catchAsync(async (req, res) => {
  const { userId, files, body } = req;

  await productService.updateProductById(userId, req.params.productId, body, files);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { userId } = req;
  await productService.deleteProductById(userId, req.params.productId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

// admin
const getAdminProducts = catchAsync(async (req, res) => {
  const products = await productService.getAdminProducts();
  res.status(httpStatus.OK).json(products);
});

module.exports = {
  createProduct,
  getProducts,
  getStoreProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
};
