import { create } from "zustand";
import { toast } from "sonner";
import { Qna, QnaCommentFormInput } from "@/components/type/qnaType";

interface QnaStatement {
  Qnas: Qna[];
  loading: boolean;
  expandedDetails: { [id: number]: { qnaContent: string; qnaImageUrl: string | null; comments: any[] } };
  setExpandedDetails: (updater: (prev: any) => any) => void;
  loadInitialPersonalQna: () => Promise<void>;
  loadInitialQna: () => Promise<void>;
  addQna: (newQna: any) => Promise<void>;
  addComment: (newQnaComment: QnaCommentFormInput) => Promise<any>;
  updateQna: (updatedQna: any) => Promise<void>;
  deleteQna: (id: number) => Promise<void>;
  deleteCommentFromQna: (qnaId: number, commentId: number) => Promise<void>;
  getQnaDetail: (qnaId: number) => Promise<Qna | null>;
}

export const useQna = create<QnaStatement>((set, get) => ({
  Qnas: [],
  loading: true,
  expandedDetails: {},
  setExpandedDetails: (updater) => set((state) => ({ expandedDetails: updater(state.expandedDetails) })),

  loadInitialPersonalQna: async () => {
    try {
      const res = await fetch(`/api/qnaPersonal`);
      if (!res.ok) throw new Error("Failed to fetch");

      const data: Qna[] = await res.json();
      set({ Qnas: data });
    } catch (error) {
      toast.error("QnA 로딩 중 오류가 발생했습니다.");
    } finally {
      set({ loading: false });
    }
  },

  loadInitialQna: async () => {
    try {
      const res = await fetch("/api/qna");
      if (!res.ok) throw new Error("Failed to fetch");

      const data: Qna[] = await res.json();
      console.log("[디버그] QnA 목록 fetch 결과:", data.map(q => ({ id: q.qnaId, title: q.qnaTitle, imageUrl: q.qnaImageUrl })));
      set({ Qnas: data });
    } catch (error) {
      toast.error("QnA 로딩 중 오류가 발생했습니다.");
    } finally {
      set({ loading: false });
    }
  },

  addQna: async (newQna) => {
    try {
      console.log("[디버그] addQna 호출, 파라미터:", newQna);
      const res = await fetch("/api/qna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQna),
      });

      if (!res.ok) throw new Error("질문글 추가 실패");

      const created: Qna = await res.json();
      console.log("[디버그] addQna 결과:", created);

      set((state) => ({
        Qnas: [created, ...state.Qnas],
      }));

      toast("처리 완료", {
        description: "질문글이 추가되었습니다.",
      });
    } catch (error) {
      toast.error("질문글 추가 중 오류가 발생했습니다.");
      console.log(error);
    }
  },

  addComment: async (newQnaComment: QnaCommentFormInput) => {
    try {
      const res = await fetch(`/api/qna/${newQnaComment.qnaId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQnaComment),
      });

      if (!res.ok) throw new Error("댓글 추가 실패");

      const createdComment = await res.json();
      console.log("[디버그] 댓글 추가 결과:", createdComment);

      // Zustand 상태 업데이트 - 해당 QnA의 댓글 목록에 새 댓글 추가
      set((state) => ({
        Qnas: state.Qnas.map((qna) => {
          if (qna.qnaId === newQnaComment.qnaId) {
            return {
              ...qna,
              comments: [...(qna.comments || []), createdComment],
            };
          }
          return qna;
        }),
      }));
      // 확장 상세 정보도 함께 업데이트
      get().setExpandedDetails((prev: any) => {
        const currentDetail = prev[newQnaComment.qnaId];
        if (currentDetail) {
          return {
            ...prev,
            [newQnaComment.qnaId]: {
              ...currentDetail,
              comments: [...(currentDetail.comments || []), createdComment],
            },
          };
        }
        return prev;
      });

      toast("처리 완료", {
        description: "댓글이 등록되었습니다.",
      });
      
      return createdComment; // 생성된 댓글 정보 반환
    } catch (error) {
      toast.error("댓글 등록 중 오류가 발생했습니다.");
      console.error(error);
      throw error; // 에러를 다시 던져서 호출자가 처리할 수 있도록
    }
  },

  updateQna: async (updatedQna) => {
    try {
      const res = await fetch(`/api/qna/${updatedQna.qnaId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedQna),
      });

      if (!res.ok) throw new Error("질문글 수정 실패");

      const data = await res.json();

      set((state) => ({
        Qnas: state.Qnas.map((a) => (a.qnaId === data.qnaId ? data : a)),
      }));

      toast("처리 완료", {
        description: "질문글이 수정되었습니다.",
      });
    } catch (error) {
      toast.error("질문글 수정 중 오류가 발생했습니다.");
    }
  },

  deleteQna: async (id) => {
    console.log("[디버그] deleteQna 호출, 파라미터:", id);
    try {
      // 1. 상세 정보 fetch
      const detail = await useQna.getState().getQnaDetail(id);
      
      // 2. 첨부 이미지가 있다면 S3에서 먼저 삭제
      console.log("[디버그] 삭제할 이미지:", detail?.qnaImageUrl);
      if (detail && detail.qnaImageUrl) {
        try {
          const deleteResponse = await fetch(`/api/delete-file?fileUrl=${encodeURIComponent(detail.qnaImageUrl)}`, {
            method: 'DELETE',
          });
          if (!deleteResponse.ok) {
            const errorData = await deleteResponse.json();
            console.error(`[HOOK] S3 이미지 삭제 실패: ${detail.qnaImageUrl}`, errorData.error);
            // 이미지 삭제 실패 시에도 계속 진행 (QnA는 삭제)
          } else {
            console.log(`[HOOK] S3 이미지 삭제 성공: ${detail.qnaImageUrl}`);
          }
        } catch (error) {
          console.error(`[HOOK] S3 이미지 삭제 실패: ${detail.qnaImageUrl}`, error);
          // 이미지 삭제 실패 시에도 계속 진행 (QnA는 삭제)
        }
      }
      
      // 3. QnA 삭제 (이미지 삭제 후)
      const res = await fetch(`/api/qna/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("질문글 삭제 실패");

      // 4. 로컬 상태 업데이트
      set((state) => ({
        Qnas: state.Qnas.filter((a) => a.qnaId !== id),
      }));

      toast("처리 완료", {
        description: "질문글이 삭제되었습니다.",
      });
    } catch (error) {
      toast.error("질문글 삭제 중 오류가 발생했습니다.");
    }
  },

  deleteCommentFromQna: async (qnaId: number, commentId: number) => {
    try {
      const res = await fetch(`/api/qna/${qnaId}/comment/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("댓글 삭제 실패");

      // Zustand 상태 업데이트 - 해당 QnA의 댓글 목록에서 댓글 제거
      set((state) => ({
        Qnas: state.Qnas.map((qna) => {
          if (qna.qnaId === qnaId) {
            return {
              ...qna,
              comments: (qna.comments || []).filter(
                (comment) => comment.commentId !== commentId
              ),
            };
          }
          return qna;
        }),
      }));
      // 확장 상세 정보도 함께 업데이트
      get().setExpandedDetails((prev: any) => {
        const currentDetail = prev[qnaId];
        if (currentDetail) {
          return {
            ...prev,
            [qnaId]: {
              ...currentDetail,
              comments: (currentDetail.comments || []).filter(
                (comment: any) => comment.commentId !== commentId
              ),
            },
          };
        }
        return prev;
      });

      toast("처리 완료", {
        description: "댓글이 삭제되었습니다.",
      });
    } catch (error) {
      toast.error("댓글 삭제 중 오류가 발생했습니다.");
    }
  },

  getQnaDetail: async (qnaId: number) => {
    try {
      const res = await fetch(`/api/qna/${qnaId}`);
      if (!res.ok) {
        console.error(`[HOOK] QnA 상세 정보 로딩 실패: ${qnaId}`, res.status);
        return null;
      }
      const data: Qna = await res.json();
      console.log(`[디버그] QnA 상세 정보 fetch 결과:`, data);
      return data;
    } catch (error) {
      console.error(`[HOOK] QnA 상세 정보 로딩 중 오류: ${qnaId}`, error);
      return null;
    }
  },
}));
