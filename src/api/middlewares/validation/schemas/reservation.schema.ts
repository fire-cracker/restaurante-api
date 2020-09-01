import Joi from '@hapi/joi'

const date = Joi.date().required()
const price = Joi.number().integer().min(0).max(10000).required()
const persons = Joi.number().integer().min(1).max(6).required()
const orders = Joi.array()
  .items(
    Joi.object()
      .keys({
        menuId: Joi.number().integer().min(1).max(100).required(),
        quantity: Joi.number().integer().min(1).max(100).required()
      })
      .required()
  )
  .required()

export const createReservationSchema = Joi.object().keys({
  date,
  price,
  persons,
  orders
})
