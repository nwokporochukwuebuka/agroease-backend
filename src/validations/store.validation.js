/* eslint-disable prettier/prettier */
const BaseJoi = require('joi');
const ImageExtension = require('joi-image-extension');

const Joi = BaseJoi.extend(ImageExtension);

const createStore = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().max(400),
    business_email: Joi.string().email(),
    phone_number: Joi.number(),
    farmer_image: Joi.image().allowTypes(['jpg', 'png']),
    store_image: Joi.image().allowTypes(['jpg', 'png']),
    
    bank: Joi.string(),
    account_name: Joi.string(),
    date_of_birth: Joi.date(),
    nin: Joi.number(),
  }),
};

const getStore = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
};

const updateStore = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string().max(400),
  }),
};

const deleteStore = {
  params: Joi.object().keys({
    storeId: Joi.string().required(),
  }),
};

module.exports = {
  createStore,
  getStore,
  updateStore,
  deleteStore,
};