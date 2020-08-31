import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize'
import * as Sequelize from 'sequelize'

import { UserAttributes, UserInstance } from '../database/models/users'
import { MenuAttributes, MenuInstance } from '../database/models/menus'
import { ReservationAttributes, ReservationInstance } from '../database/models/reservations'
import { OrderAttributes, OrderInstance } from '../database/models/orders'

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
}

export interface DbInterface {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  User: Sequelize.Model<UserInstance, UserAttributes>
  Menu: Sequelize.Model<MenuInstance, MenuAttributes>
  Reservation: Sequelize.Model<ReservationInstance, ReservationAttributes>
  Order: Sequelize.Model<OrderInstance, OrderAttributes>
}
