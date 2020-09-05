import Joi from '@hapi/joi'

const date = Joi.date().required()
const stripeToken = Joi.string().trim().required()
const persons = Joi.number().integer().min(1).max(6).required()
const time = Joi.string().regex(/^([0-9]{2}):([0-9]{2})$/).required()
const type = Joi.string().trim().valid(['breakfast', 'lunch', 'dinner', 'drinks']).required()

export const createReservationSchema = Joi.object().keys({
  date,
  stripeToken,
  persons,
  time,
  type
})
