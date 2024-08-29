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
