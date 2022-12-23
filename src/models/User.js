const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

exports.User = sequelize.define('User', {
  firstname: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    trim: true,
    allowNull: false,
  },
  email: {
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
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: {
        // eslint-disable-next-line no-useless-escape
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i,
        msg: 'Password must be at least 8 characters long and must contain at least one number and symbol.',
      },
    },
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  type: {
    type: DataTypes.ENUM('user', 'admin', 'farmer'),
    defaultValue: 'user',
  },
});
