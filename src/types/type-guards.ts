import type { UserType } from 'src/app_store/AppSessionStore';
import { UserRole } from 'src/enums';
import type { Specialist } from 'src/types';

export function isSpecialist(user: UserType | null): user is Specialist {
  return user != null && user.type === UserRole.SPECIALIST;
}
