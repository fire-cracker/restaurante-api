import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/database'
import { ReservationInstance } from './reservations'
import { MenuInstance } from './menus'

export interface OrderAttributes {
  reservationId: number
  menuId: number
  quantity: number
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderInstance extends Sequelize.Instance<OrderAttributes>, OrderAttributes {
  getReservee: Sequelize.BelongsToGetAssociationMixin<ReservationInstance>
  getMenu: Sequelize.BelongsToGetAssociationMixin<MenuInstance>
}

export const OrderModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<OrderInstance, OrderAttributes> => {
  const attributes: SequelizeAttributes<OrderAttributes> = {
    reservationId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    menuId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }

  const Order = sequelize.define<OrderInstance, OrderAttributes>('order', attributes, {
    defaultScope: {
      attributes: { exclude: ['updatedAt'] }
    }
  })

  Order.associate = models => {
    Order.belongsTo(models.Reservation, { foreignKey: 'reservationId', as: 'orderReserveee' })
    Order.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      as: 'menus'
    })
  }

  return Order
}
