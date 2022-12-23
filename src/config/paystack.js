/* eslint-disable prettier/prettier */
const request = require('request');
const config = require('./config');

const paystack = () => {
  const MySecretKey = `Bearer ${config.paystack.secret}`;
  // sk_test_xxxx to be replaced by your own secret key
  const initializePayment = (form, mycallback) => {
    const option = {
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const option = {
      url: `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`,
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };

  const transferrecipient = (form, mycallback) => {
    const option = {
      url: 'https://api.paystack.co/transferrecipient',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };

    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };

  const payout = (form, mycallback) => {
    const option = {
      url: 'https://api.paystack.co/transfer',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };

  const finalizeTransfer = (form, mycallback) => {
    const option = {
      url: 'https://api.paystack.co/transfer/finalize_transfer',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  };

  const getBanks = (localBanks, mycallback) => {
    const option = {
      url: `https://api.paystack.co/bank`,
      headers: {
        authorization: MySecretKey,
        // 'content-type': 'application/json',
        // 'cache-control': 'no-cache',
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };

  return { initializePayment, verifyPayment, transferrecipient, getBanks, payout, finalizeTransfer };
};

module.exports = paystack;
