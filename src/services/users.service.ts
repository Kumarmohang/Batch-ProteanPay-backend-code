import { hash } from 'bcrypt';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import uuid from 'uuid/v4';

/**
 * This is server class for user controller
 *
 *@class
 */
class UserService {
  public users = DB.users;

  /**
   * This function return user list
   *
   * @function
   * @returns  Return users list
   */
  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  /**
   * This function returns a user by provided userID
   *
   * @function
   * @param userId userID of a user
   * @returns A user
   * @throws {HttpException}
   */
  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * This function update user by provided id.
   *
   * @function
   * @param userId id of user
   * @returns Updated user
   */
  public async handleGetMe(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'userData is empty');
    const findUser: User = await this.users.findOne({
      where: { id: userId },
      attributes: [
        'email',
        'firstname',
        'lastname',
        'status',
        'org_name',
        'address',
        'fee',
        'upper_cap_ammount',
        'upper_cap_unit',
        'redirect_url',
        'hook',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!findUser) throw new HttpException(409, "User doesn't exist");
    return findUser;
  }
  /**
   * This function update user by provided id.
   *
   * @function
   * @param id ID of the user.
   * @param updateData User data.
   * @returns Updated user
   */
  public async handleUpdateMe(id: string, updateData: object): Promise<User> {
    if (isEmpty(updateData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findByPk(id);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    if (updateData.password) {
      const hashedPassword = await hash(updateData.password, 10);
      await this.users.update(
        { ...updateData, password: hashedPassword },
        {
          where: { id },
        },
      );
    } else {
      await this.users.update(updateData, {
        where: { id },
      });
    }
    const updateUser: User = await this.users.findOne({
      where: { id },
      attributes: [
        'email',
        'firstname',
        'lastname',
        'status',
        'org_name',
        'address',
        'fee',
        'upper_cap_ammount',
        'upper_cap_unit',
        'redirect_url',
        'hook',
        'createdAt',
        'updatedAt',
      ],
    });
    return updateUser;
  }
  /**
   * This function update user by provided id.
   *
   * @function
   * @param userId ID of the user.
   * @param userData User data.
   * @returns Updated user
   */
  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: User = await this.users.findOne({
      where: { id: userId },
      attributes: [
        'email',
        'firstname',
        'lastname',
        'status',
        'org_name',
        'address',
        'fee',
        'upper_cap_ammount',
        'upper_cap_unit',
        'redirect_url',
        'hook',
        'createdAt',
        'updatedAt',
      ],
    });
    console.log(updateUser, 'from users service');
    return updateUser;
  }

  /**
   * This function provide  apiKey.
   *
   * @function
   * @param userId ID of the user.
   * @returns Updated user
   */
  public async handleGetMeApiKey(userId: number): Promise<User> {
    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(400, "User doesn't exist");
    const apiKey: User = await this.users.findOne({ where: { id: userId }, attributes: ['api_key'] });
    return apiKey;
  }

  /**
   * This function update apiKey.
   *
   * @function
   * @param userId ID of the user.
   * @returns Updated user
   */
  public async handleUpdateMeApiKey(userId: number): Promise<User> {
    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(400, "User doesn't exist");
    const newKey = uuid();
    await this.users.update({ api_key: newKey }, { where: { id: userId } });
    const updatedUser: User = await this.users.findOne({ where: { id: userId }, attributes: ['api_key'] });
    return updatedUser;
  }

  /**
   * This function delete a user by ID
   *
   * @function
   * @param userId User ID
   * @returns deleted user
   */
  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
