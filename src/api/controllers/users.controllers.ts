import { Response, Request } from 'express'

import { fetchUserReservation } from '../services/reservations.service'
import { fetchUser } from '../services/users.service'
import { UserInterface } from '../../types/user'

/**
 * @export
 * @function getUserReservation
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getUserReservations = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      query: { date },
      params: { id: userId },
      user: { id, role }
    } = (req as unknown) as { query: any; params: { id: string }; user: UserInterface }

    if (userId !== id && role !== 'admin') {
      return res.status(401).send({
        status: 'fail',
        data: {
          message: 'Unauthorised to make this request'
        }
      })
    }
    const data = date ? { userId: role === 'admin' ? userId : id, date } : { userId: role === 'admin' ? userId : id }
    const reservation = await fetchUserReservation(data)

    if (!reservation.length) {
      return res.status(404).send({
        status: 'fail',
        data: {
          message: 'Reservation does not exist'
        }
      })
    }

    return res.status(200).send({
      status: 'success',
      data: {
        reservation
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'Server error'
    })
  }
}

/**
 * @export
 * @function getUser
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getUser = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      params: { id: userId },
      user: { id, role }
    } = (req as unknown) as { params: { id: string }; user: UserInterface }

    if (userId !== id && role !== 'admin') {
      return res.status(401).send({
        status: 'fail',
        data: {
          message: 'Unauthorised to make this request'
        }
      })
    }

    const user = await fetchUser({ id: role === 'admin' ? userId : id })

    if (!user) {
      return res.status(404).send({
        status: 'fail',
        data: {
          message: 'User does not exist'
        }
      })
    }

    return res.status(200).send({
      status: 'success',
      data: {
        user
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'Server error'
    })
  }
}
