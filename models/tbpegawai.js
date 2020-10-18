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