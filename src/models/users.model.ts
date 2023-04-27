/* eslint-disable valid-jsdoc */
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password' | 'api_key'>;

/**
 * User model class
 *
 * @class
 */
export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public is_verified: boolean;
  public api_key: string;
  public id: number;
  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public status: string;
  public org_name: string;
  public address: string;
  public fee: number;
  public upper_cap_ammount: number;
  public upper_cap_unit: string;
  public redirect_url: string;
  public hook: string;

  /**
   * This method defines all the associations with current model
   *
   * @param models as object
   * @function
   * @params  {models} contains all the models in models Object
   * @returns {void} nothing
   */
  static associate(models) {
    this.hasOne(models.userRole, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize user model
 *
 * @param sequelize sequelize
 * @param dataTypes type data field contains
 * @returns UserModel
 */
export default function createUserModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof UserModel {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        allowNull: false,
        type: dataTypes.STRING(45),
      },
      password: {
        type: dataTypes.STRING(255),
      },
      firstname: {
        type: dataTypes.STRING(45),
      },
      lastname: {
        type: dataTypes.STRING(45),
      },
      status: {
        allowNull: false,
        type: dataTypes.STRING(45),
        defaultValue: 'active',
      },
      org_name: {
        type: dataTypes.STRING(100),
      },
      address: {
        type: dataTypes.TEXT,
      },
      fee: {
        type: dataTypes.INTEGER,
      },
      upper_cap_ammount: {
        type: dataTypes.INTEGER,
      },
      upper_cap_unit: {
        type: dataTypes.STRING,
      },
      api_key: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      redirect_url: {
        type: dataTypes.TEXT,
      },
      hook: {
        type: dataTypes.TEXT,
      },
      created_at: {
        type: dataTypes.DATE,
      },
      updated_at: {
        type: dataTypes.DATE,
      },
    } as any,
    {
      tableName: 'users',
      modelName: 'users',
      sequelize,
    },
  );
  return UserModel;
}
