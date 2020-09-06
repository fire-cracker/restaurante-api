'use strict'

module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('reservations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      persons: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stripeId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    }),
  //@ts-ignore
  down: queryInterface => queryInterface.dropTable('reservations')
}
