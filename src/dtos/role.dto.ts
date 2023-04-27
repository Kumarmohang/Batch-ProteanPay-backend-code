import { IsString } from 'class-validator';

/**
 * This class defines the Role Data Transfer Object
 *
 * @class
 */
export class CreateRoleDto {
  @IsString()
  public name: string;
  @IsString()
  public description: string;
}
