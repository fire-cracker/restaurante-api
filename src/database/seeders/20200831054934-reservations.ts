'use strict'

module.exports = {
  //@ts-ignore
  up: async queryInterface => {
    const users = await queryInterface.sequelize.query('SELECT id from users;')
    return await queryInterface.bulkInsert(
      'reservations',
      [
        {
          userId: users[0][0].id,
          date: new Date(),
          price: 600,
          persons: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0][1].id,
          date: new Date(),
          price: 500,
          persons: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0][2].id,
          date: new Date(),
          price: 700,
          persons: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0][3].id,
          date: new Date(),
          price: 400,
          persons: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },
  //@ts-ignore
  down: async queryInterface => await queryInterface.bulkDelete('reservations', null, {})
}
