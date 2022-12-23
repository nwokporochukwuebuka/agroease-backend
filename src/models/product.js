/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
 quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,  
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  
});
