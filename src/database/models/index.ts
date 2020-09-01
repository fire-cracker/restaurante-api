import Sequelize from 'sequelize'

import { DbInterface } from '../../types/database'
import { UserModel } from './users'
import { MenuModel } from './menus'
import { ReservationModel } from './reservations'
import { OrderModel } from './orders'

const env = process.env.NODE_ENV || 'development'
const config = require('../config')[env]

const url = config.url || process.env.DATABSE_URL
const sequelize = new Sequelize(url, { ...config })

const db: DbInterface = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, Sequelize),
  Menu: MenuModel(sequelize, Sequelize),
  Reservation: ReservationModel(sequelize, Sequelize),
  Order: OrderModel(sequelize, Sequelize)
}

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db)
  }
})

export default db
