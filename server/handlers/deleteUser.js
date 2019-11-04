const User = require('../core/user');

function isErrorFromValidation(error) {
  // eslint-disable-next-line no-underscore-dangle
  return Boolean(error._original);
}

async function deleteUser(req, res) {
  try {
    const { params } = req;
    const user = await User.MakeUser(req.localUser);
    await user.deleteUser(params.userId);
    return res.status(200).json({});
  } catch (error) {
    if (isErrorFromValidation(error)) {
      return res.status(400).json(error);
    }

    return res.status(500).json(error.message);
  }
}

module.exports = deleteUser;
