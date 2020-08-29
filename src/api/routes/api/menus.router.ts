import express from 'express'

import { getAllQuestions, getMenu } from '../../controllers/menu.controllers'
import { createUserValidator, userLoginValidator } from '../../middlewares/validation/users.validation'

const menusRouter = express.Router()

menusRouter.get('/', getAllQuestions)
menusRouter.get('/:id', getMenu)

export default menusRouter
