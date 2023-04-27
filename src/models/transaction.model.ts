/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import uuid from 'uuid/v4';
import { TransactionDirectory } from '@/interfaces/transaction.interface';

export type TransactionCreationAttributes = Optional<TransactionDirectory, 'id' | 'status' | 'txHash' | 'callerAddress'>;
/**
 * PRoject model class
 */
export class TransactionModel extends Model<TransactionDirectory, TransactionCreationAttributes> implements TransactionDirectory {
  public type: 'approval' | 'payment';
  public id: string;
  public status: 'initiated' | 'complete' | 'failed' | 'pending';
  public txHash: string;
  public callerAddress: string;
  public gasFee: number;
  public blockNo: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes
 * @returns InvoiceDirectoryModel
 */
export default function createTransactionModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof TransactionModel {
  TransactionModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: dataTypes.UUID,
      },
      status: {
        type: dataTypes.ENUM('initiated', 'complete', 'failed', 'pending'),
      },
      txHash: {
        type: dataTypes.STRING,
      },
      callerAddress: {
        field: 'caller_address',
        type: dataTypes.STRING,
      },
      type: {
        type: dataTypes.ENUM('approval', 'payment'),
      },
      gasFee: {
        field: 'gas_fee',
        type: dataTypes.DOUBLE,
      },
      blockNo: {
        field: 'block_no',
        type: dataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'transaction',
    },
  );
  TransactionModel.beforeCreate(transaction => (transaction.id = uuid()));
  return TransactionModel;
}
