import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { authLocalMiddleware } from '../middlewares/passportAuth.middleware';
import { LoginUserDto } from '../dtos/login.dto';
import { OneTimeAccessTokenSchema, userSchema } from '../dtos/userJoi.dto';
import { celebrate } from 'celebrate';
import AuthApi from '@/middlewares/passportApiKey.middleware';

/**
 * This class contains all the routes for user authorization
 *
 * @class
 */
class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  /**
   * This constructor initilize Routes
   *
   * @class
   * @returns nothing
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * This method defines all authorization routes
   *
   * @function
   * @returns nothing
   */
  private initializeRoutes() {
    this.router.post(
      `${this.path}signup`,
      celebrate({ body: userSchema }, { abortEarly: false, allowUnknown: true, stripUnknown: true }),
      this.authController.signUp,
    );
    this.router.post(`${this.path}login`, validationMiddleware(LoginUserDto, 'body'), authLocalMiddleware, this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.post(
      `${this.path}merchant/auth/getOneTimeToken`,
      AuthApi.required,
      celebrate({ body: OneTimeAccessTokenSchema }),
      this.authController.getOneTimeToken,
    );
  }
}

export default AuthRoute;
