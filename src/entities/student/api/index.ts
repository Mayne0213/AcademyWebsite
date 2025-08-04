// entities/student/api/index.ts
import { Student } from "@/src/entities/student/model/types";
import { apiGet, apiPost, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { STUDENT_VALIDATION } from "@/src/entities/student/model/validation";
import { toast } from "sonner";

// 학생 API 관련 함수들
export const studentApi = {
  // 모든 학생 조회
  getStudents: async (): Promise<Student[]> => {
    return await apiGet<Student[]>(API_ENDPOINTS.STUDENT.BASE);
  },

  createStudent: async (newStudent: Omit<Student, "memberId" | "createdAt" | "updatedAt" | "studentQnas" | "academy">): Promise<Student> => {
    STUDENT_VALIDATION.validateStudentForCreate(newStudent);

    const result = await apiPost<Student>(API_ENDPOINTS.STUDENT.BASE, newStudent);
    toast.success("학생이 성공적으로 생성되었습니다.");

    return result;
  },

  updateStudent: async (studentId: number, updatedStudent: Student): Promise<Student> => {
    STUDENT_VALIDATION.validateStudentForUpdate(updatedStudent);

    const result = await apiPut<Student>(API_ENDPOINTS.STUDENT.BY_ID(studentId), updatedStudent);
    toast.success("학생 정보가 성공적으로 수정되었습니다.");

    return result;
  },

  deleteStudent: async (studentId: number): Promise<number> => {
    await apiDelete<void>(API_ENDPOINTS.STUDENT.BY_ID(studentId));
    toast.success("학생이 성공적으로 삭제되었습니다.");

    return studentId;
  },
};