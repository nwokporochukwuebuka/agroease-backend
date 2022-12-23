const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Payout = sequelize.define('Payout', {
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payout_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
