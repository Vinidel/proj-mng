const getProjects = require('./getProjects');
const User = require('../core/user');

const INTERNAL_SERVER_ERROR = 500;
const SUCCESS_HTTP_RESPONSE = 200;

jest.mock('../core/user');
describe('Get projects handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCurrentUser;
  let mockedProjects;

  beforeEach(() => {
    mockRequest = {
      localUser: {
        name: 'Adminn Name',
        role: 'ADMIN',
      },
    };
    mockedProjects = [{
      name: 'Project one',
      id: 1,
    },
    {
      name: 'Project two',
      id: 2,
    }];
    mockCurrentUser = {
      name: 'A name',
      email: 'test@g.com',
      getProjects: jest.fn().mockResolvedValue(mockedProjects),
    };

    mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    User.MakeUser = jest.fn().mockReturnValue(mockCurrentUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('should instantiate user with body params', async () => {
    const res = mockResponse();
    await getProjects(mockRequest, res);
    expect(User.MakeUser).toHaveBeenCalledWith(mockRequest.localUser);
  });

  it('should return 200 if success', async () => {
    const res = mockResponse();
    await getProjects(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(SUCCESS_HTTP_RESPONSE);
  });

  it('should return projects if success', async () => {
    const res = mockResponse();
    await getProjects(mockRequest, res);
    expect(res.json).toHaveBeenCalledWith(mockedProjects);
  });

  it('should return 500 if there is an error', async () => {
    mockCurrentUser.getProjects = jest.fn().mockRejectedValue({ error: 'Weird' });
    const res = mockResponse();
    await getProjects(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
