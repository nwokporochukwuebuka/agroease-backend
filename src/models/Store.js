const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.Store = sequelize.define('Store', {
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
  business_email: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email',
      },
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  farmer_image: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
});
