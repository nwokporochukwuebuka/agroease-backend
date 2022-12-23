const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Wallet = sequelize.define('Wallet', {
  balance: {
    type: DataTypes.INTEGER,
    trim: true,
    defaultValue: 0,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('user', 'store'),
    defaultValue: 'user',
  },
  account_number: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  bank: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  account_name: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nin: {
    type: DataTypes.STRING,
    defaultValue: false,
    allowNull: false,
  },
});
