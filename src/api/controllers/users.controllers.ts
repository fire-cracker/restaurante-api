import { Response, Request } from 'express'

import { fetchUserReservation } from '../services/reservations.service'

/**
 * @export
 * @function getUserReservation
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const getUserReservations = async (req: Request, res: Response): Promise<Response<any>> => {
  const {
    query: { date },
    params: { id }
  } = (req as unknown) as { query: any; params: { id: number } }
  try {
    const data = date ? { userId: id, date } : { userId: id }
    const reservation = await fetchUserReservation(data)

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
