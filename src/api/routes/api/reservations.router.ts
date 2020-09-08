import { Router } from 'express'
import passport from 'passport'

import { authInterceptor } from '../../middlewares/validation/validationHandler'
import { createReservationValidator, reservationChargeValidator } from '../../middlewares/validation/reservations.validation'
import { createReservation, getAllReservations, getReservation } from '../../controllers/reservations.controllers'
import { createReservationCharge } from '../../controllers/charges.controllers'

const reservationsRouter = Router()

reservationsRouter.get('/', passport.authenticate('jwt', { session: false }), authInterceptor, getAllReservations)
reservationsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  createReservationValidator,
  createReservation
)
reservationsRouter.get('/:id', passport.authenticate('jwt', { session: false }), authInterceptor, getReservation)
reservationsRouter.post(
  '/:id/charges',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  reservationChargeValidator,
  createReservationCharge
)

export default reservationsRouter
