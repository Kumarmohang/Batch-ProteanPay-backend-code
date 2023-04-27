import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import DB from '@databases';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = DB.users;

/**
 *
 * @param jwt_payload token contains user credentials
 * @param done callback passes parameter to next middleware
 * @returns nothing
 */
async function verify(jwt_payload: any, done: (error: any, user?: any, options?: IVerifyOptions) => void): Promise<void> {
  const user = await User.findByPk(jwt_payload.id);
  if (user) {
    done(undefined, user, { message: `User ${user} is Authenticated` });
    return;
  }
  done(undefined, false, { message: 'User not found' });
}

/**
 * This function Initilize passport jwt to express app
 *
 * @function
 * @returns nothing
 */
export const authJwt = () => {
  passport.use(
    new JwtStrategy({ secretOrKey: process.env.SECRET_KEY, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() }, (token: any, done) => {
      verify(token, done).catch(error => {
        done(error);
      });
    }),
  );
};

/**
 * This class contains methods for authentication all routes
 *
 * @class
 */
export default class AuthServiceJwt {
  /**
   * This function act as passport authentication middleware
   *
   * @function
   * @param req as request
   * @param res as response
   * @param next as function pass parameter to next step
   * @returns nothing
   */
  static required(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json({
          message: 'Unauthorized',
          code: 401,
          errors: 'Incorrect Token',
        });
      } else {
        req.logIn(user, function (error) {
          if (error) {
            return next(error);
          }
          return next();
        });
      }
    })(req, res, next);
  }
}
