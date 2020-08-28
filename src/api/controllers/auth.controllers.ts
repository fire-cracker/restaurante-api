import { Response, Request, RequestHandler } from 'express'
import { Tags } from 'typescript-rest-swagger'

import { createUser, getUser } from '../services/users.service'
import { signToken, validatePassword } from '../../utils'
import { UserInterface } from '../../types/user'

/**
 * @export
 * @function userSignup
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const userSignup = async (req: Request, res: Response) => {
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
    delete user.password
    // delete (user as AnOptionalNumber).password
    return res.status(200).send({
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
export const userLogin = async (req: Request, res: Response) => {
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

    if (validatePassword(user.password!, password) === false) {
      return res.status(404).send({
        status: 'fail',
        data: { message: 'Provide correct login credentials' }
      })
    }

    const userToken = signToken({
      role: 'user',
      email
    })
    delete user.password
    return res.status(200).send({
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
