import Sequelize from 'sequelize'
import { Errors } from 'typescript-rest'

import db from '../../database/models'
import { UserInstance } from '../../database/models/users'
import { UserInterface } from '../../types/user'

const { Op } = Sequelize

/**
 * @export
 * @function getUsers
 * @returns {Object} object
 */
export const getUsers = async (): Promise<UserInstance[]> => {
  const users = (await db.User.findAll()) as UserInstance[]
  return users
}

/**
 * @export
 * @function createUser
 * @param {object} res - response object
 * @param {String} username - customer name
 * @param {String} email - customer email
 * @param {String} password - customer password
 * @returns {Object} object
 */
export const createUser = (username: string, email: string, password: string): Promise<UserInstance> =>
  db.User.create({ username, email, password })

/**
 * @export
 * @function getUser
 * @param {String} email - customer email
 * @returns {Object} object
 */
export const getUser = (email: string) => db.User.findOne({ where: { email: { [Op.eq]: email } } })
