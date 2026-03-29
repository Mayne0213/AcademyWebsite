import { create } from 'zustand';
import { QnACategory } from './types';

interface QnACategoryState {
  categories: QnACategory[];
  isCategoryLoading: boolean;
}

interface QnACategoryActions {
  setCategories: (categories: QnACategory[]) => void;
  addCategory: (category: QnACategory) => void;
  removeCategory: (categoryId: number) => void;
  setCategoryLoading: (loading: boolean) => void;
}

export const useQnACategoryStore = create<QnACategoryState & QnACategoryActions>((set) => ({
  categories: [],
  isCategoryLoading: false,
  setCategories: (categories) => set({ categories, isCategoryLoading: false }),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  removeCategory: (categoryId) => set((state) => ({
    categories: state.categories.filter((c) => c.categoryId !== categoryId),
  })),
  setCategoryLoading: (isCategoryLoading) => set({ isCategoryLoading }),
}));
