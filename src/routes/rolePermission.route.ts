import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RolePermissionController from '@controllers/rolePermission.controller';

/**
 * This class contains  routes for user roles
 *
 * @class
 */
class RolePermissionRoute implements Routes {
  public path = '/';
  public router = Router();
  public rolePermissionController = new RolePermissionController();

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
    this.router.post(`${this.path}rolepermission`, this.rolePermissionController.createRolePermission);
  }
}

export default RolePermissionRoute;
