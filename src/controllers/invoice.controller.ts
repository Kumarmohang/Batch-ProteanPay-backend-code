import { Request, Response } from 'express';
import InvoiceService from '@services/invoice.service';
import { Invoice } from '@/interfaces/invoice.interface';
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
 * @param req as request
 * @param res as response
 */
class InvoiceController {
  public invoiceService = new InvoiceService();

  /**
   * Controller function for creating new project
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public createInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
      const createInvoiceData = await this.invoiceService.createInvoice(req);
      handleResponse.success(res, createInvoiceData, 201);
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
  public getAllInvoices = async (req: Request, res: Response) => {
    try {
      const allInvoicess: Invoice[] = await this.invoiceService.getAllInvoices(req);
      handleResponse.success(res, allInvoicess, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice by Id or Identifier
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceByIdOrIdentifier = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      console.log(customInvoiceIdentifier);
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: Invoice = await this.invoiceService.getInvoiceById(invoiceId);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: Invoice = await this.invoiceService.getInvoiceByIdentifier(customInvoiceIdentifier);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: Invoice = await this.invoiceService.getStatusById(invoiceId);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: Invoice = await this.invoiceService.getStatusByIdentifier(customInvoiceIdentifier);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceHtml = async (req: Request, res: Response): Promise<void> => {
    try {
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      const invoice: string = await this.invoiceService.getHtmlByIdentifier(customInvoiceIdentifier);
      handleResponse.success(res, invoice, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoicePdf = async (req: Request, res: Response): Promise<void> => {
    try {
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      const invoice = await this.invoiceService.getPdfByIdentifier(customInvoiceIdentifier);
      res.writeHead(200, [
        ['Content-Type', 'application/pdf'],
        ['Content-Disposition', `attachment; filename=${invoice.fileName}`],
      ]);
      res.end(invoice.pdf);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoicePdfDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const invoice = await this.invoiceService.getPdfById(invoiceId);
      res.writeHead(200, [
        ['Content-Type', 'application/pdf'],
        ['Content-Disposition', `attachment; filename=${invoice.fileName}`],
      ]);
      res.end(invoice.pdf);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceStatusDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: Invoice = await this.invoiceService.getStatusById(invoiceId);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: Invoice = await this.invoiceService.getStatusByIdentifier(customInvoiceIdentifier);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
  public deleteInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      const invoice = await this.invoiceService.deleteInvoice(customInvoiceIdentifier);
      const message = {
        message: invoice,
        code: 204,
      };
      handleResponse.error(res, message, 204);
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
  public createInvoiceDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const createInvoiceData = await this.invoiceService.createInvoiceDashboard(req);
      handleResponse.success(res, createInvoiceData, 201);
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
  public getAllInvoicesDashboard = async (req: Request, res: Response) => {
    try {
      const allInvoicess: Invoice[] = await this.invoiceService.getAllInvoicesDashboard(req);
      handleResponse.success(res, allInvoicess, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice by Id or Identifier
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceByIdOrIdentifierDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: Invoice = await this.invoiceService.getInvoiceById(invoiceId);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: Invoice = await this.invoiceService.getInvoiceByIdentifier(customInvoiceIdentifier);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceStatusDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: Invoice = await this.invoiceService.getStatusById(invoiceId);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: Invoice = await this.invoiceService.getStatusByIdentifier(customInvoiceIdentifier);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public getInvoiceHtmlDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: string = await this.invoiceService.getHtmlById(invoiceId);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: string = await this.invoiceService.getHtmlByIdentifier(customInvoiceIdentifier);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for updating invoice status
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public updateStatusDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const invoiceId: string = req.query.invoiceId;
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      const statusBody = req.body.status;
      if (!invoiceId && !customInvoiceIdentifier) {
        const error = {
          message: 'kindly mention InvoiceId or CustomInvoiceIdentifier in query Params !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (!statusBody) {
        const error = {
          message: 'kindly mention status in body !',
          errorCode: 400,
        };
        handleResponse.error(res, error, 400);
      } else if (invoiceId) {
        const invoice: string = await this.invoiceService.updateInvoiceById(invoiceId, statusBody);
        handleResponse.success(res, invoice, 200);
      } else {
        const invoice: string = await this.invoiceService.updateInvoiceByIdentifier(customInvoiceIdentifier, statusBody);
        handleResponse.success(res, invoice, 200);
      }
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for updating invoice status
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public updateStatusAllDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const sucessMessage = await this.invoiceService.updateAllInvoiceByDirectoryId(req);
      handleResponse.success(res, sucessMessage, 200);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for getting invoice status
   *
   * @param req user request
   * @param res user response
   * @param _next next function
   * @returns nothing
   */
  public deleteInvoiceDashboard = async (req: Request, res: Response): Promise<void> => {
    try {
      const customInvoiceIdentifier: string = req.query.customInvoiceIdentifier;
      const invoice = await this.invoiceService.deleteInvoice(customInvoiceIdentifier);
      const message = {
        message: invoice,
        code: 204,
      };
      handleResponse.error(res, message, 204);
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default InvoiceController;
