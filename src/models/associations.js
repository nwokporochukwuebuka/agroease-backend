const { User } = require('./User');
// eslint-disable-next-line camelcase
const { Billing_address } = require('./Billing_address');
// eslint-disable-next-line camelcase
const { Delivery_address } = require('./Delivery_address');
// eslint-disable-next-line camelcase
const { Business_address } = require('./Business_address');
const { Wallet } = require('./Wallet');
const { Store } = require('./Store');

const { Category } = require('./Category');
const { Product } = require('./product');
const { ProductImages } = require('./ProductImages');
const { ProductUnit } = require('./ProductUnit');
const { OrderRow } = require('./OrderRow');
const { OrderStatus } = require('./OrderStatus');
const { Order } = require('./Order');
const { Payout } = require('./Payouts');

exports.association = () => {
  // ONE TO One
  User.hasOne(Billing_address, { onDelete: 'CASCADE' });
  Billing_address.belongsTo(User);

  User.hasOne(Delivery_address, { onDelete: 'CASCADE' });
  Delivery_address.belongsTo(User);

  Wallet.hasOne(User);
  User.belongsTo(Wallet);

  User.hasOne(Store);
  Store.belongsTo(User);

  Wallet.hasOne(Store);
  Store.belongsTo(Wallet);

  Store.hasOne(Business_address);
  Business_address.belongsTo(Store);

  ProductUnit.hasOne(Product, {
    foreignKey: 'Unit',
    sourceKey: 'name',
  });
  Product.belongsTo(ProductUnit, {
    foreignKey: 'Unit',
    targetKey: 'name',
  });

  OrderStatus.hasOne(Order, {
    foreignKey: 'Status',
    sourceKey: 'name',
  });
  Order.belongsTo(OrderStatus, {
    foreignKey: 'Status',
    targetKey: 'name',
  });

  OrderRow.hasOne(Payout, { onDelete: 'CASCADE' });
  Payout.belongsTo(OrderRow);

  Wallet.hasOne(Payout, { onDelete: 'CASCADE' });
  Payout.belongsTo(Wallet);

  // ONE TO MANY
  Store.hasMany(Product);
  Product.belongsTo(Store);

  Category.hasMany(Product, {
    foreignKey: 'CategoryName',
    sourceKey: 'name',
  });
  Product.belongsTo(Category, {
    foreignKey: 'CategoryName',
    targetKey: 'name',
  });

  Product.hasMany(ProductImages);
  ProductImages.belongsTo(Product);

  Store.hasMany(OrderRow);
  OrderRow.belongsTo(Store);

  Order.hasMany(OrderRow);
  OrderRow.belongsTo(Order);

  User.hasMany(Order);
  Order.belongsTo(User);

  Product.hasMany(OrderRow);
  OrderRow.belongsTo(Product);
  // MANY TO MANY
};
