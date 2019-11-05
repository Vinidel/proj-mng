const User = require('../core/user');

async function getUsers(req, res) {
  try {
    const currentUser = User.MakeUser(req.localUser);
    const users = await currentUser.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = getUsers;
