const User = require('../core/user');
const { projectUpdateRequestSchema } = require('../utils/validators');

function isErrorFromValidation(error) {
  // eslint-disable-next-line no-underscore-dangle
  return Boolean(error._original);
}

async function patchProject(req, res) {
  try {
    const { params, body } = req;
    await projectUpdateRequestSchema.validateAsync(req.body);
    const user = await User.MakeUser(req.localUser);
    const updatedProject = await user.updateProject(params.projectId, body);
    return res.status(201).json(updatedProject);
  } catch (error) {
    if (isErrorFromValidation(error)) {
      return res.status(400).json(error);
    }

    return res.status(500).json(error.message);
  }
}

module.exports = patchProject;
