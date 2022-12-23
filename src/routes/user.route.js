const express = require('express');
const { userController } = require('../controllers');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth(), userController.createUser).get(auth(), userController.getUsers);

router
  .route('/:userId')
  .get(auth(), userController.getUser)
  .patch(auth(), userController.updateUser)
  .delete(auth(), userController.deleteUser);

module.exports = router;
