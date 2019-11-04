/* eslint-disable no-useless-catch */
const database = require('../database/models');

async function addProject(project) {
  try {
    return database.Project.create(project);
  } catch (error) {
    throw error;
  }
}

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
    throw error;
  }
}

async function removeProject(projectId) {
  try {
    const project = await database.Project.findOne({
      where: { id: Number(projectId) },
    });
    if (project) {
      const deletedProject = await project.destroy();
      return deletedProject;
    }
    // THrow error ?
    return null;
  } catch (error) {
    throw error;
  }
}

async function update(projectId, newProject) {
  try {
    const project = await database.Project.findOne({
      where: { id: Number(projectId) },
    });
    if (project) {
      const deletedProject = await project.update(newProject);
      return deletedProject;
    }
    // THrow error ?
    return null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProjects,
  getProjectsByUserId,
  removeProject,
  addProject,
  update,
};
