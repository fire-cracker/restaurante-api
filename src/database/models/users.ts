import * as Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import { SequelizeAttributes } from '../../types/database'

export interface UserAttributes {
  id?: number
  username: string
  email: string
  password: string
  role?: 'customer' | 'admin'
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
  prototype: {
    validatePassword: (password: string) => boolean
    password: string
  }
}

interface UserModelInstanceMethods extends Sequelize.Model<UserInstance, UserAttributes> {
  prototype: {
    validatePassword: (password: string) => boolean
    password: string
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

  const User = sequelize.define<UserInstance, UserAttributes>('user', attributes, {
    defaultScope: {
      attributes: { exclude: ['password'] }
    }
  }) as UserModelInstanceMethods

  User.beforeCreate(async user => {
    const salt = await bcrypt.genSaltSync()
    user.password = await bcrypt.hashSync(user.password, salt)
  })

  User.associate = models => {
    // User.hasMany(models.Comment, { foreignKey: 'AuthorId', as: 'comments' })
    // User.hasMany(models.Post, { foreignKey: 'AuthorId', as: 'posts' })
    // User.belongsToMany(models.Comment, {
    //   through: 'PostUpvotes',
    //   as: 'upvotedComments'
    // })
  }

  User.prototype.validatePassword = function (newPassword) {
    console.log('helloooooooo')
    return bcrypt.compareSync(newPassword, this.password)
  }

  return User
}
