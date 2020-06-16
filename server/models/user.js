'use strict';
const { encrypt } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}

  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fullname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    organization: {
      type: DataTypes.STRING,
      defaultValue: 'Hacktiv8'
    }
  }, {
    hooks: {
      beforeCreate: user => {
        user.password = encrypt(user.password)
      }
    },
    sequelize
  })
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};