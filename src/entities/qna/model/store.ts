import { create } from 'zustand';
import { QnABoard, QnABoardState, QnABoardBasicActions, QnADetail, QnABoardComment, QnaDetailState, QnaDetailBasicAction } from './types';


// 순수한 QnA 상태 관리 스토어
export const useQnABoardStore = create<QnABoardState & QnABoardBasicActions>((set) => ({
  // QnA 상태
  qnas: [],
  isLoading: true,

  // QnA 기본 액션
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

// QnA 상세 정보 상태 관리 스토어
export const useQnaDetailStore = create<QnaDetailState & QnaDetailBasicAction>((set) => ({
  selectedDetail: null,
  isDetailLoading: true,

  readDetail: (detail: QnADetail) => set({ selectedDetail: detail }),

  clearDetail: () => set({ selectedDetail: null, isDetailLoading: false }),

  addComment: (comment: QnABoardComment) => set((state) => ({
    selectedDetail: state.selectedDetail ? {
      ...state.selectedDetail,
      comments: [comment, ...state.selectedDetail.comments]
    } : null
  })),

  removeComment: (commentId: number) => set((state) => ({
    selectedDetail: state.selectedDetail ? {
      ...state.selectedDetail,
      comments: state.selectedDetail.comments.filter(c => c.commentId !== commentId)
    } : null
  })),

  setIsDetailLoading: (isDetailLoading: boolean) => set({ isDetailLoading }),
}));