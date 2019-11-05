function checkAdmin(req, res, next) {
  const { role } = req.localUser;
  if (role !== 'ADMIN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
}

module.exports = checkAdmin;
