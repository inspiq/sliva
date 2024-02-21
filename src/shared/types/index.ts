import { Props as ReviewsType } from 'src/components/Feedback';
import { UserType } from 'src/shared';

export interface Client {
  avatarUrl: string;
  type: UserType;
  userId: string;
  email: string;
  city: string;
  dayOfBirth: string;
  name: string;
  lastName: string;
  suraname: string;
  telegram: string;
  whatsApp: string;
}

export interface Specialist extends Client {
  avatarUrl: string;
  type: UserType;
  userId: string;
  email: string;
  city: string;
  reviews: ReviewsType[];
  dayOfBirth: string;
  experience: string;
  lastName: string;
  name: string;
  surname: string;
  telegram: string;
  whatsApp: string;
  categories: Option[];
  subcategories: Option[];
}

export interface Option {
  value: string;
  label: string;
}
