const database = require('../database/models');
const userService = require('./userService');

jest.mock('../database/models');

describe('User service', () => {
  let mockUserDB;

  beforeEach(() => {
    mockUserDB = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      destroy: jest.fn(),
    };
    database.User = mockUserDB;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get all users', async () => {
    await userService.getUsers();
    expect(mockUserDB.findAll).toHaveBeenCalled();
  });

  it('should call findOne with user id to find specific user', async () => {
    const userId = '1';
    await userService.getUserById(userId);
    expect(mockUserDB.findOne).toHaveBeenCalledWith({ where: { id: Number(userId) } });
  });

  it('should call findOne with user email to find specific user', async () => {
    const userEmail = 'an@email.com';
    await userService.getUserByEmail(userEmail);
    expect(mockUserDB.findOne).toHaveBeenCalledWith({ where: { email: userEmail } });
  });


  it('should remove project if project exists', async () => {
    mockUserDB.findOne.mockResolvedValue({ name: 'A name' });
    const userId = '1';
    await userService.removeUser(userId);
    expect(mockUserDB.findOne).toHaveBeenCalledWith({ where: { id: Number(userId) } });
    expect(mockUserDB.destroy).toHaveBeenCalledWith({ where: { id: Number(userId) } });
  });

  it('should return null if project does not exist when removing it', async () => {
    mockUserDB.findOne.mockResolvedValue();
    const userId = '1';
    const r = await userService.removeUser(userId);
    expect(mockUserDB.findOne).toHaveBeenCalledWith({ where: { id: Number(userId) } });
    expect(mockUserDB.destroy).not.toHaveBeenCalled();
    expect(r).toEqual(null);
  });
});
