'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbpangkat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tbpangkat.init({
    idnip: DataTypes.INTEGER,
    idgolpang: DataTypes.INTEGER,
    tmt: DataTypes.DATE,
    glr_dpn: DataTypes.STRING,
    glr_blkng: DataTypes.STRING,
    mkptahun: DataTypes.INTEGER,
    mkpbulan: DataTypes.INTEGER,
    nomorsk: DataTypes.STRING,
    tglsk: DataTypes.DATE,
    oleh: DataTypes.STRING,
    prodi: DataTypes.STRING,
    tahun: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tbpangkat',
  });
  return tbpangkat;
};