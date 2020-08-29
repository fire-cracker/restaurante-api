import { Router } from 'express'

import welcomeRoute from './welcome.router'
import usersRouter from './users.router'
import menusRouter from './menus.router'

const routes = Router()

routes.use('/', welcomeRoute)
routes.use('/', usersRouter)
routes.use('/menus', menusRouter)

export default routes
