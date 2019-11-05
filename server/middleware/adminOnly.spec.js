const adminOnly = require('./adminOnly');

describe('Admin only middleware', () => {
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
      localUser: {
        role: 'ADMIN',
      },
    };

    mockedNext = jest.fn();
  });

  afterEach(() => {});


  it('should next if role is admin', () => {
    const res = mockedResponse();
    adminOnly(mockedRequest, res, mockedNext);
    expect(mockedNext).toHaveBeenCalled();
  });

  it('should return 401 if role is not admin', () => {
    const res = mockedResponse();
    mockedRequest.localUser.role = 'PROJECT_MANAGER';
    adminOnly(mockedRequest, res, mockedNext);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});
