import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import { fetchUser } from '../../services/users.service'
import { UserInstance } from '../../../database/models/users'

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const user = (await fetchUser({ email: payload.email })) as UserInstance
      if (!user) {
        return done(null, {
          status: 'fail',
          data: { message: 'Access Unauthorized' }
        })
      }

      return done(null, user)
    } catch (error) {
      return done(error, null)
    }
  })
)

export default passport
