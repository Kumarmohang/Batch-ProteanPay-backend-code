/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { Invoice } from '@interfaces/invoice.interface';
import uuid from 'uuid/v4';

export type InvoiceCreationAttributes = Optional<
  Invoice,
  | 'id'
  | 'customInvoiceIdentifier'
  | 'creationDate'
  | 'from'
  | 'to'
  | 'tags'
  | 'memo'
  | 'extraData'
  | 'tokenSymbol'
  | 'destinationPublicAddress'
  | 'taxPercent'
  | 'taxAmount'
  | 'discountPercent'
  | 'discountAmount'
  | 'totalAmount'
>;
/**
 * Invoice model class
 */
export class InvoiceModel extends Model<Invoice, InvoiceCreationAttributes> implements Invoice {
  projectId: string;
  merchantId: string;
  public id: string;
  public customDirectoryIdentifier: string;
  public customInvoiceIdentifier: string;
  public creationDate: string;
  public from: string;
  public to: string;
  public tags: string[];
  public memo: string;
  public extraData: string[];
  public payer: { email: string; payerText: string };
  public tokenSymbol: string;
  public tokenName: string;
  public tokenId: string;
  public blockChainId: string;
  public finalPaymentAmonut: string;
  public finalPaymentCurrency: string;
  public allowedPaymentCurrency: string;
  public status: string;
  public isDeleted: boolean;
  public transactionId: string;
  public destinationPublicAddress: string;
  public taxPercent: number;
  public taxAmount: number;
  public discountPercent: number;
  public discountAmount: number;
  public totalAmount: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /**
   * This method defines all associations related to this model
   *
   * @param models contains all models
   * @returns nothing
   */
  static associate(models) {
    InvoiceModel.belongsTo(models.invoice_directories, {
      foreignKey: 'project_id',
      targetKey: 'id',
    });
    models.invoice_directories.hasOne(InvoiceModel, {
      foreignKey: 'project_id',
      sourceKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns InvoiceModel
 */
export default function createInvoiceModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof InvoiceModel {
  InvoiceModel.init(
    {
      id: {
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
      },
      customDirectoryIdentifier: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      customInvoiceIdentifier: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      projectId: {
        field: 'project_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      merchantId: {
        field: 'merchant_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      creationDate: {
        field: 'creation_date',
        type: dataTypes.DATE,
        allowNull: false,
      },
      from: {
        type: dataTypes.TEXT,
        allowNull: false,
      },
      to: {
        type: dataTypes.TEXT,
      },
      tags: {
        type: dataTypes.ARRAY(dataTypes.TEXT),
      },
      memo: {
        type: dataTypes.TEXT,
      },
      extraData: {
        field: 'extra_data',
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
      tokenSymbol: {
        field: 'token_symbol',
        allowNull: false,
        type: dataTypes.STRING,
      },
      tokenName: {
        field: 'token_name',
        type: dataTypes.STRING,
        allowNull: false,
      },
      tokenId: {
        field: 'token_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      blockChainId: {
        field: 'blockchain_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      finalPaymentAmonut: {
        field: 'final_payment_amount',
        type: dataTypes.INTEGER,
      },
      finalPaymentCurrency: {
        field: 'final_payment_currency',
        type: dataTypes.STRING,
      },
      allowedPaymentCurrency: {
        field: 'allowed_payment_currency',
        type: dataTypes.STRING,
      },
      status: {
        type: dataTypes.ENUM('pending', 'approved', 'processing', 'paid', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
      },
      isDeleted: {
        field: 'is_deleted',
        type: dataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      destinationPublicAddress: {
        field: 'destination_public_address',
        allowNull: false,
        type: dataTypes.STRING,
      },
      payer: {
        allowNull: false,
        type: dataTypes.JSON,
      },
      payerId: {
        field: 'payer_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
      taxPercent: {
        field: 'tax_percent',
        type: dataTypes.DOUBLE,
      },
      taxAmount: {
        field: 'tax_amount',
        type: dataTypes.DOUBLE,
      },
      discountPercent: {
        field: 'discount_percent',
        type: dataTypes.DOUBLE,
      },
      discountAmount: {
        field: 'discount_amount',
        type: dataTypes.DOUBLE,
      },
      totalAmount: {
        field: 'total_amount',
        type: dataTypes.DOUBLE,
      },
    },
    {
      sequelize,
      modelName: 'invoices',
    },
  );
  InvoiceModel.beforeCreate(invoice => (invoice.id = uuid()));
  return InvoiceModel;
}
