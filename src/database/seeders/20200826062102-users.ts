'use strict'
const bcrypt = require('bcrypt')

module.exports = {
  //@ts-ignore
  up: async queryInterface =>
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'johndoe',
          email: 'johndoe@example.com',
          password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'johnjames',
          email: 'johnjames@example.com',
          password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'janethjack',
          email: 'janethjack@example.com',
          password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'janedoe',
          email: 'janedoe@example.com',
          password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),
  //@ts-ignore
  down: async queryInterface => await queryInterface.bulkDelete('users', null, {})
}
