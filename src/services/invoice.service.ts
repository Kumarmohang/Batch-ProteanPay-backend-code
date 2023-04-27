import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { convert, isEmpty, replaceSelectorToOriginal } from '@utils/util';
import { Invoice } from '@interfaces/invoice.interface';
import { Request } from 'express';
import { Op } from 'sequelize';
import moment from 'moment';
import { template } from '@utils/template';
import generatePdf from '@utils/generatePdf';
import { PDF_CONFIG } from '@config';
import { ethers } from 'ethers';

/**
 * This is server class for invoice service
 *
 *@class
 */
class InvoiceService {
  public users = DB.users;
  public invoice_directories = DB.invoice_directories;
  public invoices = DB.invoices;
  public invoiceItem = DB.invoice_items;
  public tokenList = DB.tokens_list;

  /**
   * This function creates a new invoice directory.
   *
   * @function
   * @param req Api request data
   * @returns new created invoice directory details
   */
  public async createInvoice(req: Request): Promise<void> {
    const invoiceRequestData = req.body;

    if (isEmpty(invoiceRequestData)) throw new HttpException(400, 'invoice directory data empty');

    const api_key = req.headers['x-api-key'];
    const { invoiceItems, customDirectoryIdentifier, destinationPublicAddress, ...invoice } = invoiceRequestData;
    const { tokenSymbol } = invoice;
    const user = await this.users.findOne({ where: { api_key } });

    if (!user) throw new HttpException(400, 'incorrect api_key authentication');
    if (!ethers.utils.isAddress(destinationPublicAddress)) {
      throw new HttpException(400, 'Invalid destination public address');
    }
    const { id: userId } = user;
    let payerUser = await this.users.findOne({ where: { email: invoice.payer.email } });
    if (!payerUser) {
      payerUser = await this.users.create({ email: invoice.payer.email, password: invoice.payer.email });
    }
    const invoices: Invoice = await this.invoices.findOne({
      where: {
        customInvoiceIdentifier: invoice.customInvoiceIdentifier,
      },
    });
    if (invoices) {
      throw new HttpException(409, `Invoice already exist for this directory`);
    }
    const directory = await this.invoice_directories.findOne({ where: { customDirectoryIdentifier } });
    if (!directory) throw new HttpException(400, 'no directory exist with this identifier');
    const { id: directoryId } = directory;

    const token = await this.tokenList.findOne({ where: { symbol: tokenSymbol } });

    if (!token) throw new HttpException(400, 'no token exist with this token Symbol.');

    const { id: tokenId, name, blockchain_id } = token;
    const createdInvoice = await this.invoices.create({
      ...invoice,
      destinationPublicAddress,
      customDirectoryIdentifier,
      projectId: directoryId,
      merchantId: userId,
      tokenName: name,
      tokenId: tokenId,
      blockChainId: blockchain_id,
      payerId: payerUser.id,
    });
    const { id, projectId, merchantId } = createdInvoice;
    const invoieItemsList = [];
    if (createdInvoice) {
      for (let i = 0, len = invoiceItems.length; i < len; i++) {
        const invoiceItem = await this.invoiceItem.create({
          ...invoiceItems[i],
          customInvoiceIdentifier: invoice['customInvoiceIdentifier'],
          invoiceId: id,
          projectId,
          merchantId,
        });
        invoieItemsList.push(invoiceItem);
      }
    }
    return { ...createdInvoice.dataValues, invoiceItems: invoieItemsList };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param req Api request data
   * @returns all invoices details
   */
  public async getAllInvoices(req): Promise<Invoice[]> {
    const api_key = req.headers['x-api-key'];
    const user = await this.users.findOne({ where: { api_key } });
    const { customDirectoryIdentifier, search, status, limit, offset } = req.query;
    const { dateFrom, dateTo } = req.query;
    const dateFilterClause = this.getDateFilterClause(dateFrom, dateTo);

    let searchClause;
    if (search && search != '') {
      searchClause = {
        customInvoiceIdentifier: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }
    let statusClause;
    if (status && status != '') {
      statusClause = {
        status: status,
      };
    }
    let identifierClause;
    if (customDirectoryIdentifier && customDirectoryIdentifier != '') {
      identifierClause = {
        customDirectoryIdentifier: customDirectoryIdentifier,
      };
    }
    const allInvoices: Invoice[] = await this.invoices.findAll({
      where: { merchantId: user.id, ...identifierClause, ...statusClause, ...searchClause, ...dateFilterClause },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    if (!allInvoices) {
      throw new HttpException(404, 'No invoice exists with this customDirectoryIdentifier and status');
    }
    return {
      rows: allInvoices,
      count: allInvoices.length,
    };
  }

  /**
   *
   * @param dateFrom start date
   * @param dateTo end date
   * @returns date filter clause for query
   */
  private getDateFilterClause(dateFrom: any, dateTo: any) {
    if (dateFrom) {
      dateFrom = moment(dateFrom, 'DD-MM-YYYY').format('MM-DD-YYYY');
    }
    if (dateTo) {
      dateTo = moment(dateTo, 'DD-MM-YYYY').add(1, 'days').format('MM-DD-YYYY');
    }
    let dateFilterClause: any;
    if (dateFrom && dateFrom != '' && dateTo && dateTo != '') {
      dateFilterClause = {
        creation_date: {
          [Op.between]: [new Date(dateFrom), new Date(dateTo)],
        },
      };
    } else {
      if (dateFrom && dateFrom != '') {
        dateFilterClause = {
          creation_date: {
            [Op.gte]: new Date(dateFrom),
          },
        };
      } else {
        if (dateTo && dateTo != '') {
          dateFilterClause = {
            creation_date: {
              [Op.lt]: new Date(dateTo),
            },
          };
        }
      }
    }
    return dateFilterClause;
  }

  /**
   * This function invoice By Id or Identifier.
   *
   * @function
   * @param invoiceId as query params
   * @returns all invoices details
   */
  public async getInvoiceById(invoiceId: string): Promise<Invoice> {
    if (isEmpty(invoiceId)) throw new HttpException(400, 'InvoiceId is Empty !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { id: invoiceId },
      attributes: [
        'id',
        'customDirectoryIdentifier',
        'customInvoiceIdentifier',
        'creationDate',
        'to',
        'tags',
        'memo',
        'extraData',
        'payer',
        'tokenSymbol',
        'destinationPublicAddress',
      ],
    });

    if (!invoice) {
      throw new HttpException(404, "Invoice doesn't Exist with this Id");
    }
    return invoice;
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param customInvoiceIdentifier as query data
   * @param req Api request data
   * @returns all invoices details
   */
  public async getInvoiceByIdentifier(customInvoiceIdentifier: string): Promise<Invoice> {
    if (isEmpty(customInvoiceIdentifier)) throw new HttpException(400, 'customInvoiceIdentifier is Empty !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifier },
      attributes: [
        'id',
        'customDirectoryIdentifier',
        'customInvoiceIdentifier',
        'creationDate',
        'to',
        'tags',
        'memo',
        'extraData',
        'payer',
        'tokenSymbol',
        'destinationPublicAddress',
      ],
    });
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    return invoice;
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param invoiceId as query data
   * @returns all invoices details
   */
  public async getStatusById(invoiceId: string): Promise<object> {
    if (isEmpty(invoiceId)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findByPk(invoiceId);
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    const { id, status, customInvoiceIdentifier } = invoice;
    return { id, status, customInvoiceIdentifier };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param customInvoiceIdentifierStr as query data
   * @returns all invoices details
   */
  public async getStatusByIdentifier(customInvoiceIdentifierStr: string): Promise<object> {
    if (isEmpty(customInvoiceIdentifierStr)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
    });
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    const { id, status, customInvoiceIdentifier } = invoice;
    return { id, status, customInvoiceIdentifier };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param invoiceId as query data
   * @returns all invoices details
   */
  public async getHtmlById(invoiceId: string): Promise<object> {
    if (isEmpty(invoiceId)) throw new HttpException(400, 'invoiceId is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { id: invoiceId },
      attributes: [
        'id',
        'customDirectoryIdentifier',
        'customInvoiceIdentifier',
        'creationDate',
        'to',
        'from',
        'tags',
        'memo',
        'extraData',
        'payer',
        'tokenSymbol',
        'destinationPublicAddress',
        'taxPercent',
        'taxAmount',
        'discountPercent',
        'discountAmount',
        'totalAmount',
      ],
    });
    if (!invoice) throw new HttpException(404, "invoiceId doesn't Exist");

    const InvoiceItems = await this.invoiceItem.findAll({
      where: { invoice_id: invoiceId },
      attributes: ['id', 'invoiceId', 'description', 'quantity', 'taxPercent', 'extraData', 'amount'],
    });
    if (!InvoiceItems.length) throw new HttpException(404, 'no invoiceItems found with this invoiceId');
    const extrctedInvoiceItems = [];
    for (let i = 0, len = InvoiceItems.length; i < len; i++) {
      extrctedInvoiceItems.push(InvoiceItems[i].dataValues);
    }
    return {
      invoiceHtml: `<p>lorem ipsum<em>lorem ipsum</em></p>`,
      invoiceDetail: { ...invoice.dataValues, invoiceItems: extrctedInvoiceItems },
    };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param customInvoiceIdentifierStr as query data
   * @returns all invoices details
   */
  public async getHtmlByIdentifier(customInvoiceIdentifierStr: string): Promise<any> {
    if (isEmpty(customInvoiceIdentifierStr)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
      attributes: [
        'id',
        'customDirectoryIdentifier',
        'customInvoiceIdentifier',
        'creationDate',
        'from',
        'to',
        'tags',
        'memo',
        'extraData',
        'payer',
        'tokenSymbol',
        'destinationPublicAddress',
        'taxPercent',
        'taxAmount',
        'discountPercent',
        'discountAmount',
        'totalAmount',
      ],
    });

    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    const InvoiceItems = await this.invoiceItem.findAll({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
      attributes: ['id', 'invoiceId', 'description', 'quantity', 'rate', 'taxPercent', 'extraData', 'amount'],
    });
    if (!InvoiceItems.length) throw new HttpException(404, 'no invoiceItems found with this invoiceId');
    const extractedInvoiceItems = [];
    for (let i = 0, len = InvoiceItems.length; i < len; i++) {
      extractedInvoiceItems.push(InvoiceItems[i].dataValues);
    }

    const directory = await this.invoice_directories.findOne({ where: { customDirectoryIdentifier: invoice.dataValues.customDirectoryIdentifier } });
    if (!directory) throw new HttpException(404, 'no directory found with this Identifier');
    const formattedDate = convert(invoice.dataValues.creationDate);
    let invoiceHtml = replaceSelectorToOriginal(template, {
      invoice: { ...invoice.dataValues, formattedDate, invoiceItems: extractedInvoiceItems },
      directory: { ...directory.dataValues },
    });
    invoiceHtml = invoiceHtml.replace(/\n/g, ' ');
    invoiceHtml = invoiceHtml.replace(/\"/g, ' ');
    return {
      invoiceHtml: invoiceHtml,
      invoiceDetail: { ...invoice.dataValues, invoiceItems: extractedInvoiceItems },
    };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param customInvoiceIdentifierStr as query data
   * @returns all invoices details
   */
  public async getPdfByIdentifier(customInvoiceIdentifierStr: string): Promise<{ pdf: Buffer; fileName: string }> {
    if (isEmpty(customInvoiceIdentifierStr)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
      attributes: [
        'id',
        'customDirectoryIdentifier',
        'customInvoiceIdentifier',
        'creationDate',
        'to',
        'from',
        'tags',
        'memo',
        'extraData',
        'payer',
        'tokenSymbol',
        'destinationPublicAddress',
        'taxPercent',
        'taxAmount',
        'discountPercent',
        'discountAmount',
        'totalAmount',
      ],
    });
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    const InvoiceItems = await this.invoiceItem.findAll({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
      attributes: ['id', 'invoiceId', 'description', 'quantity', 'rate', 'taxPercent', 'extraData', 'amount'],
    });
    if (!InvoiceItems.length) throw new HttpException(404, 'no invoiceItems found with this invoiceId');
    const extractedInvoiceItems = [];
    for (let i = 0, len = InvoiceItems.length; i < len; i++) {
      extractedInvoiceItems.push(InvoiceItems[i].dataValues);
    }

    const directory = await this.invoice_directories.findOne({ where: { customDirectoryIdentifier: invoice.dataValues.customDirectoryIdentifier } });
    if (!directory) throw new HttpException(404, 'no directory found with this Identifier');

    const formattedDate = convert(invoice.dataValues.creationDate);
    console.log(formattedDate, 'formattedDate');
    let invoiceHtml = replaceSelectorToOriginal(template, {
      invoice: { ...invoice.dataValues, formattedDate, invoiceItems: extractedInvoiceItems },
      directory: { ...directory.dataValues },
    });

    invoiceHtml = invoiceHtml.replace(/\n/g, ' ');
    invoiceHtml = invoiceHtml.replace(/\"/g, ' ');
    const fileName = `${invoice.id}_invoice.pdf`;
    const pdf = await generatePdf(invoiceHtml, `${PDF_CONFIG.PDF_STORAGE_PATH}/${invoice.id}_invoice.pdf`);
    return { pdf, fileName: fileName };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param invoiceId as query data
   * @returns all invoices details
   */
  public async getPdfById(invoiceId: string): Promise<{ pdf: Buffer; fileName: string }> {
    if (isEmpty(invoiceId)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { id: invoiceId },
      attributes: [
        'id',
        'customDirectoryIdentifier',
        'customInvoiceIdentifier',
        'creationDate',
        'to',
        'tags',
        'memo',
        'extraData',
        'payer',
        'tokenSymbol',
        'destinationPublicAddress',
        'taxPercent',
        'taxAmount',
        'discountPercent',
        'discountAmount',
        'totalAmount',
      ],
    });
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    const InvoiceItems = await this.invoiceItem.findAll({
      where: { custom_invoice_identifier: invoiceId },
      attributes: ['id', 'invoiceId', 'description', 'quantity', 'rate', 'taxPercent', 'extraData', 'amount'],
    });
    if (!InvoiceItems.length) throw new HttpException(404, 'no invoiceItems found with this invoiceId');
    const extractedInvoiceItems = [];
    for (let i = 0, len = InvoiceItems.length; i < len; i++) {
      extractedInvoiceItems.push(InvoiceItems[i].dataValues);
    }
    let invoiceHtml = replaceSelectorToOriginal(template, { invoice: { ...invoice.dataValues, invoiceItems: extractedInvoiceItems } });
    invoiceHtml = invoiceHtml.replace(/\n/g, ' ');
    invoiceHtml = invoiceHtml.replace(/\"/g, ' ');
    const fileName = `${invoice.id}_invoice.pdf`;
    const pdf = await generatePdf(invoiceHtml, `${PDF_CONFIG.PDF_STORAGE_PATH}/${invoice.id}_invoice.pdf`);
    return { pdf, fileName: fileName };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param invoiceId as query data
   * @param statusBody as status
   * @returns all invoices details
   */
  public async updateInvoiceById(invoiceId: string, statusBody: string): Promise<Invoice> {
    if (isEmpty(invoiceId)) throw new HttpException(400, 'invoiceId is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findByPk(invoiceId);
    if (!invoice) throw new HttpException(404, "invoiceId doesn't Exist with this Id");
    await this.invoices.update({ ...invoice, status: statusBody }, { where: { id: invoiceId } });
    const updatedInvoiceFound: Invoice = await this.invoices.findByPk(invoiceId);

    return updatedInvoiceFound;
  }

  /**
   * This function change status.
   *
   * @function
   * @param customInvoiceIdentifierStr as query data
   * @param statusBody as body string
   * @returns all invoices details
   */
  public async updateInvoiceByIdentifier(customInvoiceIdentifierStr: string, statusBody: string): Promise<Invoice> {
    if (isEmpty(customInvoiceIdentifierStr)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
    });
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    await this.invoices.update({ ...invoice, status: statusBody }, { where: { custom_invoice_identifier: customInvoiceIdentifierStr } });
    return this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
    });
  }

  /**
   * This function change status.
   *
   * @function
   * @param req request body
   * @returns all invoices details
   */
  public async updateAllInvoiceByDirectoryId(req: Request): Promise<string> {
    const directoryId: any = req.query.directoryId;
    const { invoiceIds, status } = req.body;
    let currentStatus;
    if (status == 'approved') {
      currentStatus = 'pending';
    } else {
      currentStatus = 'approved';
    }
    if (isEmpty(directoryId)) throw new HttpException(400, 'directoryId is must be there in query params !');
    const allInvoicesIds: Invoice = await this.invoices.findAll({
      where: {
        projectId: directoryId,
        id: {
          [Op.in]: invoiceIds,
        },
        status: currentStatus,
      },
      attributes: ['id'],
    });
    if (!allInvoicesIds.length) throw new HttpException(404, `No project found with this directory Id having status ${currentStatus}`);
    const pendingInvoiceIds = allInvoicesIds.map(item => {
      return item['id'];
    });

    await this.invoices.update({ status: status }, { where: { id: [...pendingInvoiceIds] } });
    return 'Invoices status updated successfully';
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param customInvoiceIdentifierStr as query data
   * @returns all invoices details
   */
  public async deleteInvoice(customInvoiceIdentifierStr: string): Promise<string> {
    if (isEmpty(customInvoiceIdentifierStr)) throw new HttpException(400, 'customInvoiceIdentifier is Empty define in query params !');
    const invoice: Invoice = await this.invoices.findOne({
      where: { custom_invoice_identifier: customInvoiceIdentifierStr },
    });
    if (!invoice) throw new HttpException(404, "customInvoiceIdentifier doesn't Exist with this Identifier");
    await this.invoices.destroy({ where: { custom_invoice_identifier: customInvoiceIdentifierStr } });
    return `Invoice deleted Successfully !`;
  }

  /**
   * This function creates a new invoice directory.
   *
   * @function
   * @param req Api request data
   * @returns new created invoice directory details
   */
  public async createInvoiceDashboard(req: Request): Promise<void> {
    const invoiceRequestData = req.body;
    const userId = req.user.id;

    if (isEmpty(invoiceRequestData)) throw new HttpException(400, 'invoice directory data empty');

    const { invoiceItems, customDirectoryIdentifier, ...invoice } = invoiceRequestData;
    const { tokenSymbol } = invoice;

    const directoy = await this.invoice_directories.findOne({ where: { customDirectoryIdentifier } });
    if (!directoy) throw new HttpException(400, 'no directory exist with this identifier');
    const { id: directoryId } = directoy;

    const token = await this.tokenList.findOne({ where: { symbol: tokenSymbol } });

    if (!token) throw new HttpException(400, 'no token exist with this identifier');

    const { id: tokenId, name, blockchain_id } = token;

    let totalTokenAmount = 0;
    for (let i = 0, len = invoiceItems.length; i < len; i++) {
      totalTokenAmount += invoiceItems[i].rate;
    }
    const createdInvoice = await this.invoices.create({
      ...invoice,
      customDirectoryIdentifier,
      totalTokenAmount,
      projectId: directoryId,
      merchantId: userId,
      tokenName: name,
      tokenId: tokenId,
      blockChainId: blockchain_id,
    });
    const { id, projectId, merchantId } = createdInvoice;
    const invoieItemsList = [];
    for (const item of invoiceItems) {
      const invoiceItem = await this.invoiceItem.create({
        ...item,
        customInvoiceIdentifier: invoice['customInvoiceIdentifier'],
        invoiceId: id,
        projectId,
        merchantId,
      });
      invoieItemsList.push(invoiceItem);
    }
    return { ...createdInvoice.dataValues, invoiceItems: invoieItemsList };
  }

  /**
   * This function get all invoices.
   *
   * @function
   * @param req Api request data
   * @returns all invoices details
   */
  public async getAllInvoicesDashboard(req): Promise<Invoice[]> {
    const userId = req.user.id;
    const { customDirectoryIdentifier, search, status, limit, offset, directoryId } = req.query;
    const { dateFrom, dateTo } = req.query;
    const dateFilterClause = this.getDateFilterClause(dateFrom, dateTo);

    let searchClause;
    if (search && search != '') {
      searchClause = {
        customInvoiceIdentifier: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }
    let statusClause;
    if (status && status != '') {
      statusClause = {
        status: status,
      };
    }
    let identifierClause;
    if (customDirectoryIdentifier && customDirectoryIdentifier != '') {
      identifierClause = {
        customDirectoryIdentifier: customDirectoryIdentifier,
      };
    }

    let idClause;
    if (directoryId && directoryId != '') {
      idClause = {
        projectId: directoryId,
      };
    }
    const allInvoices: Invoice[] = await this.invoices.findAll({
      where: {
        [Op.or]: [
          { merchantId: userId },
          {
            payerId: userId,
          },
        ],
        ...identifierClause,
        ...statusClause,
        ...searchClause,
        ...dateFilterClause,
        ...idClause,
      },
      limit,
      offset,
    });

    if (!allInvoices) {
      throw new HttpException(404, 'No invoice exists with this customDirectoryIdentifier and status');
    }
    return {
      rows: allInvoices,
      count: allInvoices.length,
    };
  }
}

export default InvoiceService;
