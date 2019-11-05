const patchProject = require('./patchProject');
const User = require('../core/user');

const BAD_REQUEST_HTTP_RESPONSE = 400;
const INTERNAL_SERVER_ERROR = 500;
const SUCCESS_HTTP_RESPONSE = 200;

jest.mock('../core/user');

describe('Patch project handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCurrentUser;

  beforeEach(() => {
    mockRequest = {
      params: {
        projectId: '1',
      },
      localUser: {
        name: 'Adminn Name',
        role: 'ADMIN',
      },
      body: {
        name: 'test@g.com',
        description: 'securepassworld',
        UserId: 1,
      },
    };

    mockCurrentUser = {
      name: 'A name',
      email: 'test@g.com',
      updateProject: jest.fn().mockResolvedValue({ ...mockRequest.body }),
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
    await patchProject(mockRequest, res);
    expect(User.MakeUser).toHaveBeenCalledWith(mockRequest.localUser);
  });

  it('should return 200 if User is updated successfully', async () => {
    const res = mockResponse();
    await patchProject(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(SUCCESS_HTTP_RESPONSE);
  });

  it('should call res.json with new user if user is updated successfully', async () => {
    const res = mockResponse();
    await patchProject(mockRequest, res);
    expect(res.json).toHaveBeenCalledWith(mockRequest.body);
  });

  it('should return a 400 http response if validation returns error', async () => {
    delete mockRequest.body.description;
    delete mockRequest.body.name;
    delete mockRequest.body.UserId;
    const res = mockResponse();
    await patchProject(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST_HTTP_RESPONSE);
  });

  it('should return a 500 http response if error is unknown', async () => {
    mockCurrentUser.updateProject = jest.fn().mockRejectedValue({ message: 'Weird error' });
    const res = mockResponse();
    await patchProject(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
