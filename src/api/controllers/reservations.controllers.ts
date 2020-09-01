import { Response, Request } from 'express'

import { addReservation, fetchAllReservations, fetchReservation } from '../services/reservations.service'
import { UserInterface, NewReservationInterface } from '../../types/user'
import { ReservationInstance } from '../../database/models/reservations'
import db from '../../database/models'

/**
 * @export
 * @function createReservation
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const createReservation = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      body: { date, orders, price, persons },
      user: { id }
    } = (req as unknown) as { body: NewReservationInterface; user: UserInterface }

    const newReservation = (await addReservation(id, date, price, persons, orders)) as ReservationInstance
    const reservationOrders = await newReservation.getOrders({
      include: { model: db.Menu, as: 'menus', attributes: ['id', 'name', 'type', 'price'] }
    })
    const reservation = { ...newReservation.toJSON(), orders: reservationOrders }
    return res.status(200).send({
      status: 'success',
      data: {
        reservation
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
 * @function getAllReservations
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getAllReservations = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      user: { role }
    } = (req as unknown) as { user: UserInterface }

    if (role !== 'admin') {
      return res.status(401).send({
        status: 'success',
        data: {
          message: 'Unauthorised to make this request'
        }
      })
    }

    const reservations = await fetchAllReservations()
    return res.status(200).send({
      status: 'success',
      data: {
        reservations,
        count: reservations.length
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
 * @function getReservation
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getReservation = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      params: { id },
      user: { role }
    } = (req as unknown) as { params: { id: number }; user: UserInterface }

    if (role !== 'admin') {
      return res.status(401).send({
        status: 'success',
        data: {
          message: 'Unauthorised to make this request'
        }
      })
    }
    const reservation = await fetchReservation(id)

    if (!reservation) {
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
