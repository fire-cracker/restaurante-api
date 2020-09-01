import { Router } from 'express'

import welcomeRoute from './welcome.router'
import usersRouter from './users.router'
import menusRouter from './menus.router'
import reservationsRouter from './reservations.router'

const routes = Router()

routes.use('/', welcomeRoute)
routes.use('/', usersRouter)
routes.use('/menus', menusRouter)
routes.use('/reservations', reservationsRouter)

export default routes
