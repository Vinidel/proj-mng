const User = require('./user');

describe('User', () => {
  beforeEach(() => {});

  it('should instantiate the correct user type as ADMIN', () => {
    const user = User.MakeUser({ role: 'ADMIN' });
    expect(user.role).toEqual('ADMIN');
  });

  it('should instantiate Project Manager if no role is provided', () => {
    const user = User.MakeUser({});
    expect(user.role).toEqual('PROJECT_MANAGER');
  });
});
