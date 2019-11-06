const sec = require('../../core/security');

const s = sec.makeSecurity();
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Vinny Admin',
        email: 'vini@admin.com',
        role: 'ADMIN',
        password: s.encrypt('fakepassword'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vinny PM',
        email: 'vini@pm.com',
        role: 'PROJECT_MANAGER',
        password: s.encrypt('fakepassword'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
