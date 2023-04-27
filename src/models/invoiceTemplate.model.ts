import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { InvoiceTemplateData } from '../interfaces/invoiceTemplate.interface';
import uuid from 'uuid/v4';

export type InvoiceTemplateAttributes = Optional<InvoiceTemplateData, 'id' | 'templateName' | 'template'>;

/**
 * invoice template model class
 */
export class InvoiceTemplateDataModel extends Model<InvoiceTemplateData, InvoiceTemplateAttributes> implements InvoiceTemplateData {
  merchantId: string;
  public id: number;
  public templateName: string;
  public template: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes as data types
 * @returns InvoiceModel
 */
export default function createInvoiceTemplate(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof InvoiceTemplateDataModel {
  InvoiceTemplateDataModel.init(
    {
      id: {
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
      },
      templateName: {
        type: dataTypes.STRING,
      },
      template: {
        type: dataTypes.STRING,
      },
    } as any,
    {
      sequelize,
      modelName: 'invoice_template',
    },
  );
  InvoiceTemplateDataModel.beforeCreate(template => (template.id = uuid()));
  return InvoiceTemplateDataModel;
}
