import Joi from '@hapi/joi'

const date = Joi.date().required()
const persons = Joi.number().integer().min(1).max(6).required()
const time = Joi.string()
  .regex(/^([01]\d|2[0-3]):?([0-5]\d)$/)
  .required()
const type = Joi.string().trim().valid(['breakfast', 'lunch', 'dinner', 'drinks']).required()
const stripeToken = Joi.string().trim().required()
const price = Joi.number().integer().min(1).max(100000).required()

export const createReservationSchema = Joi.object().keys({
  date,
  persons,
  time,
  type
})

export const reservationChargeSchema = Joi.object().keys({
  stripeToken,
  price
})
