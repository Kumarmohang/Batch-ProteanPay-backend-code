import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserRole } from '../interfaces/userRole.interface';

export type UserRoleCreationAttribuites = Optional<UserRole, 'id'>;
/**
 * List of roles class
 *
 * @class
 */
export class UserRoleModel extends Model<UserRole, UserRoleCreationAttribuites> implements UserRole {
  public id: number;
  public userId: number;
  public roleId: number;

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
    this.belongsTo(models.users, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
    this.belongsTo(models.roles, {
      foreignKey: 'role_id',
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
export default function createUserRole(sequelize: Sequelize): typeof UserRoleModel {
  UserRoleModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: 'user_role',
      modelName: 'userRole',
      sequelize,
    },
  );

  return UserRoleModel;
}
