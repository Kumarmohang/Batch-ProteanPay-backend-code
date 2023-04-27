/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { InvoiceDirectory } from '@interfaces/invoiceDirectory.interface';
import uuid from 'uuid/v4';

export type InvoiceDirectoryCreationAttributes = Optional<InvoiceDirectory, 'id' | 'name' | 'customDirectoryIdentifier' | 'merchantId'>;
/**
 * PRoject model class
 */
export class InvoiceDirectoryModel extends Model<InvoiceDirectory, InvoiceDirectoryCreationAttributes> implements InvoiceDirectory {
  public id: string;
  public name: string;
  public customDirectoryIdentifier: string;
  public merchantId: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models) {
    InvoiceDirectoryModel.belongsTo(models.users, {
      foreignKey: 'merchant_id',
      targetKey: 'id',
      as: 'merchant',
    });
    models.users.hasOne(InvoiceDirectoryModel, {
      foreignKey: 'merchant_id',
      sourceKey: 'id',
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
export default function createInvoiceDirectoryModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof InvoiceDirectoryModel {
  InvoiceDirectoryModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.UUID,
      },
      name: {
        type: dataTypes.STRING,
      },
      customDirectoryIdentifier: {
        type: dataTypes.STRING,
      },
      merchantId: {
        type: dataTypes.UUID,
      },
      startDate: {
        type: dataTypes.DATE,
        defaultValue: dataTypes.NOW,
      },
      endDate: {
        type: dataTypes.DATE,
      },
      status: {
        type: dataTypes.STRING,
      },
      isBatchTransactionOnly: {
        type: dataTypes.BOOLEAN,
      },
    } as any,
    {
      sequelize,
      modelName: 'invoice_directories',
    },
  );
  InvoiceDirectoryModel.beforeCreate(invoiceDirectory => (invoiceDirectory.id = uuid()));
  return InvoiceDirectoryModel;
}
