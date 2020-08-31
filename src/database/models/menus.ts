import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/database'

export interface MenuAttributes {
  id?: number
  name: string
  image: string
  price: string
  recipe: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'drink'
  createdAt?: Date
  updatedAt?: Date
}

export interface MenuInstance extends Sequelize.Instance<MenuAttributes>, MenuAttributes {}

export const MenuModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<MenuInstance, MenuAttributes> => {
  const attributes: SequelizeAttributes<MenuAttributes> = {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    recipe: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'drink')
    }
  }

  const Menu = sequelize.define<MenuInstance, MenuAttributes>('menu', attributes)

  Menu.associate = models => {
    Menu.belongsToMany(models.Order, {
      foreignKey: 'menuId',
      otherKey: 'reservationId',
      through: 'orders',
      timestamps: false,
      as: 'reservations',
      onDelete: 'CASCADE'
    })
  }

  return Menu
}
