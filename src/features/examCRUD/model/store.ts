import { useCallback } from 'react';
import { Exam, ExamSummary, CreateExamRequest, UpdateExamRequest } from "@/src/entities/exam/model/types";
import { examApi } from '@/src/entities/exam/api';
import { useExamStore } from "@/src/entities/exam/model/store";

// API 호출과 전역 상태 관리를 통합하는 훅
export const useExamFeatureStore = () => {
  const entityStore = useExamStore.getState();

  const readExams = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      const exams = await examApi.getExams();
      // entityStore.readExams(exams);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const readExamById = useCallback(async (examId: number) => {
    entityStore.setLoading(true);
    try {
      const exam = await examApi.getExamById(examId);
      // 개별 시험을 store에 추가하거나 업데이트
      const existingExams = entityStore.exams;
      const examIndex = existingExams.findIndex(e => e.examId === examId);
      
      if (examIndex >= 0) {
        // 기존 시험을 상세 정보로 업데이트
        const updatedExams = [...existingExams];
        updatedExams[examIndex] = {
          ...updatedExams[examIndex],
          ...exam
        };
        // entityStore.readExams(updatedExams);
      } else {
        // 새로운 시험을 추가
        entityStore.createExam(exam);
      }
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const createExam = useCallback(async (newExam: CreateExamRequest) => {
    entityStore.setLoading(true);
    try {
      const createdExam = await examApi.createExam(newExam);
      entityStore.createExam(createdExam);
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
    readExams,
    readExamById,
    createExam,
    deleteExam,
  };
};
