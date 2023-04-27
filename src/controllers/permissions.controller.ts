import { Request, Response } from 'express';
import { Permissions } from '@interfaces/permissions.interface';
import permissionsService from '@services/permissions.service';
import handleResponse from '../utils/response';

/**
 * @typedef Controller
 * @param {Request} req user request
 * @param {Response} res user response
 * @param {NextFunction} next next function
 * @returns {void} void
 */

/**
 * This class has all the methods to control permission table
 *
 * @class
 */
class PermissionsController {
  public permissionService = new permissionsService();

  /**
   * Controller function for creating permission
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public createPermission = async (req: Request, res: Response) => {
    try {
      const permission: Permissions = req.body;
      const createPermission: Permissions = await this.permissionService.createPermission(permission);
      handleResponse.success(res, createPermission, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default PermissionsController;
