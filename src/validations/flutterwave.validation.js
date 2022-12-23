/* eslint-disable prettier/prettier */
const Joi = require('joi');

const initializeTransaction = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    customer: Joi.object().keys({ email: Joi.string().required() }),
  }),
};

module.exports = {
  initializeTransaction,
};
