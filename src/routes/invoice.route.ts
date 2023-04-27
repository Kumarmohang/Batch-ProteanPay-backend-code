import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import InvoiceController from '@controllers/invoice.controller';
import AuthApi from '@/middlewares/passportApiKey.middleware';
import AuthServiceJwt from '../middlewares/passportJwt.auth';
import { celebrate } from 'celebrate';
import { createInvoiceSchema, getInvoiceSchema, directoryIdSchema, updateStatusSchema, getInvoiceHtmlSchema } from '../dtos/invoice.dto';

/**
 * ProjectRoute class
 *
 * @implements {Routes}
 */
class InvoiceRoute implements Routes {
  public path = '/merchant/invoice';
  public router = Router();
  public invoiceController = new InvoiceController();

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
      celebrate({ body: createInvoiceSchema }, { allowUnknown: true }),
      this.invoiceController.createInvoice,
    );
    this.router.get(
      `${this.path}`,
      AuthApi.required,
      celebrate({ query: getInvoiceSchema }, { allowUnknown: true }),
      this.invoiceController.getAllInvoices,
    );
    this.router.get(`${this.path}/details`, AuthApi.required, this.invoiceController.getInvoiceByIdOrIdentifier);
    this.router.get(`${this.path}/status`, AuthApi.required, this.invoiceController.getInvoiceStatus);
    this.router.get(
      `${this.path}/html`,
      AuthApi.required,
      celebrate({ query: getInvoiceHtmlSchema }, { allowUnknown: true }),
      this.invoiceController.getInvoiceHtml,
    );
    this.router.put(`${this.path}/updateStatus`, AuthApi.required, this.invoiceController.updateStatusDashboard);
    this.router.delete(`${this.path}/delete`, AuthApi.required, this.invoiceController.deleteInvoice);

    this.router.get(
      `${this.path}/getInvoicePdf`,
      AuthApi.required,
      celebrate({ query: getInvoiceHtmlSchema }, { allowUnknown: true }),
      this.invoiceController.getInvoicePdf,
    );
  }
}

/**
 * ProjectRoute class
 *
 * @implements {Routes}
 */
export class InvoiceDashboardRoute implements Routes {
  public path = '/invoice';
  public router = Router();
  public invoiceController = new InvoiceController();

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
      celebrate({ body: createInvoiceSchema }),
      this.invoiceController.createInvoiceDashboard,
    );
    this.router.get(
      `${this.path}`,
      AuthServiceJwt.required,
      celebrate({ query: getInvoiceSchema }, { allowUnknown: true }),
      this.invoiceController.getAllInvoicesDashboard,
    );
    this.router.get(`${this.path}/details`, AuthServiceJwt.required, this.invoiceController.getInvoiceByIdOrIdentifierDashboard);
    this.router.get(`${this.path}/status`, AuthServiceJwt.required, this.invoiceController.getInvoiceStatusDashboard);
    this.router.get(`${this.path}/html`, AuthServiceJwt.required, this.invoiceController.getInvoiceHtmlDashboard);
    this.router.put(`${this.path}/updateStatus`, AuthServiceJwt.required, this.invoiceController.updateStatusDashboard);
    this.router.post(
      `${this.path}/updateStatusAll`,
      AuthServiceJwt.required,
      celebrate({ query: directoryIdSchema, body: updateStatusSchema }, { allowUnknown: true }),
      this.invoiceController.updateStatusAllDashboard,
    );
    this.router.delete(`${this.path}/delete`, AuthServiceJwt.required, this.invoiceController.deleteInvoiceDashboard);
    this.router.get(
      `${this.path}/getInvoicePdf`,
      AuthServiceJwt.required,
      celebrate({ query: getInvoiceHtmlSchema }, { allowUnknown: true }),
      this.invoiceController.getInvoicePdf,
    );
  }
}

export default InvoiceRoute;
