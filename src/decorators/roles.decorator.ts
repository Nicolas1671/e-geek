import { Role } from 'src/modules/auth/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
