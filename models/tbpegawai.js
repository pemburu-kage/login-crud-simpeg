'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbpegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tbpegawai.belongsTo(models.tbuser, {
        foreignKey: "penginputPeg",
        as: "userData",
        sourceKey: "id"
      });
      tbpegawai.hasMany(models.tbpangkat, {
        foreignKey: "id",
        as: "pegawaiData",
        sourceKey: "id"
      })
    }
  };
  tbpegawai.init({
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    tmp_lhr: DataTypes.STRING,
    tgl_lhr: DataTypes.DATE,
    status: DataTypes.STRING,
    penginputPeg: DataTypes.STRING,
    penyuntingPeg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbpegawai',
  });
  return tbpegawai;
};