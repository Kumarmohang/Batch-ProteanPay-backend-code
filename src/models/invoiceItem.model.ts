import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { InvoiceItem } from '../interfaces/invoiceItem.interface';
import uuid from 'uuid/v4';

export type InvoiceItemCreationAttribuites = Optional<
  InvoiceItem,
  | 'id'
  | 'projectId'
  | 'invoiceId'
  | 'merchantId'
  | 'description'
  | 'quantity'
  | 'rate'
  | 'taxPercent'
  | 'extraData'
  | 'customInvoiceIdentifier'
  | 'customDirectoryIdentifier'
  | 'amount'
>;

/**
 * InvoiceItem Model class
 */
export class InvoiceItemModel extends Model<InvoiceItem, InvoiceItemCreationAttribuites> implements InvoiceItem {
  public id: string;
  public projectId: string;
  public invoiceId: string;
  public merchantId: string;
  public description: string;
  public quantity: number;
  public rate: number;
  public taxPercent: number;
  public customInvoiceIdentifier: string;
  public customDirectoryIdentifier: string;
  public extraData: string[];
  public amount: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /**
   * This method defines all associations related to this model
   *
   * @param models contains all models
   * @returns nothing
   */
  static associate(models) {
    InvoiceItemModel.belongsTo(models.invoices, {
      foreignKey: 'invoice_id',
      targetKey: 'id',
    });
    models.invoices.hasOne(InvoiceItemModel, {
      foreignKey: 'invoice_id',
      sourceKey: 'id',
    });
    InvoiceItemModel.belongsTo(models.users, {
      foreignKey: 'merchant_id',
      targetKey: 'id',
    });
    models.users.hasOne(InvoiceItemModel, {
      foreignKey: 'merchant_id',
      sourceKey: 'id',
    });
    InvoiceItemModel.belongsTo(models.invoice_directories, {
      foreignKey: 'project_id',
      targetKey: 'id',
    });
    models.invoice_directories.hasOne(InvoiceItemModel, {
      foreignKey: 'project_id',
      sourceKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes type data field
 * @returns InvoiceModel
 */
export default function createInvoiceItemModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof InvoiceItemModel {
  InvoiceItemModel.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      projectId: {
        field: 'project_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      invoiceId: {
        field: 'invoice_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      merchantId: {
        field: 'merchant_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      description: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      rate: {
        type: dataTypes.FLOAT,
        allowNull: false,
      },
      taxPercent: {
        field: 'tax_percent',
        type: dataTypes.FLOAT,
        allowNull: false,
      },
      customInvoiceIdentifier: {
        field: 'custom_invoice_identifier',
        type: dataTypes.STRING,
      },
      customDirectoryIdentifier: {
        field: 'custom_directory_identifier',
        type: dataTypes.STRING,
      },
      extraData: {
        type: dataTypes.ARRAY(dataTypes.JSON),
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: dataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: dataTypes.DATE,
      },
      amount: {
        type: dataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'invoice_items',
    },
  );
  InvoiceItemModel.beforeCreate(invoice => (invoice.id = uuid()));
  return InvoiceItemModel;
}
