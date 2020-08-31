import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/database'
import { OrderInstance, OrderAttributes } from './orders'
import { MenuInstance, MenuAttributes } from './menus'

export interface ReservationAttributes {
  id?: number
  userId: number
  date: Date
  price: number
  persons: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ReservationInstance extends Sequelize.Instance<ReservationAttributes>, ReservationAttributes {
  createReservationMenu: Sequelize.BelongsToManyCreateAssociationMixin<MenuAttributes, MenuInstance['id'], 'orders'>
  addReservationMenus: Sequelize.BelongsToManyAddAssociationsMixin<MenuAttributes, MenuInstance['id'], 'orders'>
  addReservationMenu: Sequelize.BelongsToManyAddAssociationMixin<MenuAttributes, MenuInstance['id'], 'orders'>
  setReservationMenus: Sequelize.BelongsToManySetAssociationsMixin<MenuAttributes, MenuInstance['id'], 'orders'>
}

export const ReservationModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ReservationInstance, ReservationAttributes> => {
  const attributes: SequelizeAttributes<ReservationAttributes> = {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    persons: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }

  const Reservation = sequelize.define<ReservationInstance, ReservationAttributes>('reservation', attributes)

  Reservation.associate = models => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'reservee' })
    Reservation.belongsToMany(models.Menu, {
      foreignKey: 'reservationId',
      otherKey: 'menuId',
      through: 'orders',
      timestamps: false,
      as: 'reservationMenus'
    })
  }

  return Reservation
}
