const morgan = require('morgan');
const postUser = require('./postUser');
const User = require('../models/user');
const { EMAIL_EXISTS } = require('../utils/errors');

const BAD_REQUEST_HTTP_RESPONSE = 400;
const INTERNAL_SERVER_ERROR = 500;
const CREATED_HTTP_RESPONSE = 201;

jest.mock('../models/user');
jest.mock('morgan');

describe('Post user handler', () => {
  let mockRequest;
  let mockResponse;
  let mockCreatedUser;

  beforeEach(() => {
    mockCreatedUser = {
      name: 'A name',
      email: 'test@g.com',
      password: 'securepassworld',
    };

    mockRequest = {
      body: {
        name: 'A name',
        email: 'test@g.com',
        password: 'securepassworld',
        role: 'ADMIN',
      },
    };

    mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    User.save = jest.fn().mockResolvedValue(mockCreatedUser);
    User.json = jest.fn();
  });

  it('should return 201 if User is created successfully', async () => {
    const res = mockResponse();
    await postUser(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(CREATED_HTTP_RESPONSE);
  });

  it('should call res.json with new user if user is created successfully', async () => {
    const res = mockResponse();
    await postUser(mockRequest, res);
    expect(res.json).toHaveBeenCalledWith(mockCreatedUser);
  });


  it('should return a 400 http response if error is known', async () => {
    User.save = jest.fn().mockRejectedValue({ code: EMAIL_EXISTS });
    const res = mockResponse();
    await postUser(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST_HTTP_RESPONSE);
  });

  it('should return a 400 http response if validation returns error', async () => {
    delete mockRequest.body.name;
    const res = mockResponse();
    await postUser(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(BAD_REQUEST_HTTP_RESPONSE);
  });

  it('should return a 500 http response if error is unknown', async () => {
    User.save = jest.fn().mockRejectedValue({ message: 'Weird error' });
    const res = mockResponse();
    await postUser(mockRequest, res);
    expect(res.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
  });
});
