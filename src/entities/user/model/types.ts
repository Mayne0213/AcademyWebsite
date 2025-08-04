import { Student } from "@/src/entities/student/model/types";
import { Admin } from "@/src/entities/admin/model/types";

// User Role Types
export enum UserRole {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
}

// Base User Info (공통 사용자 정보)
export interface UserInfo {
  memberId: number;
  name: string;
  userId: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  student?: Student | null;
  admin?: Admin | null;
}