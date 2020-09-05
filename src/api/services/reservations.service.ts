import db from '../../database/models'
import { ReservationInstance } from '../../database/models/reservations'

/**
 * @export
 * @function addReservation
 * @param {Integer} userId -id of the user
 * @param {Date} date - reservation date
 * @param {String} time - reservation time
 * @param {Integer} price - reservation price
 * @param {Integer} persons - number of people
 * @param {String} type - type of menu
 * @param {String} stripeId - stripeId
 * @returns {Object} object
 */
export const addReservation = (
  userId: string,
  date: Date,
  time: string,
  type: string,
  price: number,
  persons: number,
  stripeId: string
): Promise<ReservationInstance> => {
  const newDate: any = new Date(date)
  const reservation = db.Reservation.create({ userId, date: newDate, time, type, price, persons, stripeId })
  return reservation
}

/**
 * @export
 * @function fetchAllReservations
 * @returns {Object} object
 */
export const fetchAllReservations = (): Promise<ReservationInstance[]> => {
  const reservations = db.Reservation.findAll()
  return reservations
}

/**
 * @export
 * @function fetchReservation
 * @param {Integer} reservationId - menu id
 * @returns {Object} object
 */
export const fetchReservation = (id: number): Promise<ReservationInstance> => {
  const reservation = db.Reservation.findByPk(id)
  return reservation
}

/**
 * @export
 * @function fetchReservation
 * @param {Object} data - data object
 * @returns {Object} object
 */
export const fetchUserReservation = (data: { userId: string; date?: Date }): Promise<ReservationInstance[]> => {
  const reservation = db.Reservation.findAll({ where: { ...data } })
  return reservation
}
