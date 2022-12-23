/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const fs = require('fs');
const ApiError = require('../utils/ApiError');
const uploader = require('../utils/cloudinaryUpload');
const { ProductImages } = require('../models/ProductImages');
const cloudinary = require('../config/cloudinary');

/**
 * uploads images to cloudinary
 * @param {Object} files
 * @returns {Promise<urls>}
 */
const upload = async (files) => {
  const urls = [];
  await Promise.all(
    files.map(async (file) => {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.unlinkSync(path);
    })
  );

  return urls;
};

/**
 * deletes product images on cloudinary
 * @param {Object} productImages
 * @returns {Promise<Object>}
 */
// eslint-disable-next-line no-return-await
const dispose = async (images) => await cloudinary.delete(images);

/**
 * creates product images
 * @param {Object} productImages
 * @returns {Promise<Object>}
 */
const createProductImage = async (productImages) => {
  const urls = await upload(productImages);
  return ProductImages.bulkCreate(urls);
};

/**
 * update product images
 * @param {Object} productImages
 * @param {ObjectId} id
 * @returns {Promise<Object>}
 */
const updateProductImage = async (productImages, id) => {
  const urls = await upload(productImages);
  const newImages = urls.map((image)=> {
    return {...image, ProductId:id}})
  return ProductImages.bulkCreate(newImages);
};

// eslint-disable-next-line camelcase
const deleteProductImage = async (public_id) => {
  const productImage = await ProductImages.findOne({ where: { public_id } });

  if (!productImage) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product image not found');
  }

  const deletedResponse = await dispose(public_id);

  if (deletedResponse.result === 'not found') {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product image not found on cloudinary');
  }

  await ProductImages.destroy({ where: { public_id } });
};

const bulkDelete = async (images) => {
  const publicIdx = images.map((image) => {
    return image.dataValues.public_id;
  });
  await Promise.all(
    publicIdx.map(async (id) => {
      await deleteProductImage(id);
    })
  );
};

module.exports = {
  createProductImage,
  deleteProductImage,
  updateProductImage,
  bulkDelete,
};
