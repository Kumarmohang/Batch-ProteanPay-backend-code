import { Request, Response } from 'express';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
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
class UsersController {
  public userService = new userService();

  /**
   * Controller function for getting user list
   *
   * @param _req user request
   * @param res user response
   * @returns nothing
   */

  public getUsers = async (_req: Request, res: Response) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();
      handleResponse.success(res, findAllUsersData, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting user by id
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public getUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);
      handleResponse.success(res, findOneUserData, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting user by id
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public getMe = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.handleGetMe(req.user.id);
      handleResponse.success(res, result, 200);
    } catch (error) {
      handleResponse.success(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting user by id
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public updateMe = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.handleUpdateMe(req.user.id, req.body);
      handleResponse.success(res, result, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting api Key
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public getMeApiKey = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.handleGetMeApiKey(req.user.id);
      handleResponse.success(res, result, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting user by id
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public updateMeApiKey = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.handleUpdateMeApiKey(req.user.id);
      handleResponse.success(res, result, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for updating user
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      handleResponse.success(res, updateUserData, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for deleting user
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: User = await this.userService.deleteUser(userId);

      handleResponse.error(res, deleteUserData, 200);
    } catch (error) {
      handleResponse.success(res, error, error.errorCode);
    }
  };
}

export default UsersController;
