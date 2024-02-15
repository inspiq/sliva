import { UserType } from 'src/shared';

export interface User {
  avatarUrl: string;
  type: UserType;
  userId: string;
  email: string;
  city: string;
  dayOfBirth: string;
  lastName: string;
  name: string;
  surname: string;
  telegram: string;
  whatsApp: string;
}

export interface Specialist extends User {
  avatarUrl: string;
  type: UserType;
  userId: string;
  email: string;
  city: string;
  dayOfBirth: string;
  experience: string;
  lastName: string;
  name: string;
  surname: string;
  telegram: string;
  whatsApp: string;
}
