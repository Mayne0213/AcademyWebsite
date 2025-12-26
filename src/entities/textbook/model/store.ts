import { create } from 'zustand';
import { Textbook, TextbookState, TextbookBasicActions } from './types';

export const useTextbookStore = create<TextbookState & TextbookBasicActions>((set) => ({
  textbooks: [],
  isLoading: false,

  readTextbooks: (textbooks: Textbook[]) => {
    set({ textbooks, isLoading: false });
  },

  getTextbook: (textbook: Textbook) => {
    set((state) => ({
      textbooks: state.textbooks.map((t) =>
        t.textbookId === textbook.textbookId ? textbook : t
      ),
    }));
  },

  createTextbook: (textbook: Textbook) => {
    set((state) => ({
      textbooks: [textbook, ...state.textbooks],
    }));
  },

  updateTextbook: (updatedTextbook: Textbook) => {
    set((state) => ({
      textbooks: state.textbooks.map((t) =>
        t.textbookId === updatedTextbook.textbookId ? updatedTextbook : t
      ),
    }));
  },

  deleteTextbook: (textbookId: number) => {
    set((state) => ({
      textbooks: state.textbooks.filter((t) => t.textbookId !== textbookId),
    }));
  },

  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },
}));
