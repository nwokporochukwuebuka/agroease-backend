/* eslint-disable prettier/prettier */
const express = require('express');
const { auth } = require('../middleware/auth');
const productImagesController = require('../controllers/productImages.controller');

const router = express.Router();

router.route('/:public_id').delete(auth(), productImagesController.deleteProductImages);

module.exports = router;
