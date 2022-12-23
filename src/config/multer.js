/* eslint-disable prettier/prettier */
const multer = require('multer');

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });
module.exports = upload;