import { Expose, Transform } from 'class-transformer';
import { UserRolesDto } from '../userRoles/user-roles.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }: { obj: UserDto }) =>
    Object.keys(obj.roles).filter((item) => obj.roles[item]===true),
  )
  roles: string[];
}