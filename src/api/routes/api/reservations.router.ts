import { Router } from 'express'
import passport from 'passport'

import { authInterceptor } from '../../middlewares/validation/validationHandler'
import { createReservationValidator } from '../../middlewares/validation/reservation.validation'
import {
  createReservation,
  getAllReservations,
  getReservation
} from '../../controllers/reservations.controllers'

const reservationsRouter = Router()

reservationsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  getAllReservations
)
reservationsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  createReservationValidator,
  createReservation
)
reservationsRouter.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  getReservation
)

export default reservationsRouter
