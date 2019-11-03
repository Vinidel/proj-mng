const { authorizationSchema } = require('../utils/validators');
const Security = require('../core/security');
const User = require('../core/user');

function isErrorFromValidation(error) {
  // eslint-disable-next-line no-underscore-dangle
  return Boolean(error._original);
}

async function login(req, res) {
  try {
    await authorizationSchema.validateAsync(req.body);
    const security = Security.makeSecurity();
    const userDB = await security.verifyUserByEmail(req.body.email);
    if (!userDB) {
      return res.status(401).json({ message: 'Invalid' });
    }
    const user = await User.MakeUser(userDB);
    const isPasswordValid = await security.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid' });
    }

    const token = Security.makeSecurity().generateJwt(user);
    return res.status(201).json({ token });
  } catch (error) {
    if (isErrorFromValidation(error)) {
      return res.status(400).json(error);
    }
    return res.status(500).json(error.message);
  }
}

module.exports = login;
