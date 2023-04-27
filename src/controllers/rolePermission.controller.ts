import { Request, Response } from 'express';
import { RolePermission } from '@interfaces/rolePermission.interface';
import rolePermissionService from '@services/rolePermission.service';
import handleResponse from '../utils/response';

/**
 * @typedef Controller
 * @param {Request} req user request
 * @param {Response} res user response
 * @returns {void} void
 */

/**
 * This class has all the methods to control user table
 *
 * @class
 */
class RolePermissionController {
  public rolePermissionService = new rolePermissionService();

  /**
   * Controller function for creating role
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public createRolePermission = async (req: Request, res: Response) => {
    try {
      const userPermission: RolePermission = req.body;
      const createRolePermission: RolePermission = await this.rolePermissionService.createRolePermission(userPermission);
      handleResponse.success(res, createRolePermission, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default RolePermissionController;
