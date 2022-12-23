/* eslint-disable camelcase */
const Flutterwave = require('flutterwave-node-v3');
const axios = require('axios');
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const { FLW_PUBLIC_KEY, FLW_SECRET_KEY } = require('../config/config').flutterwave;
const banks = require('../utils/banks');

const flw = new Flutterwave(FLW_PUBLIC_KEY, FLW_SECRET_KEY);

const apiCall = axios.create({
  baseURL: 'https://api.flutterwave.com/v3',
  headers: { authorization: `Bearer ${FLW_SECRET_KEY}` },
});

/**
 * Initialize payment
 * @param {object} details
 * @returns {Promise<paymentLink>}
 */
const initializePayment = async (details) => {
  /**
   * details will contain
   * amount
   * customer {email}
   */

  const payload = {
    ...details,
    tx_ref: uuidv4(),
    currency: 'NGN',
    redirect_url: 'https://agro-ease-backend-production.up.railway.app/v1/flutterwave/cb/payment',
  };
  logger.info(`${payload.tx_ref}`.bgGreen);
  const res = await apiCall.post('/payments', payload);
  const {
    data: { link },
  } = res.data;
  return link;
};

/**
 * Veify payment
 * @param {*} status
 * @param {*} tx_ref
 * @param {*} transaction_id
 * @returns {Promise<paymentStatus>}
 */
const verifyPayment = async (status, tx_ref, transaction_id) => {
  if (status === 'successful') {
    const newUrl = `http://localhost:3000/BuyerOrderSuccesful/?status=${status}&tx_ref=${tx_ref}&transaction_id=${transaction_id}`
    return newUrl;
  }else if(status === 'failed' || status === 'cancelled'){
    const newUrl = `http://localhost:3000/BuyerOrderfailed/?status=${status}&tx_ref=${tx_ref}&transaction_id=${transaction_id}`
    return newUrl;
  }
  throw new ApiError(httpStatus.BAD_REQUEST, status);
};

/**
 * not in use
 */
const createBeneficiary = async (wallet) => {
  const { code } = banks[wallet.bank];
  const { account_number, account_name } = wallet;
  const payload = {
    account_number,
    account_bank: code,
    beneficiary_name: account_name,
  };
  try {
    const res = await apiCall.post('/beneficiaries', payload);
    console.log(res.data);
    const {
      data: { id },
    } = res.data;
    return id;
  } catch (error) {
    console.log(error.response);
    throw new ApiError(httpStatus.BAD_REQUEST, error.response.data.message);
  }
};

const initaitePayout = async (wallet) => {
  const { code } = banks[wallet.bank];
  const { account_number, account_name } = wallet;
  const payload = {
    account_number,
    account_bank: code,
    account_name,
    narration: 'payout from AgroEase',
    currency: 'NGN',
  };

  try {
    const res = await apiCall.post('/transfers', payload);

    const {
      status,
      message,
      data: { id, reference, amount, fee },
    } = res.data;

    return { status, message, reference, id, amount, fee };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
  createBeneficiary,
  initaitePayout,
};
