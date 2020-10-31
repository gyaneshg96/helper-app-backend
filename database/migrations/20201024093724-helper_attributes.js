'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Helpers','roles',Sequelize.STRING);
    queryInterface.addColumn('Helpers','locations',Sequelize.STRING);
    queryInterface.addColumn('Helpers','city',Sequelize.STRING);
    queryInterface.addColumn('Helpers','phoneNumber',Sequelize.STRING); 
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Helpers','roles');
    queryInterface.removeColumn('Helpers','locations'); 
    queryInterface.removeColumn('Helpers','city');
    queryInterface.removeColumn('Helpers','phoneNumber');
  }
};
