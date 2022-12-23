/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Store } = require('../models/Store');
const { Category } = require('../models/Category');
const { ProductImages } = require('../models/ProductImages');
const { storeService, userService, categoryService } = require('./index');
const { createProductImage, bulkDelete, updateProductImage } = require('./productImages.service');
const { Product } = require('../models/product');

/**
 * Get all products
 * @returns {Promise<stores>}
 */
const getProducts = async () => {
  const Products = await Product.findAll({
    where: {
      status: true,
    },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: Store, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: ProductImages, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  return Products;
};

/**
 * Get all storeproducts by admin
 * @returns {Promise<stores>}
 */
const getAdminProducts = async () => {
  const Products = await Product.findAll({
    include: [{ model: ProductImages }],
  });
  return Products;
};

/**
 * Get all storeproducts
 * @param {ObjectId} storeId
 * @returns {Promise<stores>}
 */
const getStoreProducts = async (storeId) => {
  const Products = await Product.findAll({
    where: {
      StoreId: storeId,
    },
    include: [{ model: ProductImages, attributes: { exclude: ['createdAt', 'updatedAt', 'ProductId'] } }],
  });
  return Products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getProductsById = async (id) => {
  const product = await Product.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: Store, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: ProductImages, attributes: { exclude: ['createdAt', 'updatedAt', 'ProductId'] } },
    ],
  });
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  return product;
};

/**
 * Create a new product
 * @param {ObjectId} userId
 * @param {object} requestBody
 * @return {promise<Store>}
 */
const createProduct = async (userId, cProduct, files) => {
  const images = await createProductImage(files);

  const category = await categoryService.getCategoryByName(cProduct.CategoryName);
  const store = await storeService.getStoreByUserId(userId);

  // eslint-disable-next-line no-param-reassign
  cProduct.StoreId = store.id;

  if (!store || !category) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Please enter a valid store or category');
  }

  // eslint-disable-next-line no-param-reassign
  const createdProduct = await Product.create(cProduct);
  createdProduct.setProduct_Images(images);
  // eslint-disable-next-line no-return-await
  const product = await getProductsById(createdProduct.dataValues.id);
  return product;
};

/**
 * Update product by id
 * @param {ObjectId} userId
 * @param {ObjectId} Id
 * @param {Object} updateBody
 * @returns {Promise<Store>}
 */
// eslint-disable-next-line no-shadow
const updateProductById = async (userId, id, updateBody, images) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const imageCount = await product.countProduct_Images();
  const inputImgCount = images.length;

  if (images && (imageCount === 5 || imageCount + inputImgCount) > 5) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Can only add a maximum of 5 images');
  }

  const storeId = product.StoreId;
  const store = await storeService.getStoreById(storeId);

  const { type } = await userService.getUserById(userId);

  if (type === 'admin' || store.UserId === userId) {
    if(images){
      await updateProductImage(images, id);
    }
    if (updateBody) {
      Object.assign(product, updateBody);
      // eslint-disable-next-line no-return-await
      return await product.update(product.dataValues, {
        where: { id },
      });
    }
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Update product');
};

/**
 * Delete product by id
 * @param {ObjectId} userId
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const deleteProductById = async (userId, id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const images = await product.getProduct_Images();
  const storeId = product.StoreId;
  const store = await storeService.getStoreById(storeId);

  const { type } = await userService.getUserById(userId);

  if (type === 'admin' || store.UserId === userId) {
    await bulkDelete(images);
    // eslint-disable-next-line no-return-await
    return await product.destroy({
      where: { id },
    });
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'Cannot Delete product');
};

module.exports = {
  createProduct,
  getProducts,
  getStoreProducts,
  getProductsById,
  updateProductById,
  deleteProductById,
  getAdminProducts,
};
