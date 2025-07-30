import { QnABoard } from "@/entities/qna/model/index";
import { UserInfo } from "@/entities/user/model/types";
import { Academy } from "@/entities/academy/model";

// 학생 엔티티
export interface Student extends UserInfo {
  academyId: number;
  studentName: string;
  studentPhone: string;
  studentHighschool: string;
  studentBirthYear: number;
  studentMemo?: string;
  studentQnas: QnABoard[];
  academy: Academy;
}

// 학생 배열
export interface StudentState {
  students: Student[];
  isLoading: boolean;
  error: string | null;
}

// 학생 기본 타입
export interface StudentBasicActions {
  readStudents: (students: Student[]) => void;
  createStudent: (student: Student) => void;
  updateStudent: (updatedStudent: Student) => void;
  deleteStudent: (studentId: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
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