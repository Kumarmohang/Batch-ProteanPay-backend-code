import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { Roles } from '@interfaces/roles.interface';
import { isEmpty } from '@utils/util';
import { RolePermission } from '@interfaces/rolePermission.interface';
import { Permissions } from '@interfaces/permissions.interface';

/**
 * This is server class for userRole controller
 *
 *@class
 */
class RolePermissionService {
  public roles = DB.roles;
  public permissions = DB.permissions;
  public rolePermission = DB.rolePermission;
  /**
   * This function return user list
   *
   * @param rolePermissionData its user entered permission data
   * @function
   * @returns  Return registered role data
   */
  public async createRolePermission(rolePermissionData: RolePermission): Promise<RolePermission> {
    if (isEmpty(rolePermissionData)) throw new HttpException(400, 'role permission data is empty');
    const role: Roles = await this.roles.findByPk(rolePermissionData.roleId);
    if (!role) throw new HttpException(409, `role doesn't exist with this roleId ${rolePermissionData.roleId}`);
    const permission: Permissions = await this.permissions.findByPk(rolePermissionData.permissionId);
    console.log(permission, 'from permissions');
    if (!permission) throw new HttpException(409, `permission doesn't exist with this permissionId ${rolePermissionData.permissionId}`);

    return this.rolePermission.create(rolePermissionData);
  }
}

export default RolePermissionService;
