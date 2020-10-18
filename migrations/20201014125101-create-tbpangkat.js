'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbpangkats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idnip: {
        type: Sequelize.INTEGER
      },
      idgolpang: {
        type: Sequelize.INTEGER
      },
      tmt: {
        type: Sequelize.DATE
      },
      glr_dpn: {
        type: Sequelize.STRING
      },
      glr_blkng: {
        type: Sequelize.STRING
      },
      mkptahun: {
        type: Sequelize.INTEGER
      },
      mkpbulan: {
        type: Sequelize.INTEGER
      },
      nomorsk: {
        type: Sequelize.STRING
      },
      tglsk: {
        type: Sequelize.DATE
      },
      oleh: {
        type: Sequelize.STRING
      },
      prodi: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbpangkats');
  }
};