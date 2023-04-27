import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import passportLocal, { IVerifyOptions } from 'passport-local';
import DB from '@databases';
import { UserModel } from '@/models/users.model';

const LocalStrategy = passportLocal.Strategy;
const User = DB.users;

/**
 *
 * @param email user email
 * @param password user password
 * @param done cb function
 * @returns nothing
 */
async function verify(email: string, password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void): Promise<void> {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    done(undefined, false, { message: `Email ${email} not found.` });
    return;
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (isMatched) {
    done(undefined, user);
    return;
  }
  done(undefined, false, { message: 'Invalid email or password.' });
}

/**
 * This function Initilize passport local to express app
 *
 * @function
 * @returns nothing
 */
export const authLocal = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      verify(email, password, done).catch(error => {
        done(error);
      });
    }),
  );

  passport.serializeUser((_req, user, done) => {
    done(undefined, user);
  });

  passport.deserializeUser((id: number, done) => {
    User.findByPk(id)
      .then((user: UserModel) => done(undefined, user))
      .catch(error => done(error));
  });
};

/**
 * This function act as passport authentication middleware
 *
 * @function
 * @param req as request
 * @param res as response
 * @param next as function pass parameter to next step
 * @returns nothing
 */
export const authLocalMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json({
        message: 'Unauthorized',
        code: 401,
        errors: 'Your username or password is incorrect',
      });
    }
    req.logIn(user, function (error) {
      if (error) {
        console.log(error, 'from Login passport function');
        return next(error);
      }
      return next();
    });
  })(req, res, next);
};
