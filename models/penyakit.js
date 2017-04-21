'use strict';
module.exports = function(sequelize, DataTypes) {
  var Penyakit = sequelize.define('Penyakit', {
    // uuid: {
    //       type: Sequelize.UUID,
    //       primaryKey: true
    // },
    name: {
      type: DataTypes.STRING,
      validation:{
        notNull: true,
        notEmpty: true
      }
    },
    deskripsi: DataTypes.TEXT,
    solusi: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Penyakit.hasMany(models.Diagnosa,{foreignKey: 'penyakit_id'})
      }
    }
  });
  return Penyakit;
};
