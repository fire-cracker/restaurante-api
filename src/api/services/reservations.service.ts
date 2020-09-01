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
export const addReservation = (userId: string, date: Date, price: number, persons: number, orders: any) => {
  const newDate: any = new Date(date)
  const reservation = db.Reservation.create(
    { userId, date: newDate, price, persons, orders },
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
export const fetchAllReservations = (): Promise<ReservationInstance[]> => {
  const reservations = db.Reservation.findAll({
    include: [
      {
        model: db.Order,
        as: 'orders',
        attributes: ['id', 'quantity'],
        include: [{ model: db.Menu, as: 'menus', attributes: ['id', 'name', 'type', 'price'] }]
      }
    ]
  })
  return reservations
}

/**
 * @export
 * @function fetchReservation
 * @param {Integer} reservationId - menu id
 * @returns {Object} object
 */
export const fetchReservation = (id: number): Promise<ReservationInstance> => {
  const reservation = db.Reservation.findByPk(id, {
    include: [
      {
        model: db.Order,
        as: 'orders',
        attributes: ['id', 'quantity'],
        include: [{ model: db.Menu, as: 'menus', attributes: ['id', 'name', 'type', 'price'] }]
      }
    ]
  })
  return reservation
}

/**
 * @export
 * @function fetchReservation
 * @param {Object} data - data object
 * @returns {Object} object
 */
export const fetchUserReservation = (data: { userId: string; date?: Date }): Promise<ReservationInstance[]> => {
  const reservation = db.Reservation.findAll({
    where: { ...data },
    include: [
      {
        model: db.Order,
        as: 'orders',
        attributes: ['id', 'quantity'],
        include: [{ model: db.Menu, as: 'menus', attributes: ['id', 'name', 'type', 'price'] }]
      }
    ]
  })
  return reservation
}
