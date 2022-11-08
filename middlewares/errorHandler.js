module.exports = (err, req, res, next) => {
  console.log(
    `[Error Handler]: Path: ${req.path}, Method: ${req.method}, ${err.stack}`
  );
  return res.status(err.status || 500).json({
    message: err.message,
  });
};
