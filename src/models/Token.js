const { DataTypes } = require('sequelize');
const { tokenTypes } = require('../config/tokens');
const { sequelize } = require('../config/database');

module.exports.Token = sequelize.define('token', {
  token: {
    type: DataTypes.STRING(2000),
    allowNull: false,
    trim: true,
    index: true,
  },
  user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL),
    allowNull: false,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
  },
});
