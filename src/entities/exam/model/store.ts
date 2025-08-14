import { create } from 'zustand';
import { Exam, ExamSummary, ExamState, ExamBasicActions } from './types';

// 순수한 시험 상태 관리 스토어
export const useExamStore = create<ExamState & ExamBasicActions>((set) => ({
  exams: [],
  examDetail: null,
  isLoading: true,
  isDetailLoading: true,
  totalCount: 0,
  currentPage: 1,

  readExamSummaries: (exams: ExamSummary[], totalCount: number, currentPage: number = 1) => set({
    exams,
    totalCount,
    currentPage
  }),

  readExamDetail: (exam: Exam) => set({ examDetail: exam }),

  createExam: (newExam: ExamSummary) => set((state) => ({
    exams: [newExam, ...state.exams],
    totalCount: state.totalCount + 1
  })),

  deleteExam: (examId: number) => set((state) => ({
    exams: state.exams.filter(exam => exam.examId !== examId),
    examDetail: null,
    totalCount: Math.max(0, state.totalCount - 1)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
  setDetailLoading: (isDetailLoading: boolean) => set({ isDetailLoading }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
}));
