const database = require('../database/models');
const projectService = require('./projectService');

jest.mock('../database/models');
describe('Project service', () => {
  let mockProjectsDB;

  beforeEach(() => {
    mockProjectsDB = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      destroy: jest.fn(),
    };
    database.Project = mockProjectsDB;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call findAll to get all projects', async () => {
    await projectService.getAllProjects();
    expect(mockProjectsDB.findAll).toHaveBeenCalled();
  });

  it('should call findAll with user id to find projects of specific user', async () => {
    const userId = '1';
    await projectService.getProjectsByUserId(userId);
    expect(mockProjectsDB.findAll).toHaveBeenCalledWith({ where: { UserId: Number(userId) } });
  });

  it('should remove project if project exists', async () => {
    mockProjectsDB.findOne.mockResolvedValue(mockProjectsDB);
    const projectId = '1';
    await projectService.removeProject(projectId);
    expect(mockProjectsDB.findOne).toHaveBeenCalledWith({ where: { id: Number(projectId) } });
    expect(mockProjectsDB.destroy).toHaveBeenCalled();
  });

  it('should return null if project does not exist when removing it', async () => {
    mockProjectsDB.findOne.mockResolvedValue();
    const projectId = '1';
    const r = await projectService.removeProject(projectId);
    expect(mockProjectsDB.findOne).toHaveBeenCalledWith({ where: { id: Number(projectId) } });
    expect(mockProjectsDB.destroy).not.toHaveBeenCalled();
    expect(r).toEqual(null);
  });
});
