import Joi from '@hapi/joi'

const username = Joi.string().trim().min(8).max(150).required()
const email = Joi.string().trim().min(8).max(100).email({ minDomainSegments: 2 }).required()
const password = Joi.string()
  .min(8)
  .max(150)
  .trim()
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required()

export const createUserSchema = Joi.object().keys({
  username,
  email,
  password
})

export const userLoginSchema = Joi.object().keys({
  email,
  password
})
