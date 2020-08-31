import { Router } from 'express'
import passport from 'passport'

import { authInterceptor } from '../../middlewares/validation/validationHandler'
import { createReservation, getAllReservations, getReservation } from '../../controllers/reservations.controllers'

const reservationsRouter = Router()

reservationsRouter.get('/', getAllReservations)
reservationsRouter.post('/', passport.authenticate('jwt', { session: false }), authInterceptor, createReservation)
reservationsRouter.get('/:id', getReservation)

export default reservationsRouter
