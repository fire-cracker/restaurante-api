import { Request, Response, NextFunction } from 'express'

import { validationHandler } from './validationHandler'
import { createUserSchema, userLoginSchema } from './schemas/user.schema'

/**
 * @export
 * @function createUserValidator
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  validationHandler(req, res, next, createUserSchema)
}

/**
 * @export
 * @function userLoginValidator
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const userLoginValidator = (req: Request, res: Response, next: NextFunction) =>
  validationHandler(req, res, next, userLoginSchema)
