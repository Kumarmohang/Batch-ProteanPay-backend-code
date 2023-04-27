import { Request, Response } from 'express';
import { Roles } from '@interfaces/roles.interface';
import rolesService from '@services/roles.service';
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
class RolesController {
  public rolesService = new rolesService();

  /**
   * Controller function for creating role
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public createRole = async (req: Request, res: Response) => {
    try {
      const role: Roles = req.body;
      const createRole: Roles = await this.rolesService.createRole(role);
      res.status(201).json({ data: createRole, message: 'Role Created!' });
      handleResponse.success(res, createRole, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default RolesController;
