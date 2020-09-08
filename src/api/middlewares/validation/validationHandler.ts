import { Request, Response, NextFunction } from 'express'
import Joi, { ObjectSchema } from '@hapi/joi'

/**
 * @export
 * @function validationHandler
 * @param {Object} req - request received
 * @param {Object} schema - response object
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const validationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: ObjectSchema
) => {
  try {
    await Joi.validate(req.body, schema)
    next()
  } catch (error) {
    return res.status(400).send({
      status: 'fail',
      data: {
        message: error.details[0].message,
        field: error.details[0].path[0]
      }
    })
  }
}

/**
 * @export
 * @function authInterceptor
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const authInterceptor = async (req: any, res: Response, next: NextFunction) => {
  const { user } = req
  if (user.error) {
    return res.status(401).send(user.error)
  }
  next()
}
