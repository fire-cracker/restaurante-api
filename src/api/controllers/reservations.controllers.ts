import { Response, Request } from 'express'
import { addReservation, fetchAllReservations, fetchReservation } from '../services/reservations.service'

/**
 * @export
 * @function createReservation
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @returns {Object} JSON object (JSend format)
 */
export const createReservation = async (req: Request, res: Response): Promise<Response<any>> => {
  try {
    console.log('req>>>>>', req.body)
    const {
      body: { date, order, price, persons },
      // user: { id }
    } = req

    // const question = await addReservation(id, date, price, persons)
    return res.status(200).send({
      data: {
        // question
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
    const { rows: reservations, count } = await fetchAllReservations()
    return res.status(200).send({
      status: 'success',
      data: {
        reservations,
        count
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
export const getReservation = async ({ params: { id } }: Request, res: Response): Promise<Response<any>> => {
  try {
    const reservation = await fetchReservation(Number(id))

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
