import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import DB from '@databases';

const HeaderAPIKeyStrategy = require('passport-headerapikey').HeaderAPIKeyStrategy;
const User = DB.users;

/**
 *
 * @param apikey is key provided in headers
 * @param done callback passed to the next middleware
 * @returns nothing
 */
async function verify(apikey: any, done: (error: any, user?: any, options?: IVerifyOptions) => void): Promise<void> {
  const user = await User.findOne({ where: { api_key: apikey } });
  if (user) {
    done(undefined, user, { message: `User ${user} is Authenticated` });
    return;
  }
  done(undefined, false, { message: `User with this api key ${apikey} not found` });
}

/**
 *
 * @param apikey uuid as key contains user credentials
 * @param done callback passes parameter to nex middleware
 * @returns nothing
 */
export const authApi = () => {
  passport.use(
    new HeaderAPIKeyStrategy({ header: 'X-API-KEY' }, false, (apikey: string, done) => {
      verify(apikey, done).catch(error => {
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
export default class AuthApi {
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
    return passport.authenticate('headerapikey', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(401).json({
          message: 'Unauthorized',
          code: 401,
          errors: 'Incorrect API Key',
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
