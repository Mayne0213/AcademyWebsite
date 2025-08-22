import { apiGet } from '@/src/shared/api/http';
import { API_ENDPOINTS } from '@/src/shared/config/api';
import { 
  StudentLearningReport, 
  LearningReportSummary,
  LearningReportFilters 
} from '../model/types';
import { ExamQuestionResult } from '@/src/entities/examResult/model/types';

// 학습 리포트 관련 API 함수들
export const learningReportApi = {
  // 학생별 학습 리포트 조회
  readStudentLearningReport: async (studentId: number): Promise<StudentLearningReport> => {
    try {
      const result = await apiGet<StudentLearningReport>(`/api/learning-report/${studentId}`);
      return result;
    } catch (error) {
      throw new Error(`학생 학습 리포트를 불러올 수 없습니다: ${error}`);
    }
  },

  // 전체 학습 리포트 요약 조회
  readLearningReportSummary: async (filters?: LearningReportFilters): Promise<LearningReportSummary> => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.dateRange) {
        queryParams.append('startDate', filters.dateRange.startDate.toISOString());
        queryParams.append('endDate', filters.dateRange.endDate.toISOString());
      }
      
      if (filters?.gradeRange) {
        queryParams.append('minGrade', filters.gradeRange.minGrade.toString());
        queryParams.append('maxGrade', filters.gradeRange.maxGrade.toString());
      }
      
      if (filters?.scoreRange) {
        queryParams.append('minScore', filters.scoreRange.minScore.toString());
        queryParams.append('maxScore', filters.scoreRange.maxScore.toString());
      }

      const url = `/api/learning-report/summary?${queryParams.toString()}`;
      const result = await apiGet<LearningReportSummary>(url);
      return result;
    } catch (error) {
      throw new Error(`학습 리포트 요약을 불러올 수 없습니다: ${error}`);
    }
  },

  // 학생별 시험 이력 조회
  readStudentExamHistory: async (studentId: number): Promise<StudentLearningReport['examHistory']> => {
    try {
      const result = await apiGet<StudentLearningReport['examHistory']>(`/api/learning-report/${studentId}/exam-history`);
      return result;
    } catch (error) {
      throw new Error(`학생 시험 이력을 불러올 수 없습니다: ${error}`);
    }
  },

  // 학원 전체 학생들의 학습 리포트 조회
  readAcademyLearningReports: async (academyId: number): Promise<StudentLearningReport[]> => {
    try {
      const result = await apiGet<StudentLearningReport[]>(`/api/learning-report/academy/${academyId}`);
      return result;
    } catch (error) {
      throw new Error(`학원 학습 리포트를 불러올 수 없습니다: ${error}`);
    }
  },

  // 시험 결과의 문제별 상세 정보 조회
  readExamQuestionResults: async (examResultId: number): Promise<ExamQuestionResult[]> => {
    try {
      const result = await apiGet<ExamQuestionResult[]>(
        `/api/exam-result/${examResultId}/question-results`
      );
      return result;
    } catch (error) {
      throw new Error(`문제별 결과를 불러올 수 없습니다: ${error}`);
    }
  }
};
