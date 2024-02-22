import { Specialist, UserType } from 'src/shared';

export function isSpecialist(user?: UserType | null): user is Specialist {
  return user != null && user != undefined && 'experience' in user;
}
