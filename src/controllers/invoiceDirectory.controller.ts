import { Request, Response } from 'express';
import InvoiceDirectoryService from '@services/invoiceDirectory.service';
import { InvoiceDirectory } from '@/interfaces/invoiceDirectory.interface';
import handleResponse from '../utils/response';

/**
 * @typedef Controller
 * @param {Request} req user request
 * @param {Response} res user response
 * @param {NextFunction} next next function
 * @returns {void} void
 */

/**
 * This class has all the methods to control user table
 *
 * @class
 */
class InvoiceDirectoryController {
  public invoiceDirectoryService = new InvoiceDirectoryService();

  /**
   * Controller function for creating new project
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public createInvoiceDirectory = async (req: Request, res: Response) => {
    try {
      const createDirectoryData: InvoiceDirectory = await this.invoiceDirectoryService.createInvoiceDirectory(req);

      handleResponse.success(res, createDirectoryData, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function to get project details
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public getDirectoryDetails = async (req: Request, res: Response) => {
    try {
      const directoryDetails: any = await this.invoiceDirectoryService.getInvoiceDirectoryDetails(req);
      handleResponse.success(res, directoryDetails, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function to get project details by id
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public getDirectoryDetailsByCustomIdentifier = async (req: Request, res: Response) => {
    try {
      const directoryDetails: any = await this.invoiceDirectoryService.getInvoiceDirectoryDetailsByCustomIdentifier(req);
      handleResponse.success(res, directoryDetails, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for creating new project
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public createInvoiceDirectoryDashboard = async (req: Request, res: Response) => {
    try {
      const createDirectoryData: InvoiceDirectory = await this.invoiceDirectoryService.createInvoiceDirectory(req);
      console.log(createDirectoryData);
      handleResponse.success(res, createDirectoryData, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function to get project details
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public getDirectoryDetailsDashboard = async (req: Request, res: Response) => {
    try {
      const directoryDetails: any = await this.invoiceDirectoryService.getInvoiceDirectoryDetailsDashboard(req);
      handleResponse.success(res, directoryDetails, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function to get project details by id
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public getDirectoryDetailsByIdDashboard = async (req: Request, res: Response) => {
    try {
      const directoryDetails: any = await this.invoiceDirectoryService.getInvoiceDirectoryDetailsById(req);
      handleResponse.success(res, directoryDetails, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function to update project details by id
   *
   * @param req user request
   * @param res user response
   * @param next next function
   * @returns nothing
   */
  public updateDirectoryDetailsByIdDashboard = async (req: Request, res: Response) => {
    try {
      const directoryDetails: any = await this.invoiceDirectoryService.updateInvoiceDirectoryDetailsById(req);
      handleResponse.success(res, directoryDetails, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default InvoiceDirectoryController;
