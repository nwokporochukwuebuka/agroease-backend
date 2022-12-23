const express = require('express');
const { storeController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth(), storeController.createStore).get(storeController.getStores);

router
  .route('/:storeId')
  .get(storeController.getStore)
  .patch(auth(), storeController.updateStore)
  .delete(auth(), storeController.deleteStore);

router
  .route('/:storeId/:walletId')
  .patch(auth(), storeController.updateStoreWallet)
  .delete(auth(), storeController.deleteStoreWallet);

module.exports = router;
