/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { TransactionInvoiceMappingDirectory } from '@/interfaces/transaction.interface';
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import uuid from 'uuid/v4';

export type InvoiceDirectoryCreationAttributes = Optional<TransactionInvoiceMappingDirectory, 'id' | 'invoiceId' | 'transactionId'>;
/**
 * PRoject model class
 */
export class TransactionInvoiceMappingModel
  extends Model<TransactionInvoiceMappingDirectory, InvoiceDirectoryCreationAttributes>
  implements TransactionInvoiceMappingDirectory
{
  public id: string;
  public transactionId: string;
  public invoiceId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    TransactionInvoiceMappingModel.belongsTo(models.transaction, {
      foreignKey: 'transaction_id',
      targetKey: 'id',
      as: 'transaction',
    });
    models.transaction.hasOne(TransactionInvoiceMappingModel, {
      foreignKey: 'transaction_id',
      sourceKey: 'id',
    });
    TransactionInvoiceMappingModel.belongsTo(models.invoices, {
      foreignKey: 'invoice_id',
      targetKey: 'id',
      as: 'invoices',
    });
    models.invoices.hasOne(TransactionInvoiceMappingModel, {
      foreignKey: 'invoice_id',
      targetKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns InvoiceDirectoryModel
 */
export default function createTransactionInvoiceMappingModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes,
): typeof TransactionInvoiceMappingModel {
  TransactionInvoiceMappingModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.UUID,
      },
      transactionId: {
        type: dataTypes.STRING,
      },
      invoiceId: {
        type: dataTypes.STRING,
      },
    } as any,
    {
      sequelize,
      modelName: 'transaction_invoice_mapping',
    },
  );
  TransactionInvoiceMappingModel.beforeCreate(transactionMapping => (transactionMapping.id = uuid()));
  return TransactionInvoiceMappingModel;
}
