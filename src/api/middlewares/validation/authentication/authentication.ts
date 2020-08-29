import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

import { getUser } from '../../../services/users.service'

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

passport.use(
  new JWTStrategy(options, async (payload, done) => {
    try {
      const user = await getUser(payload.email)
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
