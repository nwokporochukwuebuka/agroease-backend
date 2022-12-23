/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createProductUnit = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getProductUnit = {
  params: Joi.object().keys({
    productUnitId: Joi.string().required(),
  }),
};

const updateProductUnit = {
  params: Joi.object().keys({
    productUnitId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
  }),
};

const deleteProductUnit = {
  params: Joi.object().keys({
    productUnitId: Joi.string().required(),
  }),
};

module.exports = {
  createProductUnit,
  getProductUnit,
  updateProductUnit,
  deleteProductUnit,
};
