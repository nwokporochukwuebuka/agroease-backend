/* eslint-disable prettier/prettier */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.ProductImages = sequelize.define('Product_Images', {
    url: {
        type: DataTypes.STRING,
      },
      public_id: {
        type: DataTypes.STRING,
      },
  
});
