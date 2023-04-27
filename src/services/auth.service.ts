import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

/**
 * This class is service class for user authentication
 *
 * @class
 */
class AuthService {
  public users = DB.users;

  /**
   * This method takes user data as params and chesks if it is already present in DB
   * or not if present returns error else register user in DB and returns the same
   *
   * @param userData It takes user data (email, Password ) to register into db
   * @returns  redistered user in DB
   */
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');
    const findUser: User = await this.users.findOne({
      where: { email: userData.email },
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
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    let createdUserData;
    if (!!createUserData) {
      createdUserData = await this.users.findOne({
        where: { email: createUserData.email },
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
    }

    return createdUserData;
  }

  /**
   * This method runs after passport authentication of user
   *
   * @param userData as user credentials
   * @returns success messge of authentication
   */
  public async login(userData: User): Promise<TokenData> {
    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    return this.createToken(findUser);
  }

  /**
     function logout user from session
   *
   * @param userData takes user data which needs to be logged out
   * @returns same user after logout
   */
  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  /**
   * This function creates tokes taking user data and using JWT
   *
   * @param user takes user data which needs to be logged out
   * @param expiresIn expiry time for token
   * @returns {TokenData} generated token  and expiring time
   */
  public createToken(user: User, expiresIn: number = 60 * 60 * 24 * 15): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  /**
   * This function creates one time access token
   *
   * @param userData user data
   * @returns {TokenData} generated token  and expiring time
   */
  public async getOneTimeToken(userData: User): Promise<TokenData> {
    let user: User = await this.users.findOne({ where: { email: userData.email } });
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      user = await this.users.create({ ...userData, password: randomPassword });
    }
    return this.createToken(user, 60 * 10 * 10 * 24 * 15);
  }

  /**
   * This takes function creates token string with authorization title
   *
   * @param tokenData as input
   * @returns string of token authorization
   */
  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
export default AuthService;
