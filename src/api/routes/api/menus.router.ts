import express from 'express'

import { getAllMenus, getMenu } from '../../controllers/menu.controllers'

const menusRouter = express.Router()

menusRouter.get('/', getAllMenus)
menusRouter.get('/:id', getMenu)

export default menusRouter
