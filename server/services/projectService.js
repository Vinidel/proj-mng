/* eslint-disable no-useless-catch */
const database = require('../database/models');

async function getAllProjects() {
  try {
    return database.Project.findAll();
  } catch (error) {
    throw error;
  }
}

async function getProjectsByUserId(userId) {
  try {
    const projects = await database.Project.findAll({
      where: {
        userId: Number(userId),
      },
    });
    return projects;
  } catch (error) {
    console.log('Service', userId)
    console.log('Service', error)
    throw error;
  }
}

async function removeProject(projectId) {
  try {
    const project = await database.Project.findOne({
      where: { id: Number(projectId) },
    });
    if (project) {
      const deletedProject = await database.Project.destroy({
        where: { id: Number(projectId) },
      });

      return deletedProject;
    }
    // THrow error ?
    return null;
  } catch (error) {
    throw error;
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
  getAllProjects,
  getProjectsByUserId,
  removeProject,
};
