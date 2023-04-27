import { NextFunction, Request, Response } from 'express';
import TransactionService from '@/services/transaction.service';
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
class TransactionController {
  private transactionService = new TransactionService();

  /**
   * Controller function for viewing transaction
   *
   * @param req user request
   * @param res user response
   * @param next next function for calling next middleware
   * @returns nothing
   */
  public getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionList = await this.transactionService.getAllTransactionsOfUser(req);
      handleResponse.success(res, transactionList, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for viewing transaction
   *
   * @param req user request
   * @param res user response
   * @param next next function for calling next middleware
   * @returns nothing
   */
  public getTransactionDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionDetails = await this.transactionService.getTransactionDetails(req);
      handleResponse.success(res, transactionDetails, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for viewing transaction
   *
   * @param req user request
   * @param res user response
   * @param next next function for calling next middleware
   * @returns nothing
   */
  public getTransactionInvoices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactionDetails = await this.transactionService.getTransactionInvoices(req);
      handleResponse.success(res, transactionDetails, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for generating transaction receipt pdf
   *
   * @param req user request
   * @param res user response
   * @param next next function for calling next middleware
   * @returns nothing
   */
  public getReceiptHtmlByTxId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const receipt = await this.transactionService.getReceiptHtmlByTxId(req);
      res.writeHead(200, [
        ['Content-Type', 'application/pdf'],
        ['Content-Disposition', `attachment; filename=${receipt.fileName}`],
      ]);
      res.end(receipt.pdf);
      handleResponse.success(res, receipt, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for generating transaction receipt pdf
   *
   * @param req user request
   * @param res user response
   * @param next next function for calling next middleware
   * @returns nothing
   */
  public getReceiptHtmlByDirectoryIdentifier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const receipt = await this.transactionService.getReceiptHtmlByCustomDirectoryIdentifier(req);
      res.writeHead(200, [
        ['Content-Type', 'application/pdf'],
        ['Content-Disposition', `attachment; filename=${receipt.fileName}`],
      ]);
      res.end(receipt.pdf);
      handleResponse.success(res, receipt, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for getting transaction txDetails
   *
   * @param req user request
   * @param res user response
   * @param next next function for calling next middleware
   * @returns nothing
   */
  public getTxStatusCustomDirectoryIdentifier = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const txDetails = await this.transactionService.getTxStatusCustomDirectoryIdentifier(req);
      handleResponse.success(res, txDetails, 200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller function for initiate transaction
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */

  public initiateTransaction = async (req: Request, res: Response) => {
    try {
      const transaction = await this.transactionService.initiateTransaction(req);
      res.status(201).json({ data: transaction, message: 'transaction initiated' });
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };

  /**
   * Controller function for update transaction
   *
   * @param req user request
   * @param res user response
   * @returns nothing
   */
  public updateTransaction = async (req: Request, res: Response) => {
    try {
      const transaction = await this.transactionService.updateTransaction(req);
      res.status(201).json({ data: transaction, message: 'transaction updated' });
    } catch (error) {
      handleResponse.error(res, error, error.errorCode);
    }
  };
}

export default TransactionController;
