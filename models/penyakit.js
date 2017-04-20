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
        // User.hasMany(models.Todo, {foreignkey: 'UserId'})
        Penyakit.hasMany(models.Diagnosa,{foreignKey: 'penyakit_id'})
      }
    }
  });
  return Penyakit;
};
// var User = this.sequelize.define('user', {/* attributes */})
//   , Company  = this.sequelize.define('company', {/* attributes */});
//
// User.belongsTo(Company); // Will add companyId to user
//
// var User = this.sequelize.define('user', {/* attributes */}, {underscored: true})
//   , Company  = this.sequelize.define('company', {
//     uuid: {
//       type: Sequelize.UUID,
//       primaryKey: true
//     }
//   });
//
// User.belongsTo(Company); // Will add company_uuid to user
