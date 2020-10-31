'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
       UserProfile.belongsTo(models.User);
    }
  };
  UserProfile.init({
    name: DataTypes.STRING,
    userId: DataTypes.UUID,
    city: DataTypes.STRING,
    location: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};