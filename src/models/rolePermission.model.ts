import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { RolePermission } from '../interface/rolePermission.interface';

export type RolePermissionCreationAttribuites = Optional<RolePermission, 'id'>;
/**
 * List of roles class
 *
 * @class
 */
export class RolePermissionModel extends Model<RolePermission, RolePermissionCreationAttribuites> implements RolePermission {
  public id: number;
  public roleId: number;
  public permissionId: number;

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
    this.belongsTo(models.roles, {
      foreignKey: 'role_id',
      targetKey: 'id',
    });
    this.belongsTo(models.permissions, {
      foreignKey: 'permission_id',
      targetKey: 'id',
    });
  }
}

/**
 * Function for creating sequelize user model
 *
 * @param sequelize sequelize
 * @returns UserRoleModel
 */
export default function createRolePermission(sequelize: Sequelize): typeof RolePermission {
  RolePermissionModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'role_permission',
      modelName: 'rolePermission',
      sequelize,
    },
  );

  return RolePermissionModel;
}
