import { apiDelete, apiGet, apiPost, apiPut } from '@/src/shared/api/http';
import { 
  ExamResult, 
  ExamResultWithRelations,
  ExamQuestionResult,
  ExamStatistics
} from '../model/types';

import { 
  ExamResultCreateInput, 
  ExamResultUpdateInput, 
  ExamResultQueryInput,
  ExamQuestionResultCreateInput
} from '../model/validation';

const BASE_URL = '/api/examResult';

export const examResultApi = {
  // 시험 결과 목록 조회
  read: async (params?: ExamResultQueryInput): Promise<{ success: boolean; data: ExamResultWithRelations[] }> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const url = params ? `${BASE_URL}?${searchParams.toString()}` : BASE_URL;
    return apiGet(url);
  },

  // 시험 결과 단일 조회
  readById: async (examResultId: number): Promise<{ success: boolean; data: ExamResultWithRelations }> => {
    return apiGet(`${BASE_URL}/${examResultId}`);
  },

  // 시험 결과 생성
  create: async (data: ExamResultCreateInput): Promise<{ success: boolean; data: ExamResult }> => {
    return apiPost(BASE_URL, data);
  },

  // 시험 결과 수정
  update: async (examResultId: number, data: ExamResultUpdateInput): Promise<{ success: boolean; data: ExamResult }> => {
    return apiPut(`${BASE_URL}/${examResultId}`, data);
  },

  // 시험 결과 삭제
  delete: async (examResultId: number): Promise<{ success: boolean; message: string }> => {
    return apiDelete(`${BASE_URL}/${examResultId}`);
  },

  // 학생별 시험 결과 조회
  readByStudent: async (studentId: number, params?: ExamResultQueryInput): Promise<{ success: boolean; data: ExamResultWithRelations[] }> => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const url = params ? `${BASE_URL}/student/${studentId}?${searchParams.toString()}` : `${BASE_URL}/student/${studentId}`;
    return apiGet(url);
  },

  // // 시험별 결과 조회
  // readByExam: async (examId: number, params?: ExamResultQueryInput): Promise<{ success: boolean; data: ExamResultWithRelations[] }> => {
  //   const searchParams = new URLSearchParams();
  //   if (params) {
  //     Object.entries(params).forEach(([key, value]) => {
  //       if (value !== undefined) {
  //         searchParams.append(key, value.toString());
  //       }
  //     });
  //   }
    
  //   const url = params ? `${BASE_URL}/exam/${examId}?${searchParams.toString()}` : `${BASE_URL}/exam/${examId}`;
  //   return apiGet(url);
  // },



  // 문제별 결과 생성
  createQuestionResult: async (data: ExamQuestionResultCreateInput): Promise<{ success: boolean; data: ExamQuestionResult }> => {
    return apiPost(`${BASE_URL}/question-result`, data);
  },

  // 문제별 결과 수정
  updateQuestionResult: async (id: number, data: Partial<ExamQuestionResultCreateInput>): Promise<{ success: boolean; data: ExamQuestionResult }> => {
    return apiPut(`${BASE_URL}/question-result/${id}`, data);
  },

  // 문제별 결과 삭제
  deleteQuestionResult: async (id: number): Promise<{ success: boolean; message: string }> => {
    return apiDelete(`${BASE_URL}/question-result/${id}`);
  },

  // 시험 통계 조회
  getExamStatistics: async (examId: number): Promise<ExamStatistics> => {
    return apiGet(`${BASE_URL}/exam/${examId}/statistics`);
  },

  // 학원별 시험 통계 조회
  getExamStatisticsByAcademy: async (examId: number, academyId?: number): Promise<ExamStatistics> => {
    const url = academyId
      ? `${BASE_URL}/exam/${examId}/statistics?academyId=${academyId}`
      : `${BASE_URL}/exam/${examId}/statistics`;
    return apiGet(url);
  },
};
