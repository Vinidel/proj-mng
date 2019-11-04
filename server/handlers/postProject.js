const User = require('../core/user');
const { projectRequestSchema } = require('../utils/validators');

function isErrorFromValidation(error) {
  // eslint-disable-next-line no-underscore-dangle
  return Boolean(error._original);
}

async function postProject(req, res) {
  try {
    await projectRequestSchema.validateAsync(req.body);
    const user = await User.MakeUser(req.localUser);
    const newproject = await user.createProject(req.body);
    return res.status(201).json(newproject);
  } catch (error) {
    if (isErrorFromValidation(error)) {
      return res.status(400).json(error);
    }

    return res.status(500).json(error.message);
  }
}

module.exports = postProject;
