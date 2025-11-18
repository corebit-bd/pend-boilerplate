import { User } from "./user";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
