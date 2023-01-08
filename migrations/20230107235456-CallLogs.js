'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('CallLogs', {
      // table definition
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      callSid: {
        type: Sequelize.STRING,
      },
      CallStatus: {
        type: Sequelize.STRING,
      },
      Caller: {
        type: Sequelize.STRING,
      },

      CallerCountry: {
        type: Sequelize.STRING,
      },
      Direction: {
        type: Sequelize.STRING,
      },
      RecordingDuration: {
        type: Sequelize.STRING,
      },
      RecordingSid: {
        type: Sequelize.STRING,
      },
      RecordingUrl: {
        type: Sequelize.STRING,
      },
      Called: {
        type: Sequelize.STRING,
      },
      ToCountry: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('CallLogs')
  },
}
