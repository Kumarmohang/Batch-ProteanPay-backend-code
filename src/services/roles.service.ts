import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { Roles } from '@interfaces/roles.interface';
import { isEmpty } from '@utils/util';

/**
 * This is server class for role controller
 *
 *@class
 */
class RolesService {
  public roles = DB.roles;

  /**
   * This function return user list
   *
   * @param roleData its user entered role data
   * @function
   * @returns  Return registered role data
   */
  public async createRole(roleData: Roles): Promise<Roles> {
    if (isEmpty(roleData)) throw new HttpException(400, 'role data is empty');
    const findRole = await this.roles.findOne({ where: { name: roleData.name } });
    if (findRole) throw new HttpException(409, `This role ${roleData.name} already exists`);
    return this.roles.create(roleData);
  }
}

export default RolesService;
