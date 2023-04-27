import { IsString } from 'class-validator';

/**
 * This class defines the Permission Data Transfer Object
 *
 * @class
 */
export class CreatePermissionDto {
  @IsString()
  public name: string;
  @IsString()
  public description: string;
}
