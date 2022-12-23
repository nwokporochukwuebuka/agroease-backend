const express = require('express');
const { walletController } = require('../controllers');
const { auth } = require('../middleware/auth');


const router = express.Router();

router.route('/').post(auth(), walletController.createWallet).get(auth(), walletController.getWallets);
router.route('/banks').get(walletController.getBanks);
router
  .route('/:addressId')
  .get(auth(), walletController.getWallet)
  .patch(auth(), walletController.updateWallet)
  .delete(auth(), walletController.deleteWallet);

module.exports = router;
