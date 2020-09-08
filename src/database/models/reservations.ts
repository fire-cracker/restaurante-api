import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/database'

export interface ReservationAttributes {
  id?: number
  userId: string
  date: Date
  time: string
  type: string
  price: number
  persons: number
  stripeId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ReservationInstance
  extends Sequelize.Instance<ReservationAttributes>,
    ReservationAttributes {}

export const ReservationModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<ReservationInstance, ReservationAttributes> => {
  const attributes: SequelizeAttributes<ReservationAttributes> = {
    userId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    time: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    stripeId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    persons: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }

  const Reservation = sequelize.define<ReservationInstance, ReservationAttributes>(
    'reservation',
    attributes,
    {
      defaultScope: {
        attributes: { exclude: ['updatedAt'] }
      }
    }
  )

  Reservation.associate = models => {
    Reservation.belongsTo(models.User, { foreignKey: 'userId', as: 'reservee' })
  }

  return Reservation
}
