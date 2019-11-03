
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Projects',
    [
      {
        userId: 2,
        name: 'A great new project',
        description:
          'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'A not so great project',
        description:
          'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],

    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Projects', null, {}),
};
