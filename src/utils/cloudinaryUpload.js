const cloudinary = require('../config/cloudinary');

// eslint-disable-next-line no-return-await
const uploader = async (path) => await cloudinary.uploads(path, 'images');

module.exports = uploader;
