import { Student } from "@/entities/student/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/shared/api/http";
import { API_ENDPOINTS } from "@/shared/config/api";

// 학생 API 관련 함수들
export const studentApi = {
  // 모든 학생 조회
  getStudents: async (): Promise<Student[]> => {
    return await apiGet<Student[]>(API_ENDPOINTS.STUDENT.BASE);
  },

  // 학생 생성
  createStudent: async (newStudent: Omit<Student, "memberId" | "createdAt" | "updatedAt" | "studentQnas" | "academy">): Promise<Student> => {
    return await apiPost<Student>(API_ENDPOINTS.STUDENT.BASE, newStudent);
  },

  // 학생 수정
  updateStudent: async (studentId: number, updatedStudent: Student): Promise<Student> => {
    return await apiPut<Student>(API_ENDPOINTS.STUDENT.BY_ID(studentId), updatedStudent);
  },

  // 학생 삭제
  deleteStudent: async (studentId: number): Promise<void> => {
    await apiDelete<void>(API_ENDPOINTS.STUDENT.BY_ID(studentId));
  },

  // 특정 학원의 학생들 조회
  getStudentsByAcademy: async (academyId: number): Promise<Student[]> => {
    return await apiGet<Student[]>(`${API_ENDPOINTS.STUDENT.BASE}?academyId=${academyId}`);
  },
}; 