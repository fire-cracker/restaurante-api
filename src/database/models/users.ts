import * as Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import { SequelizeAttributes } from '../../types/database'

export interface UserAttributes {
  id?: string
  username: string
  email: string
  password?: string
  role?: 'customer' | 'admin'
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  validatePassword: (password: string) => boolean
}

interface UserModelInstanceMethods extends Sequelize.Model<UserInstance, UserAttributes> {
  prototype: {
    validatePassword: (password: string) => Promise<boolean>
  }
}

export const UserModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<UserInstance, UserAttributes> & UserModelInstanceMethods => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('customer', 'admin'),
      defaultValue: 'customer'
    }
  }

  const User = sequelize.define<UserInstance, UserAttributes>(
    'user',
    attributes
  ) as UserModelInstanceMethods

  User.beforeCreate(async user => {
    const salt = await bcrypt.genSaltSync()
    user.password = await bcrypt.hashSync(user.password, salt)
  })

  User.associate = models => {
    User.hasMany(models.Reservation, { foreignKey: 'userId', as: 'userReservations' })
  }

  User.prototype.validatePassword = async function (this: UserInstance, newPassword) {
    return bcrypt.compareSync(newPassword, this.password!)
  }

  return User
}
