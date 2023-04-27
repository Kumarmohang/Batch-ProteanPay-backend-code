import { IsString, IsEmail } from 'class-validator';

/**
 * This class defines the user Data Transfer Object
 *
 * @class
 */
export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
