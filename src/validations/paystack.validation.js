/* eslint-disable prettier/prettier */
const Joi = require('joi');

const initializeTransaction = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

module.exports = {
  initializeTransaction,
};
