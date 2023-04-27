import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import AuthServiceJwt from '../middlewares/passportJwt.auth';
import { celebrate } from 'celebrate';
import { userSchema } from '../dtos/userJoi.dto';
import { updateUserSchema } from '@/dtos/userJoi.dto';
/**
 * UserRoute class
 *
 * @implements {Routes}
 */
class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  /**
   * Route constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * this function init all routes related to user controller
   *
   * @returns {void }nothing
   */
  private initializeRoutes() {
    this.router.get(`${this.path}/me`, celebrate({ body: userSchema }), AuthServiceJwt.required, this.usersController.getMe);

    this.router.put(`${this.path}/me`, celebrate({ body: updateUserSchema }), AuthServiceJwt.required, this.usersController.updateMe);
    this.router.get(`${this.path}/me/api_key`, AuthServiceJwt.required, this.usersController.getMeApiKey);
    this.router.put(`${this.path}/me/api_key`, AuthServiceJwt.required, this.usersController.updateMeApiKey);
  }
}

export default UsersRoute;
