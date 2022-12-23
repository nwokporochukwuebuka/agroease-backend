const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      trim: true,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: true,
    },
  },
  { indexes: [{ unique: true, fields: ['name'] }] }
);
