import db from '../../database/models'
import { ReservationInstance } from '../../database/models/reservations'

/**
 * @export
 * @function addReservation
 * @param {String} title - question title
 * @param {String} body - question body
 * @param {Integer} userId - id of the user
 * @returns {Object} object
 */
export const addReservation = (userId: number, date: Date, price: number, persons: number) => {
  const question = db.Reservation.create({ userId, date, price, persons })
  return question
}

/**
 * @export
 * @function fetchAllReservations
 * @returns {Object} object
 */
export const fetchAllReservations = (): Promise<{ rows: ReservationInstance[]; count: number }> => {
  const reservations = db.Reservation.findAndCountAll()
  return reservations
}

/**
 * @export
 * @function fetchReservation
 * @param {Integer} menuId - menu id
 * @returns {Object} object
 */
export const fetchReservation = (id: number): Promise<ReservationInstance> => {
  const reservation = db.Reservation.findByPk(id)
  return reservation
}
