import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import TransactionController from '@controllers/transaction.controller';
import { celebrate } from 'celebrate';
import {
  CustomDirectoryIdentifierSchema,
  TransactionIdSchema,
  TransactionRequestSchema,
  TransactionUpdateRequestSchema,
} from '@dtos/transaction.dto';
import AuthServiceJwt from '@middlewares/passportJwt.auth';
import AuthApi from '@middlewares/passportApiKey.middleware';

/**
 * This class contains all the routes for user authorization
 *
 * @class
 */
class TransactionRoute implements Routes {
  public path = '/transaction';
  public router = Router();
  public transactionController = new TransactionController();
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
   * This method defines all authorization routes
   *
   * @function
   * @returns nothing
   */
  private initializeRoutes() {
    this.router.post(
      `${this.path}/initiate`,
      AuthServiceJwt.required,
      celebrate({ body: TransactionRequestSchema }),
      this.transactionController.initiateTransaction,
    );
    this.router.put(
      `${this.path}/update`,
      AuthServiceJwt.required,
      celebrate({ body: TransactionUpdateRequestSchema }),
      this.transactionController.updateTransaction,
    );
    this.router.get(`${this.path}`, AuthServiceJwt.required, this.transactionController.getTransactions);
    this.router.get(
      `${this.path}/details`,
      AuthServiceJwt.required,
      celebrate({ query: TransactionIdSchema }, { allowUnknown: true }),
      this.transactionController.getTransactionDetail,
    );
    this.router.get(
      `${this.path}/invoices`,
      AuthServiceJwt.required,
      celebrate({ query: TransactionIdSchema }, { allowUnknown: true }),
      this.transactionController.getTransactionInvoices,
    );
    this.router.get(
      `${this.path}/getTransactionPdf`,
      AuthServiceJwt.required,
      celebrate({ query: TransactionIdSchema }, { allowUnknown: true }),
      this.transactionController.getReceiptHtmlByTxId,
    );

    // routes for merchants ----------------------
    this.router.get(`/merchant${this.path}`, AuthApi.required, this.transactionController.getTransactions);
    this.router.get(
      `/merchant${this.path}/details`,
      AuthApi.required,
      celebrate({ query: TransactionIdSchema }, { allowUnknown: true }),
      this.transactionController.getTransactionDetail,
    );
    this.router.get(
      `/merchant${this.path}/invoices`,
      AuthApi.required,
      celebrate({ query: TransactionIdSchema }, { allowUnknown: true }),
      this.transactionController.getTransactionInvoices,
    );
    this.router.get(
      `/merchant${this.path}/getTransactionPdf`,
      AuthApi.required,
      celebrate({ query: CustomDirectoryIdentifierSchema }, { allowUnknown: true }),
      this.transactionController.getReceiptHtmlByDirectoryIdentifier,
    );
    this.router.get(
      `/merchant${this.path}/getTransactionDetails`,
      AuthApi.required,
      celebrate({ query: CustomDirectoryIdentifierSchema }, { allowUnknown: true }),
      this.transactionController.getTxStatusCustomDirectoryIdentifier,
    );
  }
}

export default TransactionRoute;
