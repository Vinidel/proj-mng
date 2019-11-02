const ADMIN_ROLE = 'ADMIN';
const PM_ROLE = 'PROJECT_MANAGER';

const canGetAllProjects = (self) => ({
  getProjects: () => [{ name: 'Project' }, { name: 'Project 2' }],
});

const canGetTheirProjects = (self) => ({
  getProjects: () => [{ name: 'My Project' }],
});

const canSave = (self) => ({
  save: () => (self),
});

const Admin = (name, email) => {
  const self = {
    name,
    email,
    role: ADMIN_ROLE,
  };

  return { ...self, ...canGetAllProjects(self), ...canSave(self) };
};


const ProjectManager = (name, email) => {
  const self = {
    name,
    email,
    role: PM_ROLE,
  };

  return { ...self, ...canGetTheirProjects(self), ...canSave(self) };
};

const MakeUser = ({
  name, email, password, role,
}) => {
  switch (role) {
    case ADMIN_ROLE:
      return Admin(name, email, password, role);
    default:
      return ProjectManager(name, email, password, role);
  }
};

module.exports = { MakeUser };
