const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const logger = require('../config/logger');
const { walletService } = require('../services');

exports.Order = sequelize.define(
  'Order',
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterUpdate: (order) => {
        if (order.dataValues.Status === 'delivered' && order._previousDataValues.Status !== 'delivered') {
          // trigger wallet updates of product owners
          logger.info(`wallet of owners updated`.bgMagenta);
          walletService.shareBalance(order);
        }
      },
    },
  }
);
