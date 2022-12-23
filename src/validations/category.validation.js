/* eslint-disable prettier/prettier */
const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().max(400),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string().max(400),
  }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().required(),
  }),
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
