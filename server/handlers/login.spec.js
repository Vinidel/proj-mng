const Security = require('../core/security');
const User = require('../core/user');
const login = require('./login');

const BAD_REQUEST_HTTP_RESPONSE = 400;
const INTERNAL_SERVER_ERROR = 500;
const CREATED_HTTP_RESPONSE = 201;
const UNAUTHORIZED_HTTP_CODE = 401;

jest.mock('../core/security');
jest.mock('../core/user');
describe('Login handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCurrentUser;
  let mockSec;

  beforeEach(() => {
    mockRequest = {
      body: {
        email: 'test@g.com',
        password: 'securepassworld',
      },
    };

    mockCurrentUser = {
      name: 'A name',
      email: 'test@g.com',
      password: 'securepassworld',
    };

    mockSec = {
      verifyUserByEmail: jest.fn().mockResolvedValue(mockCurrentUser),
      generateJwt: jest.fn().mockReturnValue('token'),
      compare: jest.fn().mockResolvedValue(true),
    };

    mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    Security.makeSecurity = jest.fn().mockReturnValue(mockSec);
    User.MakeUser = jest.fn().mockReturnValue(mockCurrentUser);
  });

  it('should 400 if payload is not valid', async () => {
    delete mockRequest.body.email;
    const res = mockResponse();
    await login(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should verify user by email', async () => {
    const res = mockResponse();
    await login(mockRequest, res);
    expect(mockSec.verifyUserByEmail).toHaveBeenCalledWith(mockRequest.body.email);
  });

  it('should return unauthorized if user not found', async () => {
    mockSec.verifyUserByEmail = jest.fn().mockResolvedValue();
    const res = mockResponse();
    await login(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(UNAUTHORIZED_HTTP_CODE);
  });

  it('should compare password', async () => {
    const res = mockResponse();
    await login(mockRequest, res);
    expect(mockSec.compare).toHaveBeenCalled();
  });

  it('should generate JWT', async () => {
    const res = mockResponse();
    await login(mockRequest, res);
    expect(mockSec.generateJwt).toHaveBeenCalledWith(mockCurrentUser);
  });

  it('should return JWT and 201', async () => {
    const res = mockResponse();
    await login(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(CREATED_HTTP_RESPONSE);
    expect(res.json).toHaveBeenCalledWith({ token: 'token' });
  });
});
