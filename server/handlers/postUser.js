const { userRequestSchema } = require('../utils/validators');
const User = require('../core/user');
const { userErrorCodes } = require('../utils/errors');

function isErrorFromValidation(error) {
  // eslint-disable-next-line no-underscore-dangle
  return Boolean(error._original);
}

function isErrorKnown(error) {
  return userErrorCodes.includes(error.code);
}

async function postUser(req, res) {
  try {
    await userRequestSchema.validateAsync(req.body);
    const newUser = await User.MakeUser(req.body).save();
    return res.status(201).json(newUser);
  } catch (error) {
    if (isErrorFromValidation(error)) {
      return res.status(400).json(error.message);
    }

    if (isErrorKnown(error)) {
      return res.status(400).json(error.message);
    }

    return res.status(500).json(error.message);
  }
}

module.exports = postUser;
