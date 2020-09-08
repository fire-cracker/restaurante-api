import { Response, Request } from 'express'

import { fetchReservation } from '../services/reservations.service'
import { UserInterface } from '../../types/user'
import { IReservationCharge } from '../../types/reservations'
import { ReservationInstance } from '../../database/models/reservations'
import { stripeCharge } from '../../helpers/stripe'

/**
 * @export
 * @function createCharge
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const createReservationCharge = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    const {
      body: { stripeToken, price },
      params: { id: reservationId },
      user: { email }
    } = (req as unknown) as { body: IReservationCharge; params: { id: number }; user: UserInterface }

    const stripeCharges = await stripeCharge(price, 'usd', stripeToken, email)

    if (stripeCharges.statusCode === 400) {
      return res.status(400).send({
        error: {
          code: stripeCharges.code,
          message: stripeCharges.message,
          field: stripeCharges.param
        }
      })
    }

    const reservation = await fetchReservation(reservationId)

    if (!reservation) {
      return res.status(404).send({
        status: 'fail',
        data: {
          message: 'Reservation does not exist'
        }
      })
    }

    ;(await reservation.update(stripeToken)) as ReservationInstance

    return res.status(200).send({
      status: 'success',
      data: {
        stripeCharges
      }
    })
  } catch (error) {
    return res.status(502).send({
      message: 'An error occurred'
    })
  }
}
