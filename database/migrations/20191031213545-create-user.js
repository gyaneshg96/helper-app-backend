'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          not: ['[a-z]', 'i'],
          notEmpty: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};