import { User } from 'firebase/auth';

import { UserRole } from 'src/shared';

export * from 'src/shared/types/type-guards';

export interface Client {
  userId: string;
  avatarUrl: string;
  type: UserRole;
  email: string;
  dayOfBirth: string;
  firstName: string;
  lastName: string;
}

export interface Specialist extends Client {
  city: string;
  dayOfBirth: string;
  experience: string;
  categories: Option[];
  subcategories: Option[];
  telegram: string;
  whatsApp: string;
  extendedInfo: string;
}

export type UserType = Client | Specialist;
export type UserWithAdditionalInfo = User & { additionalInfo: UserType | null };

export interface Option {
  value: string;
  label: string;
}
