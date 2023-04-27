import DB from '@databases';
import { TransactionRequestData, TransactionBody, TransactionUpdateRequestData } from '@/interfaces/transaction.interface';
import { Request } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@/interfaces/users.interface';
import { Op } from 'sequelize';
import { convert, replaceSelectorReceiptToOriginal } from '@/utils/util';
import { txReceiptTemplate } from '@/utils/txReceiptTemplate';
import generatePdf from '@/utils/generatePdf';
import { TX_RECEIPT_CONFIG } from '@/config';

/**
 * This is server class for payment controller
 *
 *@class
 */
class TransactionService {
  public invoice_directories = DB.invoice_directories;
  public users = DB.users;
  public invoices = DB.invoices;
  public transaction = DB.transaction;
  public transactionInvoiceMapping = DB.transaction_invoice_mapping;
  public blockchainData = DB.blockchain_data;
  public invoiceDirectories = DB.invoice_directories;

  /**
   * This function initiates transaction.
   *
   * @function
   * @param req Api request data
   * @returns created transaction details
   */
  public async initiateTransaction(req: Request): Promise<unknown> {
    const transactionRequestBody: TransactionRequestData = req.body;
    const transactionBody: TransactionBody = {
      callerAddress: transactionRequestBody.payerPublicAddress,
      status: 'initiated',
      txHash: '',
      type: transactionRequestBody.type,
    };
    const invoiceIds = transactionRequestBody.invoiceIds;
    for (const invoiceId of invoiceIds) {
      const invoice = await this.invoices.findOne({ where: { id: invoiceId, status: 'approved' } });
      if (!invoice) throw new HttpException(409, 'Invoice Id incorrect');
    }
    let transaction = await this.transaction.findOne({
      where: { ...transactionBody },
    });
    if (transaction) return transaction;
    transaction = await this.transaction.create({
      ...transactionBody,
    });
    for (const invoiceId of invoiceIds) {
      await this.transactionInvoiceMapping.create({ transaction_id: transaction.id, invoice_id: invoiceId });
    }
    return transaction;
  }

  /**
   * This function initiates transaction.
   *
   * @function
   * @param req Api request data
   * @returns created transaction details
   */
  public async updateTransaction(req: Request): Promise<unknown> {
    const transactionUpdateRequestBody: TransactionUpdateRequestData = req.body;

    const transaction = await this.transaction.findOne({
      where: { id: transactionUpdateRequestBody.txnId },
    });
    if (!transaction) throw new HttpException(409, 'transaction does not exist');
    await this.transaction.update(
      {
        txHash: transactionUpdateRequestBody.txnHash,
        status: transactionUpdateRequestBody.status,
        gasFee: transactionUpdateRequestBody.gasFee,
        blockNo: transactionUpdateRequestBody.blockNo,
      },
      { where: { id: transactionUpdateRequestBody.txnId } },
    );
    return this.transaction.findOne({
      where: { id: transactionUpdateRequestBody.txnId },
    });
  }

  /**
   * This function returns all user releated transaction.
   *
   * @function
   * @param req Api request data
   * @returns created transaction details
   *
   * TODO: Need to refactor all the queries
   */
  public async getAllTransactionsOfUser(req: Request): Promise<Array<unknown>> {
    const user = req.user as User;
    const invoiceList = await this.invoices.findAll({
      where: { [Op.or]: [{ payerId: user.id }, { merchantId: user.id }] },
      attributes: ['id'],
    });
    const invoiceIds = invoiceList.map(invoice => invoice.id);
    const transactionIdList = await this.transactionInvoiceMapping.findAll({
      where: {
        invoiceId: invoiceIds,
      },
      attributes: ['transaction_id'],
    });
    const transactionIds = transactionIdList.map(transaction => transaction.transaction_id);
    return this.transaction.findAndCountAll({
      where: {
        type: 'payment',
        id: transactionIds,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * This function returns all user releated transaction.
   *
   * @function
   * @param req Api request data
   * @returns created transaction details
   *
   * TODO: Need to refactor aal the queries
   */
  public async getTransactionInvoices(req: Request): Promise<Array<unknown>> {
    const { txnId } = req.query;
    //TODO: send 404 when user id is not match with merchent id Or payer id NOSONAR
    const invoiceTransactionMapping = await this.transactionInvoiceMapping.findAll({
      where: {
        transactionId: txnId,
      },
    });

    return this.invoices.findAndCountAll({
      where: {
        id: invoiceTransactionMapping.map(txnInvoiceMapping => txnInvoiceMapping.invoiceId),
      },
    });
  }

  /**
   * This function returns all user releated transaction.
   *
   * @function
   * @param req Api request data
   * @returns created transaction details
   *
   * TODO: Need to refactor all the queries
   */
  public async getTransactionDetails(req: Request): Promise<unknown> {
    const { txnId } = req.query;
    //TODO: send 404 when user id is not match with merchent id Or payer id
    const transaction = await this.transaction.findOne({
      where: {
        id: txnId,
      },
    });
    const invoiceCount = await this.transactionInvoiceMapping.count({ where: { transactionId: txnId } });

    return { transaction, invoiceCount };
  }

  /**
   * This function get all transaction.
   *
   * @function
   * @param req Api request data
   * @returns all invoices details
   */
  public async getReceiptHtmlByTxId(req: Request): Promise<{ pdf: Buffer; fileName: string }> {
    const { txnId } = req.query;
    //TODO: send 404 when user id is not match with merchent id Or payer id

    const transaction = await this.transaction.findOne({
      where: {
        id: txnId,
      },
    });
    if (!transaction) {
      throw new HttpException(409, 'no transaction exist with this id');
    }
    const invoiceTransactionMapping = await this.transactionInvoiceMapping.findAll({
      where: {
        transactionId: txnId,
      },
    });

    const invoiceList = await this.invoices.findAll({
      where: {
        id: invoiceTransactionMapping.map(txnInvoiceMapping => txnInvoiceMapping.invoiceId),
      },
    });
    const customDirectoryIdentifier = invoiceList[0].customDirectoryIdentifier;
    const directory = await this.invoiceDirectories.findOne({ where: { customDirectoryIdentifier: customDirectoryIdentifier } });
    const formattedDate = convert(transaction.dataValues.updatedAt);
    const blockchainData = await this.blockchainData.findOne({ where: { id: invoiceList[0].blockChainId } });
    let invoiceHtml = replaceSelectorReceiptToOriginal(txReceiptTemplate, {
      transaction: {
        ...transaction.dataValues,
        from: invoiceList[0].from,
        payer: invoiceList[0].payer,
        formattedDate: formattedDate,
        blockchainName: blockchainData.name,
        paymentStatus: transaction.dataValues.status == 'complete' ? 'Paid' : 'Failed',
      },
      directory,
      invoiceList,
    });
    invoiceHtml = invoiceHtml.replace(/\n/g, ' ');
    invoiceHtml = invoiceHtml.replace(/\"/g, ' ');
    const fileName = `${txnId}_txReceipt.pdf`;
    const pdf = await generatePdf(invoiceHtml, `${TX_RECEIPT_CONFIG.TX_RECEIPT_PATH}/${txnId}_txReceipt.pdf`);
    return { pdf, fileName: fileName };
  }

  /**
   * This function get all transaction.
   *
   * @function
   * @param req Api request data
   * @returns all invoices details
   */
  public async getReceiptHtmlByCustomDirectoryIdentifier(req: Request): Promise<{ pdf: Buffer; fileName: string }> {
    const { customDirectoryIdentifier } = req.query;
    //TODO: send 404 when user id is not match with merchent id Or payer id

    const directory = await this.invoiceDirectories.findOne({ where: { customDirectoryIdentifier: customDirectoryIdentifier } });
    if (!directory) {
      throw new HttpException(409, 'no directory exist with this identifier');
    }
    const invoiceList = await this.invoices.findAll({
      where: {
        customDirectoryIdentifier: customDirectoryIdentifier,
      },
    });
    const invoiceTransactionMapping = await this.transactionInvoiceMapping.findAll({
      where: {
        invoiceId: invoiceList.map(invoice => invoice.id),
      },
    });
    const transaction = await this.transaction.findOne({
      where: {
        id: invoiceTransactionMapping.map(txnInvoiceMapping => txnInvoiceMapping.transactionId),
        status: 'complete',
        type: 'payment',
      },
      order: [['createdAt', 'DESC']],
    });
    const formattedDate = convert(transaction.dataValues.updatedAt);
    const blockchainData = await this.blockchainData.findOne({ where: { id: invoiceList[0].blockChainId } });
    const fromAddr = `<p>Grabenstrasse 25</p><p>6340 Baar</p><p>Switzerland</p><p>Phone Enter phone no.</p><p>support@amrit.ai | www.amrit.ai</p>`;
    let invoiceHtml = replaceSelectorReceiptToOriginal(txReceiptTemplate, {
      transaction: {
        ...transaction.dataValues,
        from: fromAddr,
        payer: invoiceList[0].payer,
        formattedDate: formattedDate,
        blockchainName: blockchainData.name,
        paymentStatus: transaction.dataValues.status == 'complete' ? 'Paid' : 'Failed',
      },
      invoiceList,
      directory,
    });
    invoiceHtml = invoiceHtml.replace(/\n/g, ' ');
    invoiceHtml = invoiceHtml.replace(/\"/g, ' ');
    const fileName = `${transaction.dataValues.id}_txReceipt.pdf`;
    const pdf = await generatePdf(invoiceHtml, `${TX_RECEIPT_CONFIG.TX_RECEIPT_PATH}/${transaction.dataValues.id}_txReceipt.pdf`);
    return { pdf, fileName: fileName };
  }

  /**
   * This function get transaction details.
   *
   * @function
   * @param req Api request data
   * @returns all invoices details
   */
  public async getTxStatusCustomDirectoryIdentifier(req: Request): Promise<any> {
    const { customDirectoryIdentifier } = req.query;

    const directory = await this.invoiceDirectories.findOne({ where: { customDirectoryIdentifier: customDirectoryIdentifier } });
    if (!directory) {
      throw new HttpException(409, 'no directory exist with this identifier');
    }
    const invoiceList = await this.invoices.findAll({
      where: {
        customDirectoryIdentifier: customDirectoryIdentifier,
      },
    });
    const invoiceTransactionMapping = await this.transactionInvoiceMapping.findAll({
      where: {
        invoiceId: invoiceList.map(invoice => invoice.id),
      },
    });
    const transaction = await this.transaction.findOne({
      where: {
        id: invoiceTransactionMapping.map(txnInvoiceMapping => txnInvoiceMapping.transactionId),
        type: 'payment',
      },
      order: [['createdAt', 'DESC']],
    });
    if (!transaction) {
      throw new HttpException(409, 'no transaction exist for this directory');
    }
    return {
      transaction: {
        ...transaction.dataValues,
        payer: invoiceList[0].payer,
      },
    };
  }
}

export default TransactionService;
