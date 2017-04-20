'use strict';
module.exports = function(sequelize, DataTypes) {
  var Diagnosa = sequelize.define('Diagnosa', {
    gejala: DataTypes.TEXT,
    penyakit_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Diagnosa.belongsTo(models.Penyakit,{foreignKey: 'penyakit_id'})
      }
    }
  });
  return Diagnosa;
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
