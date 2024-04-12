import { UserRole } from 'src/enums';
import type { Specialist, UserType } from 'src/types';

export function isSpecialist(user: UserType | null): user is Specialist {
  return user != null && user.type === UserRole.SPECIALIST;
}
