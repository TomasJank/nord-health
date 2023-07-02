export interface AuthParams {
  email: string;
  password: string;
}

export interface User {
  accessToken: string | null;
  email: string | null;
}
