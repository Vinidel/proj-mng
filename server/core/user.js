const userService = require('../services/userService');
const Security = require('./security');
const projectService = require('../services/projectService');

const ADMIN_ROLE = 'ADMIN';
const PM_ROLE = 'PROJECT_MANAGER';

const canGetAllProjects = () => ({
  getProjects: async () => projectService.getAllProjects(),
});

const canGetTheirProjects = (self) => ({
  getProjects: async () => projectService.getProjectsByUserId(self.id),
});

const canSave = () => ({
  save: async (newUser) => {
    const encryptedPassword = await Security.makeSecurity().encrypt(newUser.password);
    return userService.createUser({ ...newUser, password: encryptedPassword });
  },
});

const Admin = (name, email, password, id) => {
  const self = {
    name,
    email,
    role: ADMIN_ROLE,
    password,
    id,
  };

  return { ...self, ...canGetAllProjects(self), ...canSave(self) };
};


const ProjectManager = (name, email, password, id) => {
  const self = {
    name,
    email,
    role: PM_ROLE,
    password,
    id,
  };

  return { ...self, ...canGetTheirProjects(self), ...canSave(self) };
};

const MakeUser = ({
  name, email, password, role, id,
}) => {
  switch (role) {
    case ADMIN_ROLE:
      return Admin(name, email, password, id);
    default:
      return ProjectManager(name, email, password, id);
  }
};

module.exports = { MakeUser };
