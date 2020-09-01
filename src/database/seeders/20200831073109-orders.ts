'use strict'

module.exports = {
  //@ts-ignore
  up: async queryInterface =>
    await queryInterface.bulkInsert(
      'orders',
      [
        {
          reservationId: 1,
          menuId: 1,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          reservationId: 2,
          menuId: 1,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          reservationId: 3,
          menuId: 1,
          quantity: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          reservationId: 1,
          menuId: 2,
          quantity: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          reservationId: 2,
          menuId: 2,
          quantity: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          reservationId: 3,
          menuId: 2,
          quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          reservationId: 4,
          menuId: 3,
          quantity: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  //@ts-ignore
  down: async queryInterface => await queryInterface.bulkDelete('orders', null, {})
}
