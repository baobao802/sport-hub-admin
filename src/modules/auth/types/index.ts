import { UserInfo } from 'src/types';

export type Credentials = {
  username: string;
  password: string;
  remember?: boolean;
};

export type LoginResponse = {
  user: UserInfo;
};
