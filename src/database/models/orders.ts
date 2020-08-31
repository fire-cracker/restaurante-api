import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/database'

export interface OrderAttributes {
  reservationId: number
  menuId: number
  quantity: number
  createdAt?: Date
  updatedAt?: Date
}

export interface OrderInstance extends Sequelize.Instance<OrderAttributes>, OrderAttributes {}

export const OrderModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<OrderInstance, OrderAttributes> => {
  const attributes: SequelizeAttributes<OrderAttributes> = {
    reservationId: {
      allowNull: false,
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

  const Order = sequelize.define<OrderInstance, OrderAttributes>('order', attributes)

  Order.associate = models => {
    // Order.hasMany(models.Comment, { foreignKey: 'AuthorId', as: 'comments' })
    // Order.hasMany(models.Post, { foreignKey: 'AuthorId', as: 'posts' })
    // Order.belongsToMany(models.Comment, {
    //   through: 'PostUpvotes',
    //   as: 'upvotedComments'
    // })
  }

  return Order
}
