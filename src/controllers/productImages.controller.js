/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
const httpStatus = require('http-status');
const fs = require('fs');
const { formDataConverter } = require('../utils/formDataObjectConverter');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../config/cloudinary');
const { Product } = require('../models/product');
const { Store } = require('../models/Store');
const { productImagesService, productService } = require('../services');

const createProductImages = catchAsync(async (req, res) => {
  // upload to cloudinary
  const uploader = async (path) => await cloudinary.uploads(path, 'images');
  const urls = [];

  const { files } = req;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);

    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const { body, userId } = req;
  const store = await Store.findOne({ where: { UserId: userId } });
  const product = formDataConverter(body, 'product');
  const createdProduct = await Product.create(product);
  store.setProducts(createdProduct);
  await productImagesService.createProductImages(urls.map((Urls) => ({ ...Urls, ProductId: createdProduct.dataValues.id })));
  const farmerProduct = await productService.getProductsById(createdProduct.dataValues.id);
  res.status(httpStatus.CREATED).send(farmerProduct);
});

const deleteProductImages = catchAsync(async (req, res) => {
  // eslint-disable-next-line camelcase
  const { public_id } = req.params;

  await productImagesService.deleteProductImage(public_id);
  res.status(httpStatus.OK).json({ status: 'success', message: 'Deleted successfully' });
});


module.exports = {
  createProductImages,
  deleteProductImages,
};
