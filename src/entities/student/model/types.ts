import { QnABoard } from "@/src/entities/qna/model/types";
import { UserInfo } from "@/src/entities/user/model/types";
import { Academy } from "@/src/entities/academy/model/types";

// 학생 엔티티
export interface Student extends UserInfo {
  academyId: number;
  studentName: string;
  studentPhone: string;
  studentHighschool?: string; // Prisma 스키마와 일치하도록 optional로 변경
  studentBirthYear: number;
  studentMemo?: string;
  studentQnas: QnABoard[];
  academy: Academy;
}

// 학생 배열
export interface StudentState {
  students: Student[];
  isLoading: boolean;
}

// 학생 기본 타입
export interface StudentBasicActions {
  readStudents: (students: Student[]) => void;
  updateStudent: (updatedStudent: Student) => void;
  setLoading: (isLoading: boolean) => void;
}

// 학생 업데이트 요청 타입
export interface UpdateStudentRequest {
  academyId?: number;
  studentName?: string;
  studentPhone?: string;
  studentHighschool?: string;
  studentBirthYear?: number;
  studentMemo?: string;
}