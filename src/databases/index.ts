import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, DB_ENGINE } from '@config';
import { logger } from '@utils/logger';
import createUserModel from '@/models/users.model';
import createInvoiceDirectoryModel from '@/models/invoiceDirectory.model';
import createInvoiceModel from '@/models/invoice.model';
import createRolesModel from '../models/roles.model';
import createPermissionsModel from '../models/permissions.model';
import createUserRole from '../models/userRole.model';
import createRolePermission from '../models/rolePermission.model';
import createInvoiceItemModel from '../models/invoiceItem.model';
import createBlockChainData from '../models/blockChainData.model';
import createTokenList from '../models/tokensList.model';
import createTransactionModel from '@/models/transaction.model';
import createTransactionInvoiceMappingModel from '@/models/transactionInvoiceMapping.model';

const ALL_MODEL_ARRAY: Array<Function> = [
  createUserModel,
  createRolesModel,
  createPermissionsModel,
  createUserRole,
  createRolePermission,
  createInvoiceDirectoryModel,
  createInvoiceModel,
  createInvoiceItemModel,
  createBlockChainData,
  createTokenList,
  createTransactionModel,
  createTransactionInvoiceMappingModel,
];
const DB: any = {};
const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: DB_ENGINE as Sequelize.Dialect,
  host: DB_HOST,
  quoteIdentifiers: false,
  port: Number.parseInt(DB_PORT, 10),
  timezone: '+05:30',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

/**
 * This function Add Models inside sequelize
 *
 * @returns {void}
 */
function initModels(): void {
  for (let modelCreatFuncIdx = 0, len = ALL_MODEL_ARRAY.length; modelCreatFuncIdx < len; modelCreatFuncIdx += 1) {
    const createdModel = ALL_MODEL_ARRAY[modelCreatFuncIdx](sequelize, Sequelize.DataTypes);
    DB[createdModel.name] = createdModel;
  }

  Object.keys(DB).forEach((modelName: string) => {
    if ('associate' in DB[modelName]) {
      DB[modelName].associate(DB);
    }
  });
}

initModels();

export default DB;
