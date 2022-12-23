exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode < 400 ? 401 : res.statusCode;

  res.status(statusCode);
  // console.log(err);
  res.json({ message: err.message });
};
