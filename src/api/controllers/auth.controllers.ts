import { Response, Request } from 'express'
import { Tags } from 'typescript-rest-swagger'

import { createUser, getUser } from '../services/users.service'
import { signToken } from '../../utils'

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

    const userExist = await getUser(email)

    if (userExist) {
      return res.status(409).send({
        status: 'fail',
        data: { message: 'User with this email already exist.' }
      })
    }

    const user = await createUser(username, email, password)
    const userToken = signToken({
      role: 'user',
      email
    })

    return res.status(200).send({
      status: 'success',
      data: {
        user,
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
    const user = await getUser(email)

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

    const userToken = signToken({
      role: 'user',
      email
    })

    return res.status(200).send({
      status: 'success',
      data: {
        user,
        token: `Bearer ${userToken}`
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'Server error'
    })
  }
}
