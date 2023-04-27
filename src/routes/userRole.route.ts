import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import UserRoleController from '@controllers/userRole.controller';

/**
 * This class contains  routes for user roles
 *
 * @class
 */
class UserRolesRoute implements Routes {
  public path = '/';
  public router = Router();
  public userRoleController = new UserRoleController();

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
   * This method defines all user role routes
   *
   * @function
   * @returns nothing
   */
  private initializeRoutes() {
    this.router.post(`${this.path}userrole`, this.userRoleController.createUserRole);
  }
}

export default UserRolesRoute;
