'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
    },
    {}
  );
  User.beforeCreate((user, _ ) => {
    return user.id = uuidv4();
  });

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.User, {
      foreignKey: 'userId',
      through: 'Users_Helpers',
      as: 'helpers'
    });
    User.hasOne(models.UserProfile, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  };
  return User;
};
