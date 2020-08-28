import express from 'express'

import { userSignup, userLogin } from '../../controllers/auth.controllers'
import { createUserValidator, userLoginValidator } from '../../middlewares/validation/users.validation'

const usersRouter = express.Router()

usersRouter.post('/auth/signup', createUserValidator, userSignup)
usersRouter.post('/auth/login', userLoginValidator, userLogin)

export default usersRouter
