import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import PermissionController from '@controllers/permissions.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePermissionDto } from '../dtos/permissions.dto';

/**
 * This class contains  routes for user permission table
 *
 * @class
 */
class PermissionRoutes implements Routes {
  public path = '/';
  public router = Router();
  public permissionController = new PermissionController();

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
    this.router.post(`${this.path}permission`, validationMiddleware(CreatePermissionDto, 'body'), this.permissionController.createPermission);
  }
}

export default PermissionRoutes;
