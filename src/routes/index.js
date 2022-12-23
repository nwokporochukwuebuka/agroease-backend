const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const deliveryAddressRoutes = require('./deliveryAddress.route');
const billingAddressRoutes = require('./billingAddress.route');
const businessAddressRoutes = require('./businessAddress.route');
const walletRoutes = require('./wallet.route');
const storeRoutes = require('./store.route');
const categoryRoutes = require('./category.route');
const productRoutes = require('./product.route');
const productImagesRoutes = require('./productImages.route');
const productUnitRoutes = require('./productUnit.route');
const orderStatusRoutes = require('./orderStatus.route');
const orderRoutes = require('./order.route');
const paystackRoutes = require('./paystack.route');
const flutterwaveRoutes = require('./flutterwave.route');

const router = express.Router();

const defaultRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/wallet', route: walletRoutes },
  { path: '/delivery/address', route: deliveryAddressRoutes },
  { path: '/billing/address', route: billingAddressRoutes },
  { path: '/business/address', route: businessAddressRoutes },
  { path: '/auth', route: authRoutes },
  { path: '/store', route: storeRoutes },
  { path: '/category', route: categoryRoutes },
  { path: '/product/images', route: productImagesRoutes },
  { path: '/product', route: productRoutes },
  { path: '/units', route: productUnitRoutes },
  { path: '/orders/status', route: orderStatusRoutes },
  { path: '/orders', route: orderRoutes },
  { path: '/paystack', route: paystackRoutes },
  { path: '/flutterwave', route: flutterwaveRoutes },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
