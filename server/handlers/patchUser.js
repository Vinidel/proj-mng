const User = require('../core/user');
const { userUpdateRequestSchema } = require('../utils/validators');

function isErrorFromValidation(error) {
  // eslint-disable-next-line no-underscore-dangle
  return Boolean(error._original);
}

async function patchUser(req, res) {
  try {
    const { params, body } = req;
    await userUpdateRequestSchema.validateAsync(req.body);
    const currentUser = await User.MakeUser(req.localUser);
    const updatedUser = await currentUser.updateUser(params.userId, body);
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (isErrorFromValidation(error)) {
      return res.status(400).json(error);
    }

    return res.status(500).json(error.message);
  }
}

module.exports = patchUser;
