import * as Sequelize from 'sequelize'

import db from '../models'
import { SequelizeAttributes } from '../../types/database'
import { OrderInstance, OrderAttributes } from './orders'

export interface ReservationAttributes {
  id?: number
  userId: number
  date: Date
  price: number
  persons: number
  createdAt?: Date
  updatedAt?: Date
  orders?: OrderAttributes[] | OrderAttributes['reservationId'][]
}

export interface ReservationInstance extends Sequelize.Instance<ReservationAttributes>, ReservationAttributes {
  getOrders: Sequelize.HasManyGetAssociationsMixin<OrderInstance>
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
      type: DataTypes.DATEONLY
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

  const Reservation = sequelize.define<ReservationInstance, ReservationAttributes>('reservation', attributes, {
    defaultScope: {
      attributes: { exclude: ['updatedAt'] }
    }
  })

  Reservation.associate = models => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'reservee' })
    Reservation.hasMany(models.Order, {
      foreignKey: 'reservationId',
      as: 'orders'
    })
  }

  return Reservation
}
