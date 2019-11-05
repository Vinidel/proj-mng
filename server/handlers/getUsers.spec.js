const getUsers = require('./getUsers');
const User = require('../core/user');

const BAD_REQUEST_HTTP_RESPONSE = 400;
const INTERNAL_SERVER_ERROR = 500;
const SUCCESS_HTTP_RESPONSE = 200;

jest.mock('../core/user');
describe('Get users handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCurrentUser;
  let mockedUsers;

  beforeEach(() => {
    mockRequest = {
      localUser: {
        name: 'Adminn Name',
        role: 'ADMIN',
      },
    };
    mockedUsers = [{
      name: 'User one',
      id: 1,
    },
    {
      name: 'User two',
      id: 2,
    }];
    mockCurrentUser = {
      name: 'A name',
      email: 'test@g.com',
      getUsers: jest.fn().mockResolvedValue(mockedUsers),
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
    await getUsers(mockRequest, res);
    expect(User.MakeUser).toHaveBeenCalledWith(mockRequest.localUser);
  });

  it('should return 200 if success', async () => {
    const res = mockResponse();
    await getUsers(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(SUCCESS_HTTP_RESPONSE);
  });

  it('should return users if success', async () => {
    const res = mockResponse();
    await getUsers(mockRequest, res);
    expect(res.json).toHaveBeenCalledWith(mockedUsers);
  });

  it('should return 500 if there is an error', async () => {
    mockCurrentUser.getUsers = jest.fn().mockRejectedValue({ error: 'Weird' });
    const res = mockResponse();
    await getUsers(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
