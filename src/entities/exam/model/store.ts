import { create } from 'zustand';
import { Exam, ExamSummary, ExamState, ExamBasicActions } from './types';

// 순수한 시험 상태 관리 스토어
export const useExamStore = create<ExamState & ExamBasicActions>((set) => ({
  exams: [],
  examDetail: null,
  isLoading: true,
  isDetailLoading: true,

  readExamSummaries: (exams: ExamSummary[]) => set({ exams }),

  readExamDetail: (exam: Exam) => set({ examDetail: exam }),

  createExam: (newExam: ExamSummary) => set((state) => ({
    exams: [newExam, ...state.exams]
  })),

  deleteExam: (examId: number) => set((state) => ({
    exams: state.exams.filter(exam => exam.examId !== examId),
    examDetail: null,
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
  setDetailLoading: (isDetailLoading: boolean) => set({ isDetailLoading }),
}));
