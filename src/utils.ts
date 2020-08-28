import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const secret = process.env.JWT_SECRET || 'shhhhhh'

/**
 * @export
 * @function signToken
 * @param {Object} payload - user object
 * @returns {string} Jwt token
 */
export const signToken = (payload: { role: string; email: string }): string => jwt.sign(payload, secret, { expiresIn: '24h' })

/**
 * @export
 * @function verifyToken
 * @param {string} token - JWT token
 * @returns {object} Payload
 */
export const verifyToken = (token: string) => jwt.verify(token, secret)

export const validatePassword = (encodedPassword: string, password: string) => bcrypt.compareSync(password, encodedPassword)
