/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.ProductUnit = sequelize.define(
  'Product_Unit',
  {
    name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ['name'] }] }
);
