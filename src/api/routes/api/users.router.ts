import express from 'express'
import passport from 'passport'

import { authInterceptor } from '../../middlewares/validation/validationHandler'

import { userSignup, userLogin } from '../../controllers/auth.controllers'
import { getUserReservations, getUser } from '../../controllers/users.controllers'
import {
  createUserValidator,
  userLoginValidator
} from '../../middlewares/validation/users.validation'

const usersRouter = express.Router()

usersRouter.post('/auth/signup', createUserValidator, userSignup)
usersRouter.post('/auth/login', userLoginValidator, userLogin)
usersRouter.get(
  '/users/:id/reservations',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  getUserReservations
)
usersRouter.get(
  '/users/:id',
  passport.authenticate('jwt', { session: false }),
  authInterceptor,
  getUser
)

export default usersRouter
