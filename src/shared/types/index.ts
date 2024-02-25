import { User } from 'firebase/auth';

import { ReviewProps as ReviewType } from 'src/components/specialists/account/SpecialistAccount';
import { UserRole } from 'src/shared';

export interface Client {
  userId: string;
  avatarUrl: string;
  type: UserRole;
  email: string;
  dayOfBirth: string;
  firstName: string;
  lastName: string;
}
interface ReviewDetails {
  avgRating: string;
  count: number;
}

export interface Specialist extends Client {
  city: string;
  estimation: number;
  reviews: ReviewType[];
  dayOfBirth: string;
  experience: string;
  reviewDetails: ReviewDetails;
  categories: Option[];
  subcategories: Option[];
  telegram: string;
  area: Option[];
  whatsApp: string;
  extendedInfo: string;
}

export type UserType = Client | Specialist;
export type UserWithAdditionalInfo = User & { additionalInfo: UserType | null };
export interface Option {
  value: string;
  label: string;
}
