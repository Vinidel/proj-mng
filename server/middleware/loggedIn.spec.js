const jwt = require('jsonwebtoken');
const loggedIn = require('./loggedIn');

jest.mock('jsonwebtoken');
describe('Logged in middleware', () => {
  let mockedRequest;
  let mockedResponse;
  let mockedNext;

  beforeEach(() => {
    mockedResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      return res;
    };

    mockedRequest = {
      headers: {
        authorization: 'a token',
      },
    };

    mockedNext = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('should next if token is valid', () => {
    jwt.verify.mockReturnValue('hey');
    const res = mockedResponse();
    loggedIn(mockedRequest, res, mockedNext);
    expect(mockedNext).toHaveBeenCalled();
  });

  it('should add localUser to request if token valid', () => {
    const decoded = { name: 'A name', role: 'a role' };
    jwt.verify.mockReturnValue(decoded);
    const res = mockedResponse();
    loggedIn(mockedRequest, res, mockedNext);
    expect(mockedRequest.localUser).toEqual(decoded);
  });

  it('should return 401 if token is not present', () => {
    delete mockedRequest.headers.authorization;
    const res = mockedResponse();
    loggedIn(mockedRequest, res, mockedNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 401 if token is invalid', () => {
    const res = mockedResponse();
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });
    loggedIn(mockedRequest, res, mockedNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});
