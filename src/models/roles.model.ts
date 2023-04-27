import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Roles } from '@interfaces/roles.interface';

export type RoleCreationAttribuites = Optional<Roles, 'id' | 'name' | 'description'>;
/**
 * List of roles class
 *
 * @class
 */
export class RolesModel extends Model<Roles, RoleCreationAttribuites> implements Roles {
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
    this.hasOne(models.userRole, {
      foreignKey: 'role_id',
      sourceKey: 'id',
    });
    this.hasOne(models.rolePermission, {
      foreignKey: 'role_id',
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
export default function createRolesModel(sequelize: Sequelize, dataTypes: typeof DataTypes): typeof RolesModel {
  RolesModel.init(
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
      tableName: 'roles',
      modelName: 'roles',
      sequelize,
    },
  );

  return RolesModel;
}
