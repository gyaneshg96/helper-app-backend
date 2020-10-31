'use strict';

const data = require('../../helpers1.json');
console.log(data.length);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Helpers', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Helpers', null, {});
  }
};
