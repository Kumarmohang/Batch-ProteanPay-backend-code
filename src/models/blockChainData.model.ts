import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { BlockChainData } from '../interfaces/blockChainData.interface';
import uuid from 'uuid/v4';

export type BlockChainDataCreationAttribuites = Optional<BlockChainData, 'id' | 'name' | 'symbol' | 'logoUrl' | 'chainId'>;

/**
 * block chain data model class
 */
export class BlockChainDataModel extends Model<BlockChainData, BlockChainDataCreationAttribuites> implements BlockChainData {
  public id: number;
  public name: string;
  public symbol: string;
  public logoUrl: string;
  public chainId: string;

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
export default function createBlockChainData(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof BlockChainDataModel {
  BlockChainDataModel.init(
    {
      id: {
        primaryKey: true,
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: dataTypes.STRING,
      },
      type: {
        type: dataTypes.STRING,
      },
      symbol: {
        type: dataTypes.STRING,
      },
      logoUrl: {
        field: 'logo_url',
        type: dataTypes.STRING,
      },
      chainId: {
        field: 'chain_id',
        type: dataTypes.UUID,
        allowNull: false,
      },
    } as any,
    {
      sequelize,
      modelName: 'blockchain_data',
    },
  );
  BlockChainDataModel.beforeCreate(invoice => (invoice.id = uuid()));
  return BlockChainDataModel;
}
