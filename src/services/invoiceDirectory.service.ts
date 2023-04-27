import { Invoice } from '@/interfaces/invoice.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { InvoiceDirectory, DirectoryRequestData } from '@interfaces/invoiceDirectory.interface';
import { User } from '@interfaces/users.interface';
import { Request } from 'express';
import { Op } from 'sequelize';

/**
 * This is server class for invoice directory controller
 *
 *@class
 */
class InvoiceDirectoryService {
  public invoiceDirectories = DB.invoice_directories;
  public users = DB.users;
  public invoices = DB.invoices;

  /**
   * This function creates a new invoice directory.
   *
   * @function
   * @param req Api request data
   * @returns new created invoice directory details
   */
  public async createInvoiceDirectory(req: Request): Promise<unknown> {
    try {
      const directoryRequestData: DirectoryRequestData = req.body;
      const merchantDetails: User = req.user.dataValues;
      const findDirectory: InvoiceDirectory = await this.invoiceDirectories.findOne({
        where: { customDirectoryIdentifier: directoryRequestData.customDirectoryIdentifier, merchantId: merchantDetails.id },
      });
      if (findDirectory) {
        throw new HttpException(409, `Project with this identifier already exist for this user`);
      }
      const invoiceDirectoryData = {};
      invoiceDirectoryData['merchantId'] = merchantDetails.id;
      invoiceDirectoryData['customDirectoryIdentifier'] = directoryRequestData.customDirectoryIdentifier;
      invoiceDirectoryData['name'] = directoryRequestData.name;
      if (directoryRequestData.startDate) {
        invoiceDirectoryData['startDate'] = new Date(directoryRequestData.startDate);
      }
      if (directoryRequestData.endDate) {
        invoiceDirectoryData['endDate'] = new Date(directoryRequestData.endDate);
      }
      invoiceDirectoryData['isBatchTransactionOnly'] = directoryRequestData.isBatchTransactionOnly;
      const createInvoiceDirectoryData: InvoiceDirectory = await this.invoiceDirectories.create({ ...invoiceDirectoryData });
      delete createInvoiceDirectoryData['dataValues']['merchantId'];
      return createInvoiceDirectoryData;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  /**
   * This function returns invoice directory details.
   *
   * @function
   * @param req Api request data
   * @returns invoice details
   */
  public async getInvoiceDirectoryDetails(req: Request): Promise<unknown> {
    const invoiceDirectoryDetails = [];
    const { offset, limit, search, sort } = req.query;
    let whereClause;
    const order = [];
    let sort_keys;
    if (sort_keys) {
      sort_keys = sort.split(',');
      sort_keys.map(key => {
        const key_string = key.split('_');
        order.push([key_string[0], key_string[1]]);
      });
    }
    if (search && search != '') {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            customDirectoryIdentifier: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }
    const allInvoiceDirectories: InvoiceDirectory[] = await this.invoiceDirectories.findAll({
      attributes: {
        exclude: ['payerId', 'merchantId', 'payer_id', 'merchant_id'],
      },
      where: { ...whereClause, merchant_id: req.user.dataValues.id, status: 'active' },
      offset,
      limit,
      order,
    });
    return this.getInvoiceDiretoryDetails(allInvoiceDirectories, invoiceDirectoryDetails);
  }

  /**
   * This function returns invoice directory details.
   *
   * @function
   * @param req Api request data
   * @returns invoice details
   */
  public async getInvoiceDirectoryDetailsDashboard(req: Request): Promise<unknown> {
    const invoiceDirectoryDetails = [];
    const { offset, limit, search, sort } = req.query;
    let whereClause;
    let userRoleWiseClause;
    const order = [];
    let sort_keys;
    if (sort_keys) {
      sort_keys = sort.split(',');
      sort_keys.map(key => {
        const key_string = key.split('_');
        order.push([key_string[0], key_string[1]]);
      });
    }
    if (search && search != '') {
      whereClause = {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          {
            customDirectoryIdentifier: {
              [Op.iLike]: `%${search}%`,
            },
          },
        ],
      };
    }
    const invoices: Invoice[] = await this.invoices.findAll({
      where: { payerId: req.user.id },
      attributes: ['project_id'],
    });
    const directoryIds = invoices.map(invoice => invoice.project_id);
    if (invoices.length == 0) {
      userRoleWiseClause = { merchant_id: req.user.dataValues.id };
    } else {
      userRoleWiseClause = { id: directoryIds };
    }
    const allInvoiceDirectories: InvoiceDirectory[] = await this.invoiceDirectories.findAll({
      attributes: {
        exclude: ['payerId', 'merchantId', 'payer_id', 'merchant_id'],
      },
      where: { ...whereClause, ...userRoleWiseClause, status: 'active' },
      offset,
      limit,
      order,
    });
    return this.getInvoiceDiretoryDetails(allInvoiceDirectories, invoiceDirectoryDetails);
  }
  /**
   *
   * @param allInvoiceDirectories invoice directories
   * @param invoiceDirectoryDetails all invoices data
   * @returns invoice directory data
   */
  private async getInvoiceDiretoryDetails(allInvoiceDirectories: InvoiceDirectory[], invoiceDirectoryDetails: any[]): Promise<any> {
    for (const allInvoiceDirectory of allInvoiceDirectories) {
      const invoiceCount = await this.invoices.count({ where: { customDirectoryIdentifier: allInvoiceDirectory.customDirectoryIdentifier } });
      const pendingInvoiceCount = await this.invoices.count({
        where: { customDirectoryIdentifier: allInvoiceDirectory.customDirectoryIdentifier, status: 'pending' },
      });
      const paidInvoiceCount = await this.invoices.count({
        where: { customDirectoryIdentifier: allInvoiceDirectory.customDirectoryIdentifier, status: 'paid' },
      });
      const approvedInvoiceCount = await this.invoices.count({
        where: { customDirectoryIdentifier: allInvoiceDirectory.customDirectoryIdentifier, status: 'approved' },
      });
      const invoiceDirectoryDetail = { ...allInvoiceDirectory['dataValues'] };
      invoiceDirectoryDetail['statistics'] = {};
      invoiceDirectoryDetail['statistics']['invoiceCount'] = invoiceCount;
      invoiceDirectoryDetail['statistics']['pendingInvoices'] = pendingInvoiceCount;
      invoiceDirectoryDetail['statistics']['paidInvoices'] = paidInvoiceCount;
      invoiceDirectoryDetail['statistics']['approvedInvoices'] = approvedInvoiceCount;
      invoiceDirectoryDetails.push(invoiceDirectoryDetail);
    }
    return {
      rows: invoiceDirectoryDetails,
      count: invoiceDirectoryDetails.length,
    };
  }

  /**
   * This function returns invoice details by id.
   *
   * @function
   * @param req Api request data
   * @returns invoice details
   */
  public async getInvoiceDirectoryDetailsByCustomIdentifier(req: Request): Promise<unknown> {
    const customDirectoryIdentifier = req.query.customDirectoryIdentifier;
    const invoiceDirectory: InvoiceDirectory = await this.invoiceDirectories.findOne({
      where: {
        customDirectoryIdentifier: customDirectoryIdentifier,
      },
      attributes: {
        exclude: ['payerId', 'merchantId', 'payer_id', 'merchant_id'],
      },
    });
    if (!invoiceDirectory) throw new HttpException(404, "user with this Id doen't exist");
    return invoiceDirectory;
  }

  /**
   * This function returns invoice details by id.
   *
   * @function
   * @param req Api request data
   * @returns invoice details
   */
  public async getInvoiceDirectoryDetailsById(req: Request): Promise<unknown> {
    const { directoryId, customDirectoryIdentifier } = req.query;
    let invoiceDirectory: InvoiceDirectory;
    let totalInvoices;
    if (!customDirectoryIdentifier || (directoryId && customDirectoryIdentifier)) {
      invoiceDirectory = await this.invoiceDirectories.findOne({
        where: {
          id: directoryId,
        },
        attributes: {
          exclude: ['payerId', 'merchantId', 'payer_id', 'merchant_id'],
        },
        include: [
          {
            model: this.users,
            required: false,
            as: 'merchant',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
          },
        ],
      });
      totalInvoices = await this.invoices.count({ where: { project_id: directoryId } });
    }
    if (!directoryId) {
      invoiceDirectory = await this.invoiceDirectories.findOne({
        where: {
          customDirectoryIdentifier: customDirectoryIdentifier,
        },
        attributes: {
          exclude: ['payerId', 'merchantId', 'payer_id', 'merchant_id'],
        },
        include: [
          {
            model: this.users,
            required: false,
            as: 'merchant',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
          },
        ],
      });
      totalInvoices = await this.invoices.count({ where: { customDirectoryIdentifier: customDirectoryIdentifier } });
    }

    if (!invoiceDirectory) throw new HttpException(404, "user with this Id doen't exist");
    if (!totalInvoices) {
      totalInvoices = 0;
    }
    return { ...invoiceDirectory.dataValues, totalInvoices };
  }

  /**
   * This function updates invoice directory details.
   *
   * @function
   * @param req Api request data
   * @returns invoice details
   */
  public async updateInvoiceDirectoryDetailsById(req: Request): Promise<unknown> {
    const invoiceDirectoryId = req.params.id;
    const { status } = req.body;
    const invoiceDirectory = await this.invoiceDirectories.findOne({ where: { id: invoiceDirectoryId } });
    if (!invoiceDirectory) throw new HttpException(404, "user with this Id doen't exist");
    if (status) {
      await this.invoiceDirectories.update(status, { where: { id: invoiceDirectoryId } });
    }
    return this.invoiceDirectories.findOne({ where: { id: invoiceDirectoryId } });
  }
}

export default InvoiceDirectoryService;
