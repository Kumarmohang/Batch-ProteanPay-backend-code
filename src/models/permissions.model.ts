import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Permissions } from '@interfaces/permissions.interface';

export type PermissionCreationAttribuites = Optional<Permissions, 'id' | 'name' | 'description'>;
/**
 * List of roles class
 *
 * @class
 */
export class PermissionsModel extends Model<Permissions, PermissionCreationAttribuites> implements Permissions {
  public id: number;
  public name: string;
  public description: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * This method defines all the associations with current model
   *
   * @param models as object
   * @function
   * @params  {models} contains all the models in models Object
   * @returns nothing
   */
  static associate(models) {
    this.hasOne(models.rolePermission, {
      foreignKey: 'permission_id',
      sourceKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize Roles model
 *
 * @param sequelize sequelize
 * @param dataTypes type data field
 * @returns RolesModel
 */
export default function createPermissionsModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof PermissionsModel {
  PermissionsModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        allowNull: false,
        type: dataTypes.STRING(45),
        unique: true,
      },
      description: {
        type: dataTypes.STRING(255),
      },
    },
    {
      tableName: 'permissions',
      modelName: 'permissions',
      sequelize,
    },
  );
  return PermissionsModel;
}
