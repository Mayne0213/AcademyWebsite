import { create } from 'zustand';
import { Exam, ExamSummary, ExamState, ExamBasicActions } from './types';

// 순수한 시험 상태 관리 스토어
export const useExamStore = create<ExamState & ExamBasicActions>((set) => ({
  exams: [],
  isLoading: true,

  readExams: (exams: ExamSummary[]) => set({ exams }),

  createExam: (newExam: Exam) => set((state) => ({
    exams: [newExam, ...state.exams]
  })),

  deleteExam: (examId: number) => set((state) => ({
    exams: state.exams.filter(exam => exam.examId !== examId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
