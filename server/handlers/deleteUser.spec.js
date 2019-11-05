const deleteUser = require('./deleteUser');
const User = require('../core/user');

const INTERNAL_SERVER_ERROR = 500;
const SUCCESS_HTTP_RESPONSE = 200;

jest.mock('../core/user');
describe('Delete user handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCurrentUser;

  beforeEach(() => {
    mockRequest = {
      localUser: {
        name: 'Adminn Name',
        role: 'ADMIN',
      },
      params: {
        userId: 1,
      },
    };

    mockCurrentUser = {
      name: 'A name',
      email: 'test@g.com',
      deleteUser: jest.fn().mockResolvedValue(),
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
    await deleteUser(mockRequest, res);
    expect(User.MakeUser).toHaveBeenCalledWith(mockRequest.localUser);
  });

  it('should return 200 if success', async () => {
    const res = mockResponse();
    await deleteUser(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(SUCCESS_HTTP_RESPONSE);
  });

  it('should call empty res.json if success', async () => {
    const res = mockResponse();
    await deleteUser(mockRequest, res);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('should return 500 if there is an error', async () => {
    mockCurrentUser.deleteUser = jest.fn().mockRejectedValue({ error: 'Weird' });
    const res = mockResponse();
    await deleteUser(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
