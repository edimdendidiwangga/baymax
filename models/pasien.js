'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pasien = sequelize.define('Pasien', {
    name: DataTypes.STRING,
    email: DataTypes.TEXT,
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    salt: DataTypes.TEXT,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return Pasien;
};
