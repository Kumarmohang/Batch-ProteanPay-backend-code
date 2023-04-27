import { Request, Response } from 'express';
import { UserRole } from '@interfaces/userRole.interface';
import userRoleService from '@services/userRole.service';
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
class UserRoleController {
  public userRoleService = new userRoleService();

  /**
   * Controller function for creating role
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public createUserRole = async (req: Request, res: Response) => {
    try {
      const userRole: UserRole = req.body;
      const createUserRole: UserRole = await this.userRoleService.createUserRole(userRole);
      handleResponse.success(res, createUserRole, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default UserRoleController;
