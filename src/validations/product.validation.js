/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    data: Joi.string().required(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const updateOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

const deleteOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().required(),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  updateOrderStatus,
  deleteOrderStatus,
};
