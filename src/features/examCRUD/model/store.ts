import { useCallback } from 'react';
import { ExamSummary, CreateExamRequest, Exam } from "@/src/entities/exam/model/types";
import { examApi } from '@/src/entities/exam/api';
import { useExamStore } from "@/src/entities/exam/model/store";

// API 호출과 전역 상태 관리를 통합하는 훅
export const useExamFeatureStore = () => {
  const entityStore = useExamStore.getState();

  const readExamSummaries = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      const exams = await examApi.readExamSummaries();
      entityStore.readExamSummaries(exams);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

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
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const deleteExam = useCallback(async (examId: number) => {
    entityStore.setLoading(true);
    try {
      await examApi.deleteExam(examId);
      entityStore.deleteExam(examId);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  return {
    readExamSummaries,
    readExamDetail,
    createExam,
    deleteExam,
  };
};
