'use strict'

module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      recipe: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('breakfast', 'lunch', 'dinner', 'drink')
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
  down: queryInterface => queryInterface.dropTable('menus')
}
