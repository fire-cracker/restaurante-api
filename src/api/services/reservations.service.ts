import db from '../../database/models'
import { ReservationInstance } from '../../database/models/reservations'

/**
 * @export
 * @function addReservation
 * @param {Integer} userId -id of the user
 * @param {Date} date - reservation date
 * @param {Integer} price - reservation price
 * @param {Integer} persons - number of people
 * @returns {Object} object
 */
export const addReservation = (userId: number, date: Date, price: number, persons: number, orders: any) => {
  const reservation = db.Reservation.create(
    { userId, date, price, persons, orders },
    {
      include: [{ model: db.Order, as: 'orders' }]
    }
  )
  return reservation
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
 * @param {Integer} reservationId - menu id
 *  * @param {Date} date - reservation date
 * @returns {Object} object
 */
export const fetchUserReservation = (data: any): Promise<ReservationInstance[]> => {
  console.log('ddat>>>>>>', data)
  const reservation = db.Reservation.findAll({
    where: { ...data },
    include: [{ model: db.Order, as: 'orders', include: [{ model: db.Menu, as: 'menus' }] }]
  })
  console.log('reservation>>>>>>', reservation)
  return reservation
}
