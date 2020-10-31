'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Roles',
    [
      {
        description:'housekeep',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description:'cook',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Roles', null, {});
  }
};
