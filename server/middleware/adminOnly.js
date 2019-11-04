function checkAdmin(req, res, next) {
  const adminRole = req.localUser.role;
  console.log({ adminRole });
  if (adminRole !== 'ADMIN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}

module.exports = checkAdmin;
