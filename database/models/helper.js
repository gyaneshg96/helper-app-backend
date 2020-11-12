'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const Helper = sequelize.define(
    'Helper',
    {
        id:{
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID
        },
        name: 
        {
          allowNull: false,
          type: DataTypes.STRING,
          validate: {
            notEmpty: true
          }
        },
        phoneNumber: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
          validate: {
            not: ['[a-z]', 'i'],
            notEmpty: true
            }
        },
        image:{
          type: DataTypes.STRING,
          unique: true,
        },
        gender:{
          type: DataTypes.INTEGER,
        },
        city:{
          type: DataTypes.STRING
        },
        roles:{
          type: DataTypes.STRING
        },
        locations: {
          type: DataTypes.STRING,
        }
    },
    {}
  );
  
  Helper.beforeCreate((helper) => helper.id = uuidv4());


  Helper.associate = function(models) {
    // associations can be defined here
    Helper.belongsToMany(models.User, {
      foreignKey: 'helperId',
      through: 'Users_Helpers',
      as: 'users'
    });
  };
  return Helper;
};
