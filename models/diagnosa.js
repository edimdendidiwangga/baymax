'use strict';
module.exports = function(sequelize, DataTypes) {
  var Diagnosa = sequelize.define('Diagnosa', {
    gejala: DataTypes.TEXT,
    penyakit_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Diagnosa.belongsTo(models.Penyakit, {foreignKey: 'penyakit_id'})
      }
    }
  });
  return Diagnosa;
};
