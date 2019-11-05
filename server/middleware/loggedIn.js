const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.localUser = decoded;
    return next();
  } catch (error) {
    return res.status(401).json(error);
  }
}

module.exports = checkToken;
