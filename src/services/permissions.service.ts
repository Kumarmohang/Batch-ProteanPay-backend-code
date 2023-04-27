import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { Permissions } from '@interfaces/permissions.interface';
import { isEmpty } from '@utils/util';

/**
 * This is server class for permission controller
 *
 *@class
 */
class PermissionsService {
  public permissions = DB.permissions;

  /**
   * This function return user list
   *
   * @param permissionData its user entered role data
   * @function
   * @returns  Return registered role data
   */
  public async createPermission(permissionData: Permissions): Promise<Permissions> {
    if (isEmpty(permissionData)) throw new HttpException(400, 'permission data is empty');
    const findRole = await this.permissions.findOne({ where: { name: permissionData.name } });
    if (findRole) throw new HttpException(409, `This role ${permissionData.name} already exists`);
    return this.permissions.create(permissionData);
  }
}

export default PermissionsService;
