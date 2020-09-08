import { Response, Request } from 'express'

import { createUser, fetchUser } from '../services/users.service'
import { UserInstance } from '../../database/models/users'
import { signToken } from '../../helpers/utils'

/**
 * @export
 * @function userSignup
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const userSignup = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      body: { username, email, password }
    } = req

    const userExist = (await fetchUser({ email })) as UserInstance

    if (userExist) {
      return res.status(409).send({
        status: 'fail',
        data: { message: 'User with this email already exist.' }
      })
    }

    const user = (await createUser(username, email, password)) as UserInstance
    const userToken: string = signToken({
      id: user.id!,
      username: user.username,
      role: user.role!
    })

    const newUser = user.toJSON()
    delete newUser.password

    return res.status(200).send({
      status: 'success',
      data: {
        user: newUser,
        token: `Bearer ${userToken}`
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    })
  }
}

/**
 * @export
 * @function userLogin
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const userLogin = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      body: { email, password }
    } = req
    const user = (await fetchUser({ email })) as UserInstance

    if (!user) {
      return res.status(404).send({
        status: 'fail',
        data: { message: 'Email does not exist' }
      })
    }

    if ((await user.validatePassword(password)) === false) {
      return res.status(404).send({
        status: 'fail',
        data: { message: 'Provide correct login credentials' }
      })
    }

    const userToken: string = signToken({
      id: user.id!,
      username: user.username,
      role: user.role!
    })

    const newUser = user.toJSON()
    delete newUser.password

    return res.status(200).send({
      status: 'success',
      data: {
        user: newUser,
        token: `Bearer ${userToken}`
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'Server error'
    })
  }
}
