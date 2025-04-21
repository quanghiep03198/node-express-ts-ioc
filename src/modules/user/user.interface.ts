export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  TEACHER = "teacher",
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  address?: string;
  phone_number?: string;
  role: UserRole;
  dob?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
