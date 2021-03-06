const postProject = require('./postProject');
const User = require('../core/user');

const BAD_REQUEST_HTTP_RESPONSE = 400;
const INTERNAL_SERVER_ERROR = 500;
const CREATED_HTTP_RESPONSE = 201;

jest.mock('../core/user');

describe('Post project handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCurrentUser;

  beforeEach(() => {
    mockRequest = {
      localUser: {
        name: 'Adminn Name',
        role: 'ADMIN',
      },
      body: {
        name: 'A name',
        description: 'A description',
        UserId: 1,
      },
    };

    mockCurrentUser = {
      name: 'A name',
      email: 'test@g.com',
      password: 'securepassworld',
      save: jest.fn().mockResolvedValue({ ...mockRequest.body }),
      createProject: jest.fn().mockResolvedValue({ ...mockRequest.body }),
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
    await postProject(mockRequest, res);
    expect(User.MakeUser).toHaveBeenCalledWith(mockRequest.localUser);
  });

  it('should return 201 if Project is created successfully', async () => {
    const res = mockResponse();
    await postProject(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(CREATED_HTTP_RESPONSE);
  });

  it('should call res.json with new project if project is created successfully', async () => {
    const res = mockResponse();
    await postProject(mockRequest, res);
    expect(res.json).toHaveBeenCalledWith(mockRequest.body);
  });

  it('should return a 400 http response if validation returns error', async () => {
    delete mockRequest.body.name;
    const res = mockResponse();
    await postProject(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST_HTTP_RESPONSE);
  });

  it('should return a 500 http response if error is unknown', async () => {
    mockCurrentUser.createProject = jest.fn().mockRejectedValue({ message: 'Weird error' });
    const res = mockResponse();
    await postProject(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
