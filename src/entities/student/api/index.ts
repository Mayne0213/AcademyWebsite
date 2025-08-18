// entities/student/api/index.ts
import { Student } from "@/src/entities/student/model/types";
import { apiGet, apiPut, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

// 학생 API 관련 함수들
export const studentApi = {
  // 모든 학생 조회
  getStudents: async (): Promise<Student[]> => {
    try {
      return await apiGet<Student[]>(API_ENDPOINTS.STUDENT.BASE);
    } catch (error) {
      throw error;
    }
  },

  findStudentByPhone: async (phoneNumber: string): Promise<Student> => {
    try {
      const result = await apiGet<Student>(`${API_ENDPOINTS.STUDENT.BASE}?phone=${phoneNumber}`);
      toast.success("학생이 성공적으로 조회되었습니다.");

      return result;

    } catch (error) {
      throw error;
    }
  },

  getStudentById: async (studentId: number): Promise<Student> => {
    try {
      return await apiGet<Student>(API_ENDPOINTS.STUDENT.BY_ID(studentId));
    } catch (error) {
      throw error;
    }
  },

  updateStudent: async (studentId: number, updatedStudent: Student): Promise<Student> => {
    try {
      const result = await apiPut<Student>(API_ENDPOINTS.STUDENT.BY_ID(studentId), updatedStudent);
      toast.success("학생 정보가 성공적으로 수정되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteStudent: async (studentId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.STUDENT.BY_ID(studentId));
      toast.success("학생이 성공적으로 삭제되었습니다.");

      return studentId;
    } catch (error) {
      throw error;
    }
  },
};