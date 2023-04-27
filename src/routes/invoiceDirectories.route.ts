import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import {
  invoiceDirectoryIdSchema,
  invoiceDirectoryParamsSchema,
  invoiceDirectorySchema,
  invoiceDirectoryUpdateSchema,
} from '@/dtos/invoiceDirectories.dto';
import InvoiceDirectoryController from '@/controllers/invoiceDirectory.controller';
import { celebrate } from 'celebrate';
import AuthApi from '@/middlewares/passportApiKey.middleware';
import AuthServiceJwt from '@/middlewares/passportJwt.auth';

import { invoiceDirectoryIdSchemaDashboard } from '../dtos/invoiceDirectories.dto';

/**
 * ProjectRoute class
 *
 * @implements {Routes}
 */
class InvoiceDirectoriesRoute implements Routes {
  public path = '/merchant/directory';
  public router = Router();
  public invoiceDirectoryController = new InvoiceDirectoryController();

  /**
   * Route constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * this function init all routes related to project controller
   *
   * @returns projectDetails - project details
   */
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      AuthApi.required,
      celebrate({ body: invoiceDirectorySchema }),
      this.invoiceDirectoryController.createInvoiceDirectory,
    );
    this.router.get(
      `${this.path}`,
      AuthApi.required,
      celebrate({ query: invoiceDirectoryParamsSchema }),
      this.invoiceDirectoryController.getDirectoryDetails,
    );

    this.router.get(
      `${this.path}/details`,
      AuthApi.required,
      celebrate({ query: invoiceDirectoryIdSchema }),
      this.invoiceDirectoryController.getDirectoryDetailsByCustomIdentifier,
    );
  }
}

export default InvoiceDirectoriesRoute;
/**
 * ProjectRoute class
 *
 * @implements {Routes}
 */
export class InvoiceDirectoryDashboardRoute {
  public path = '/directory';
  public router = Router();
  public invoiceDirectoryController = new InvoiceDirectoryController();

  /**
   * Route constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * this function init all routes related to project controller
   *
   * @returns projectDetails - project details
   */
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      AuthServiceJwt.required,
      celebrate({ body: invoiceDirectorySchema }, { allowUnknown: true }),
      this.invoiceDirectoryController.createInvoiceDirectoryDashboard,
    );
    this.router.get(
      `${this.path}`,
      AuthServiceJwt.required,
      celebrate({ query: invoiceDirectoryParamsSchema }, { allowUnknown: true }),
      this.invoiceDirectoryController.getDirectoryDetailsDashboard,
    );
    this.router.get(
      `${this.path}/details`,
      AuthServiceJwt.required,
      celebrate({ query: invoiceDirectoryIdSchemaDashboard }, { allowUnknown: true }),
      this.invoiceDirectoryController.getDirectoryDetailsByIdDashboard,
    );
    this.router.put(
      `${this.path}/:id`,
      AuthServiceJwt.required,
      celebrate({ body: invoiceDirectoryUpdateSchema }, { allowUnknown: true }),
      this.invoiceDirectoryController.updateDirectoryDetailsByIdDashboard,
    );
  }
}
