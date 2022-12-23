const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Revenue = sequelize.define('Revenue', {
  total: {
    type: DataTypes.INTEGER,
    trim: true,
    defaultValue: 0,
    allowNull: false,
  },
});
