import { useCallback } from 'react';
import { ExamSummary, CreateExamRequest, Exam } from "@/src/entities/exam/model/types";
import { examApi } from '@/src/entities/exam/api';
import { useExamStore } from "@/src/entities/exam/model/store";
import { usePaginationStore } from '@/src/shared/model/pagination';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useExamFeatureStore = () => {
  const entityStore = useExamStore.getState();
  const paginationStore = usePaginationStore.getState();

  const readExamSummaries = useCallback(async (page: number = 1, itemsPerPage: number = 6) => {
    entityStore.setLoading(true);
    try {
      const result = await examApi.readExamSummaries(page, itemsPerPage);
      entityStore.readExamSummaries(result.exams, result.totalCount, page);
      paginationStore.setTotalCount(result.totalCount);
      paginationStore.setItemsPerPage(itemsPerPage);
      paginationStore.setCurrentPage(page);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

  const readExamDetail = useCallback(async (examId: number): Promise<Exam> => {
    entityStore.setDetailLoading(true);
    try {
      const exam = await examApi.readExamDetail(examId);
      entityStore.readExamDetail(exam);
      return exam;
    } finally {
      entityStore.setDetailLoading(false);
    }
  }, [entityStore]);

  const createExam = useCallback(async (newExam: CreateExamRequest) => {
    entityStore.setLoading(true);
    try {
      const createdExam = await examApi.createExam(newExam);
      // Exam을 ExamSummary로 변환하여 store에 저장
      const examSummary: ExamSummary = {
        examId: createdExam.examId,
        examName: createdExam.examName,
        totalQuestions: createdExam.totalQuestions,
        createdAt: createdExam.createdAt,
        updatedAt: createdExam.updatedAt,
      };
      entityStore.createExam(examSummary);
      // pagination store와 동기화
      paginationStore.incrementTotalCount();
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

  const deleteExam = useCallback(async (examId: number) => {
    entityStore.setLoading(true);
    try {
      await examApi.deleteExam(examId);
      entityStore.deleteExam(examId);
      // pagination store와 동기화
      paginationStore.decrementTotalCount();
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

  return {
    readExamSummaries,
    readExamDetail,
    createExam,
    deleteExam,
  };
};
