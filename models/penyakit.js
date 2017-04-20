'use strict';
module.exports = function(sequelize, DataTypes) {
  var Penyakit = sequelize.define('Penyakit', {
    name: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    solusi: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Penyakit.hasMany(models.Diagnosa, {foreignKey: 'penyakit_id'})
      }
    }
  });
  return Penyakit;
};
