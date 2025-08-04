import { create } from 'zustand';
import { QnABoard, QnABoardState, QnABoardBasicActions } from './types';

// 순수한 관리자 상태 관리 스토어
export const useQnABoardStore = create<QnABoardState & QnABoardBasicActions>((set) => ({
  qnas: [],
  isLoading: false,

  readQnABoards: (qnas: QnABoard[]) => set({ qnas }),

  createQnABoard: (newQnA: QnABoard) => set((state) => ({
    qnas: [newQnA, ...state.qnas]
  })),

  updateQnABoard: (updatedQnA: QnABoard) => set((state) => ({
    qnas: state.qnas.map(qna =>
      qna.qnaId === updatedQnA.qnaId ? updatedQnA : qna
    )
  })),

  deleteQnABoard: (qnaId: number) => set((state) => ({
    qnas: state.qnas.filter(qna => qna.qnaId !== qnaId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),

})); 