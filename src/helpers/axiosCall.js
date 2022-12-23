const axios = require('axios');

const axiosCall = axios.create({
  baseURL: 'https://api.stackexchange.com',
  headers: { 'Content-Type': 'application/json' },
});

module.exports = { axiosCall };
