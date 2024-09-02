export interface User {
  id: number;
  name: string;
  iat: number;
}

export interface UserForComment {
  name: string;
}

export interface UserResponse {
  user: User | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}
