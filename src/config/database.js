const Sequelize = require('sequelize');
// eslint-disable-next-line import/no-useless-path-segments
const { sequelize } = require('../config/config');

exports.sequelize = new Sequelize(sequelize.url);
