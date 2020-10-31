'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Gyanesh Gupta',
          phoneNumber: '7056420753',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Jon Doe',
          phoneNumber: '9876543210',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
