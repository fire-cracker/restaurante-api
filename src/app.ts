import chalk from 'chalk'
import express, { Request, Response } from 'express'
import { createLogger, format, transports } from 'winston'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import auth from './api/middlewares/authentication/authentication'
import router from './api/routes'

dotenv.config()

const logger = createLogger({
  level: 'debug',
  format: format.simple(),
  transports: [new transports.Console()]
})

const app: express.Application = express()
const corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// // routes
// Server.swagger(app, {
//   endpoint: 'api-docs',
//   filePath: './api.docs/swagger.json',
//   schemes: ['http']
// })

app.use(auth.initialize())
app.use(router)

app.get('*', (req: Request, res: Response) =>
  res.status(200).send({
    status: 'fail',
    message: 'Route not found'
  })
)

// configure port and listen for requests
const port = process.env.PORT || 8080

app.listen(port, () => {
  logger.debug(`Server running on  http://localhost:${chalk.blue(port)}`)
})

export default app
