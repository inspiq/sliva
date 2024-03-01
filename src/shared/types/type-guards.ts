import { Specialist, UserRole, UserType } from 'src/shared';

export function isSpecialist(user?: UserType | null): user is Specialist {
  return user != null && user.type === UserRole.SPECIALIST;
}
