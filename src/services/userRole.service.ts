import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { UserRole } from '@interfaces/userRole.interface';
import { isEmpty } from '@utils/util';
import { User } from '@interfaces/users.interface';
import { Roles } from '@interfaces/roles.interface';

/**
 * This is server class for userRole controller
 *
 *@class
 */
class UserRoleService {
  public userRole = DB.userRole;
  public users = DB.users;
  public roles = DB.roles;

  /**
   * This function return user list
   *
   * @param userRoleData its user entered role data
   * @function
   * @returns  Return registered role data
   */
  public async createUserRole(userRoleData: UserRole): Promise<UserRole> {
    if (isEmpty(userRoleData)) throw new HttpException(400, 'role data is empty');
    const user: User = await this.users.findByPk(userRoleData.userId);
    if (!user) throw new HttpException(409, `user doesn't exist with this userId ${userRoleData.userId}`);
    const role: Roles = await this.roles.findByPk(userRoleData.roleId);
    if (!role) throw new HttpException(409, `role doesn't exist with this roleId ${userRoleData.userId}`);

    const createUserRole: UserRole = await this.userRole.create(userRoleData);
    return createUserRole;
  }
}

export default UserRoleService;
