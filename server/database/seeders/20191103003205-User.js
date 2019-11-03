'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Vinny Admin',
        email: 'vini@admin.com',
        role: 'ADMIN',
        password: 'fakepassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vinny PM',
        email: 'vini@pm.com',
        role: 'PROJECT_MANAGER',
        password: 'fakepassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
