'use strict'

module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('orders', {
      reservationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'reservations',
          key: 'id'
        }
      },
      menuId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'menus',
          key: 'id'
        }
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
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
  down: queryInterface => queryInterface.dropTable('orders')
}
