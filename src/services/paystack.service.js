/* eslint-disable import/no-useless-path-segments */
/* eslint-disable camelcase */
const axios = require('axios');
const httpStatus = require('http-status');
const banks = require('../utils/banks');
const { secret } = require('../config/config').paystack;
const ApiError = require('../utils/ApiError');

const apiCall = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: { authorization: `Bearer ${secret}` },
});

/**
 * Create subAccount on Paystack
 * @param {object} details
 * @returns {Promise<subaccount>}
 */
const createSubAccount = async (details) => {
  /**
   * details contains
   * { "business_name": "Sunshine Studios",
   * "settlement_bank": "044",
   * "account_number": "0193274682",
   * "percentage_charge": 18.2 }
   */
  try {
    const res = await apiCall.post('/subaccount', details);
    const {
      data: { subaccount_code },
    } = res.data;
    return subaccount_code;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * Get recipient code from paystack
 * @param {object} wallet
 * @returns {Promise<recipient_code>}
 */
const getRecpientCode = async (wallet) => {
  const { name, code, currency, type } = banks[wallet.bank];
  const { account_number } = wallet;
  const payload = { type, name, account_number, bank_code: code, currency };

  const res = await apiCall.post('/transferrecipient', payload);
  const {
    data: { recipient_code },
  } = res.data;

  return recipient_code;
};

/**
 * transfer to recipient
 * @param {number} amount
 * @param {number} recipient
 * @returns {Promise<report>}
 */
const transferRecipient = async (amt, recipient) => {
  const amount = amt * 100;
  const payload = {
    source: 'balance',
    raeson: 'AgroEase settlement',
    amount,
    recipient,
  };
  try {
    const res = await apiCall.post('/transfer', payload);
    const {
      status,
      data: { amount: value, reason, transfer_code, createdAt, id },
    } = res.data;

    const report = {
      id,
      status,
      value,
      reason,
      transfer_code,
      createdAt,
    };

    return report;
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, err.message);
  }
};

/**
 * verify transaction
 * @param {ObjectId} reference
 * @returns {Promise<paymentStutus>}
 */
const verifyPayment = async (reference) => {
  try {
    const res = await apiCall.get(`transaction/verify/${reference}`);
    const {
      data: { id, status, gateway_response },
    } = res.data;
    const response = { id, status, gateway_response };
    return response;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

/**
 * initialize transaction
 * @param {number} amount
 * @returns {Promise<paymentStutus>}
 */
const initializeTransaction = async (details) => {
  const payload = {
    ...details,
    amount: details.amount * 100,
  };
  try {
    const res = await apiCall.post('/transaction/initialize', payload);
    const {
      data: { authorization_url },
    } = res.data;
    return authorization_url;
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

module.exports = { verifyPayment, createSubAccount, initializeTransaction, getRecpientCode, transferRecipient };
