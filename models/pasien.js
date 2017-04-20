'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pasien = sequelize.define('Pasien', {
    name: DataTypes.STRING,
    email: DataTypes.TEXT,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    diagnosa: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return Pasien;
};
