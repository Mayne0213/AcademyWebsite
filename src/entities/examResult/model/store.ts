import { create } from 'zustand';
import { ExamResult, ExamResultWithRelations } from './types';

interface ExamResultStore {
  examResults: ExamResultWithRelations[];
  currentExamResult: ExamResultWithRelations | null;
  isLoading: boolean;
  error: string | null;
  
  setExamResults: (examResults: ExamResultWithRelations[]) => void;
  setCurrentExamResult: (examResult: ExamResultWithRelations | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  addExamResult: (examResult: ExamResultWithRelations) => void;
  updateExamResult: (examResultId: number, updates: Partial<ExamResult>) => void;
  removeExamResult: (examResultId: number) => void;
  
  clearStore: () => void;
}

export const useExamResultStore = create<ExamResultStore>((set) => ({
  examResults: [],
  currentExamResult: null,
  isLoading: false,
  error: null,
  
  setExamResults: (examResults) => set({ examResults }),
  setCurrentExamResult: (examResult) => set({ currentExamResult: examResult }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  addExamResult: (examResult) => set((state) => ({
    examResults: [...state.examResults, examResult]
  })),
  
  updateExamResult: (examResultId, updates) => set((state) => ({
    examResults: state.examResults.map((result) =>
      result.examResultId === examResultId
        ? { ...result, ...updates }
        : result
    ),
    currentExamResult: state.currentExamResult?.examResultId === examResultId
      ? { ...state.currentExamResult, ...updates }
      : state.currentExamResult
  })),
  
  removeExamResult: (examResultId) => set((state) => ({
    examResults: state.examResults.filter((result) => result.examResultId !== examResultId),
    currentExamResult: state.currentExamResult?.examResultId === examResultId
      ? null
      : state.currentExamResult
  })),
  
  clearStore: () => set({
    examResults: [],
    currentExamResult: null,
    isLoading: false,
    error: null
  }),
}));
