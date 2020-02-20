export interface User {
  id?: number;
  username?: string;
  email: string;
  password?: string;
  role?: string;
  locale?: string;
  theme?: string;
}

export interface LoginRequest {
  loginRequestDto: User;
}

export interface RegistrationRequest {
  registrationRequestDto: User;
}

export interface LoginResponse {
  error: [];
  loginResponseDto: {
    token: string;
  };
}

export interface RegistrationResponse {
  error: [];
  loginResponseDto: {
    token: string;
  };
}

export interface AuthResponse {
  apiToken: string;
  expiresIn: string;
}
