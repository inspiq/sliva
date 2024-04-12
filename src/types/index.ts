export * from 'src/types/type-guards';

import { User } from 'firebase/auth';

import { UserRole } from 'src/enums';

interface ReviewDetails {
  avgRating: string;
  count: number;
}

export interface Client {
  id: string;
  avatarUrl: string;
  type: UserRole;
  email: string;
  firstName: string;
  isBlocked: boolean;
  lastName: string;
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

export interface ValueLabelPair {
  value: string;
  label: string;
}

export type UserType = Client | Specialist;
export type UserWithAdditionalInfo = User & { additionalInfo: UserType | null };
