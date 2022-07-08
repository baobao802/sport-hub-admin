export type Credentials = {
  email: string;
  password: string;
  remember?: boolean;
};

export type User = {
  id: string;
  email: string;
};

export type LoginResponse = {
  user: User;
};
