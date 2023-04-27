import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import PdfController from '../controllers/pdf.controller';
import AuthServiceJwt from '../middlewares/passportJwt.auth';
import AuthApi from '@/middlewares/passportApiKey.middleware';

/**
 * This class contains all the routes for user authorization
 *
 * @class
 */
class PdfRoute implements Routes {
  public path = '/merchant/invoice';
  public router = Router();
  public pdfController = new PdfController();

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
   * This method defines all dashboard pdf routes
   *
   * @function
   * @returns nothing
   */
  private initializeRoutes() {
    this.router.post(`${this.path}/generatePdf`, AuthApi.required, this.pdfController.generateInviocePdfDashboard);
  }
}

/**
 * ProjectRoute class
 *
 * @implements {Routes}
 */
export class PdfRouteDashboard implements Routes {
  public path = '/invoice';
  public router = Router();
  public pdfController = new PdfController();

  /**
   * Route constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * this function init all routes related to pdf controller
   *
   * @returns pdfDetails - pdf details
   */
  private initializeRoutes() {
    this.router.post(`${this.path}/generatePdf`, AuthServiceJwt.required, this.pdfController.generateInviocePdf);
  }
}

export default PdfRoute;
