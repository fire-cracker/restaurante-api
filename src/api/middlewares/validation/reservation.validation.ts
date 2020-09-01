import { Request, Response, NextFunction } from 'express'

import { validationHandler } from './validationHandler'
import { createReservationSchema } from './schemas/reservation.schema'

/**
 * @export
 * @function createReservationValidator
 * @param {Object} req - request received
 * @param {Object} res - response object
 * @param {Object} next - next object
 * @returns {Object} next object
 */
export const createReservationValidator = (req: Request, res: Response, next: NextFunction) => {
  validationHandler(req, res, next, createReservationSchema)
}
