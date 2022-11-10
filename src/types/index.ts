export enum Role {
  APP_ADMIN = 'app_admin',
  APP_USER = 'app_user',
}

export type UserInfo = {
  id: string;
  givenName: string;
  familyName: string;
  username: string;
  email: string;
  telephone: string;
  roles: Role[];
  emailVerified: boolean;
  enabled: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type District = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  districts: District[];
};

export type Address = {
  id: number;
  street: string;
  district: District;
};

export type Notification = {
  id: string;
  bookingId: number;
  createdAt: number;
  content: string;
  marked: boolean;
};
