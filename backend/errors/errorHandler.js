module.exports = (err, req, res, next) => {
  let { statusCode = 500, message = 'An error occurred on the server' } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'MongoError' && err.code === 11000) {
    statusCode = 409;
    message = `An account with the email address '${err.keyValue.email}' already exists.`;
  }

  res.status(statusCode).send({ message });
};
