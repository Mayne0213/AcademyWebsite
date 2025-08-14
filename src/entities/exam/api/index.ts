import { Exam, ExamSummary } from "@/src/entities/exam/model/types";
import { apiGet, apiPost, apiDelete } from "@/src/shared/api/http";
import { API_ENDPOINTS } from "@/src/shared/config/api";
import { toast } from "sonner";

// 시험 API 관련 함수들
export const examApi = {
  // 시험 목록 조회 (간단한 정보만 - 지연 데이터 fetch)
  readExamSummaries: async (): Promise<ExamSummary[]> => {
    try {
      return await apiGet<ExamSummary[]>(API_ENDPOINTS.EXAM.BASE);
    } catch (error) {
      throw error;
    }
  },

  // 개별 시험 상세 정보 조회 (지연 데이터 fetch)
  readExamDetail: async (examId: number): Promise<Exam> => {
    try {
      return await apiGet<Exam>(API_ENDPOINTS.EXAM.BY_ID(examId));
    } catch (error) {
      throw error;
    }
  },

  // 시험 생성
  createExam: async (newExam: Omit<Exam, "examId" | "createdAt" | "updatedAt" | "results">): Promise<Exam> => {
    try {
      const result = await apiPost<Exam>(API_ENDPOINTS.EXAM.BASE, newExam);
      toast.success("시험이 성공적으로 생성되었습니다.");

      return result;
    } catch (error) {
      throw error;
    }
  },

  // 시험 삭제
  deleteExam: async (examId: number): Promise<number> => {
    try {
      await apiDelete<void>(API_ENDPOINTS.EXAM.BY_ID(examId));
      toast.success("시험이 성공적으로 삭제되었습니다.");

      return examId;
    } catch (error) {
      throw error;
    }
  },
};
