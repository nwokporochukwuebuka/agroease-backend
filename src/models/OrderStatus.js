/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.OrderStatus = sequelize.define(
  'Order_Status',
  {
    name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ['name'] }] }
);
