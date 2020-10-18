'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbpegawais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      nip: {
        type: Sequelize.STRING
      },
      tmp_lhr: {
        type: Sequelize.STRING
      },
      tgl_lhr: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      penginputPeg: {
        type: Sequelize.STRING
      },
      penyuntingPeg: {
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
    await queryInterface.dropTable('tbpegawais');
  }
};