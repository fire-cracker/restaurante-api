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
          time: '17:00',
          stripeId: 'ch_1HOA0xIqdNTqIhB45UQrrIaZ',
          price: 600,
          persons: 3,
          type: 'dinner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0][1].id,
          date: new Date(),
          time: '17:00',
          stripeId: 'ch_1HOA0xIqdNTqIhB45UQrrIaZ',
          price: 500,
          persons: 3,
          type: 'lunch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0][2].id,
          date: new Date(),
          time: '17:00',
          stripeId: 'ch_1HOA0xIqdNTqIhB45UQrrIaZ',
          price: 700,
          persons: 3,
          type: 'breakfast',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: users[0][3].id,
          date: new Date(),
          time: '17:00',
          stripeId: 'ch_1HOA0xIqdNTqIhB45UQrrIaZ',
          price: 400,
          persons: 2,
          type: 'drinks',
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
