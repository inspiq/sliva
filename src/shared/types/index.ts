import { User } from 'firebase/auth';

import { UserRole } from 'src/shared';

export * from 'src/shared/types/type-guards';

export interface Client {
  userId: string;
  avatarUrl: string;
  type: UserRole;
  email: string;
  firstName: string;
  lastName: string;
}
interface ReviewDetails {
  avgRating: string;
  count: number;
}

export interface Specialist extends Client {
  birthday?: string;
  experience?: string;
  reviewDetails?: ReviewDetails;
  categories?: string[];
  subcategories?: string[];
  telegram?: string;
  extendedInfo?: string;
  zipCode: string;
  address: string;
  phone?: string;
}

export type UserType = Client | Specialist;
export type UserWithAdditionalInfo = User & { additionalInfo: UserType | null };
export interface Option {
  value: string;
  label: string;
}
