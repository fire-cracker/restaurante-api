import db from '../../database/models'
import { UserInstance } from '../../database/models/users'

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
 * @param {String} username - customer name
 * @param {String} email - customer email
 * @param {String} password - customer password
 * @returns {Object} object
 */
export const createUser = (
  username: string,
  email: string,
  password: string,
  role?: 'customer'
): Promise<UserInstance> => db.User.create({ username, email, password, role })

/**
 * @export
 * @function fetchUser
 * @param {Object} data - data object
 * @returns {Object} object
 */
export const fetchUser = (data: { email?: string; id?: string }): Promise<UserInstance> =>
  db.User.findOne({ where: { ...data } })
