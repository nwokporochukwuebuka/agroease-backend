/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createAddress = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

const getAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().required(),
  }),
};

const updateAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    zip: Joi.string(),
    address: Joi.string(),
  }),
};

const deleteAddress = {
  params: Joi.object().keys({
    addressId: Joi.string().required(),
  }),
};

module.exports = {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
};
