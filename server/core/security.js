const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

const FAKE_SALT = 8;
const canEncrypt = () => ({
  encrypt: (password) => {
    const hash = bcrypt.hashSync(password, FAKE_SALT);
    return hash;
  },
});

const canComparePassword = () => ({
  compare: async (password, passwordDB) => {
    const result = await bcrypt.compare(password, passwordDB);
    return result;
  },
});

const canGenerateJWT = () => ({
  generateJwt: (user) => {
    const token = jwt.sign({
      email: user.email,
      role: user.role,
      id: user.id,
    }, process.env.JWT_KEY, {
      expiresIn: '10h',
    });
    return token;
  },
});

const canVerifyIfUserExists = () => ({
  verifyUserByEmail: async (userEmail) => {
    const userDb = await userService.getUserByEmail(userEmail);
    if (userDb) {
      return userDb;
    }
    return null;
  },
});

const Security = () => ({
  ...canComparePassword(),
  ...canEncrypt(),
  ...canVerifyIfUserExists(),
  ...canGenerateJWT(),
});

const makeSecurity = () => Security();

module.exports = { makeSecurity };
