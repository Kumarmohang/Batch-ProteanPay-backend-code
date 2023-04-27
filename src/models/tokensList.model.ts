import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import uuid from 'uuid/v4';
import { TokensList } from '../interfaces/tokenList.interface';

export type TokenListDataCreationAttribuites = Optional<TokensList, 'id' | 'name' | 'blockChainId' | 'symbol' | 'logoUrl' | 'contactAddress'>;

/**
 * block chain data model class
 */
export class TokensListModel extends Model<TokensList, TokenListDataCreationAttribuites> implements TokensList {
  public id: number;
  public name: string;
  public blockChainId: string;
  public symbol: string;
  public logoUrl: string;
  public contactAddress: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  /**
   * This method defines all associations related to this model
   *
   * @param models contains all models
   * @returns nothing
   */
  static associate(models) {
    TokensListModel.belongsTo(models.tokens_list, {
      foreignKey: 'blockchain_id',
      targetKey: 'id',
    });
    models.blockchain_data.hasOne(TokensListModel, {
      foreignKey: 'blockchain_id',
      sourceKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize project model
 *
 * @param sequelize sequelize
 * @param dataTypes as data types
 * @returns InvoiceModel
 */
export default function createTokenList(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof TokensListModel {
  TokensListModel.init(
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
      blockChainId: {
        field: 'blockchain_id',
        type: DataTypes.UUID,
        allowNull: false,
      },
      symbol: {
        type: dataTypes.STRING,
      },
      logoUrl: {
        field: 'logo_url',
        type: dataTypes.STRING,
      },
      contactAddress: {
        field: 'contact_address',
        type: dataTypes.STRING,
      },
    } as any,
    {
      sequelize,
      modelName: 'tokens_list',
    },
  );
  TokensListModel.beforeCreate(invoice => (invoice.id = uuid()));
  return TokensListModel;
}
