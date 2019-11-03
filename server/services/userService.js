/* eslint-disable no-useless-catch */
const database = require('../database/models');

async function getUsers() {
  try {
    return database.User.findAll();
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    return database.User.findOne({
      where: {
        id: Number(userId),
      },
    });
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(userEmail) {
  try {
    const user = await database.User.findOne({
      where: {
        email: userEmail,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function removeUser(userId) {
  try {
    const user = await database.User.findOne({
      where: { id: Number(userId) },
    });
    if (user) {
      const deletedUser = await database.User.destroy({
        where: { id: Number(userId) },
      });

      return deletedUser;
    }
    // THrow error ?
    return null;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    return await database.User.create(user);
  } catch (error) {
    const newError = {
      code: error.original.code,
      message: error.original.message,
    };
    throw newError;
  }
}


async function update(projectId, newProject) {
  // try {
  //   const project = await database.Project.findOne({
  //     where: { id: Number(projectId) },
  //   });
  //   if (project) {
  //     const deletedProject = await database.Project.destroy({
  //       where: { id: Number(projectId) },
  //     });

  //     return deletedProject;
  //   }
  //   // THrow error ?
  //   return null;
  // } catch (error) {
  //   throw error;
  // }
}

module.exports = {
  getUsers,
  getUserById,
  removeUser,
  createUser,
  getUserByEmail,
};
