const httpStatus = require('http-status');
const { userService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).json(user);
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();
  res.status(httpStatus.OK).json(users);
});

const getUser = catchAsync(async (req, res) => {
  const users = await userService.getUserById(req.params.userId);
  res.status(httpStatus.OK).json(users);
});

const updateUser = catchAsync(async (req, res) => {
  await userService.updateUserById(req.params.userId, req.body);
  res.status(httpStatus.OK).json({ message: 'updated successfully' });
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.OK).json({ message: 'deleted successfully' });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
