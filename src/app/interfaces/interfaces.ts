export interface User {
  username?: string;
  email: string;
  password: string;
  role?: string;
  locale?: string;
  theme?: string;
}

export interface AuthResponse {
  apiToken: string;
  expiresIn: string;
}
