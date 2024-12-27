export type Role = "admin" | "user";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  isBlocked: boolean;
}
