const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.OrderRow = sequelize.define('Order_Row', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_pcs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: true,
  },
});
