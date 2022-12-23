/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createOrderStatus = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getOrderStatus = {
  params: Joi.object().keys({
    orderStatusId: Joi.string().required(),
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
  createOrderStatus,
  getOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
