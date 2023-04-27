import { Request, Response } from 'express';
import handleResponse from '../utils/response';
import InvoicePdfGenerationService from '../services/generatePdf.service';

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
class PdfController {
  public pdfGenerationService = new InvoicePdfGenerationService();

  /**
   * Controller function for creating new project
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public generateInviocePdf = async (req: Request, res: Response) => {
    try {
      const pdf: any = await this.pdfGenerationService.genrateInviocePdf(req);
      handleResponse.success(res, pdf, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for creating new project
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public generateInviocePdfDashboard = async (req: Request, res: Response) => {
    try {
      const pdf: any = await this.pdfGenerationService.genrateInviocePdf(req);
      handleResponse.success(res, pdf, 201);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default PdfController;
