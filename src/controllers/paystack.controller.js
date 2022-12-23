const httpStatus = require('http-status');
const { paystackService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const initializeTransaction = catchAsync(async (req, res) => {
  const { body } = req;
  const url = await paystackService.initializeTransaction(body);
  console.log(url);
  res.status(httpStatus.OK).redirect(url);
});

const paystackCallback = catchAsync(async (req, res) => {
  const { reference } = req.query;
  const data = await paystackService.verifyPayment(reference);
  res.status(httpStatus.OK).json(data);
});

module.exports = { paystackCallback, initializeTransaction };
