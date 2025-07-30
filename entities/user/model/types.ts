import { Student } from "@/entities/student/model/index";
import { Admin } from "@/entities/admin/model/index";

// User Role Types
export enum UserRole {
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
}

// Base User Info (공통 사용자 정보)
export interface UserInfo {
  memberId: number;
  userId: string;
  userPassword?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  student?: Student;
  admin?: Admin;
}