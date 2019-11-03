const User = require('../core/user');

async function getProjects(req, res) {
  try {
    const currentUser = User.MakeUser(req.localUser);
    const projects = await currentUser.getProjects();
    return res.status(201).json(projects);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = getProjects;
