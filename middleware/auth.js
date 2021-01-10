const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'temporary-secret-salt');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Authorization Required' });
  }
  req.user = payload;

  next();
};
