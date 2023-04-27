import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import RolesController from '@controllers/roles.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateRoleDto } from '../dtos/role.dto';

/**
 * This class contains  routes for user roles
 *
 * @class
 */
class RolesRoute implements Routes {
  public path = '/';
  public router = Router();
  public roleController = new RolesController();

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
    this.router.post(`${this.path}role`, validationMiddleware(CreateRoleDto, 'body'), this.roleController.createRole);
  }
}

export default RolesRoute;
