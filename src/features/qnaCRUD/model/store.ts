import { useCallback } from 'react';
import { QnABoard, CreateCommentRequest } from "@/src/entities/qna/model/types";
import { qnaApi } from '@/src/entities/qna/api';
import { useQnABoardStore, useQnaDetailStore } from "@/src/entities/qna/model/store";

// API 호출과 전역 상태 관리를 통합하는 훅
export const useQnAFeatureStore = () => {
  const entityStore = useQnABoardStore.getState();
  const detailStore = useQnaDetailStore.getState();

  const readQnAs = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      entityStore.readQnABoards(await qnaApi.getQnAs());
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const readPersonalQnAs = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      entityStore.readQnABoards(await qnaApi.getPersonalQnAs());
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const createQnA = useCallback(async (newQnA: Omit<QnABoard, "qnaId" | "createdAt" | "updatedAt" | "qnaStudent" | "qnaComments">) => {
    entityStore.setLoading(true);
    try {
      entityStore.createQnABoard(await qnaApi.createQnA(newQnA));
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const updateQnA = useCallback(async (qnaId: number, updatedQnA: QnABoard) => {
    entityStore.setLoading(true);
    try {
      const result = await qnaApi.updateQnA(qnaId, updatedQnA);
      entityStore.updateQnABoard(result);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const deleteQnA = useCallback(async (qnaId: number) => {
    entityStore.setLoading(true);
    try {
      await qnaApi.deleteQnA(qnaId);
      entityStore.deleteQnABoard(qnaId);
      // QnA 삭제 시 상세 정보도 클리어
      detailStore.clearDetail();
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, detailStore]);

  const readQnaDetail = useCallback(async (qnaId: number) => {
    detailStore.setIsDetailLoading(true);
    try {
      detailStore.readDetail(await qnaApi.getQnADetail(qnaId));
    } finally {
      detailStore.setIsDetailLoading(false);
    }
  }, [detailStore]);

  const createComment = useCallback(async (qnaId: number, newComment: CreateCommentRequest) => {
    detailStore.setIsDetailLoading(true);
    try {
      detailStore.addComment(await qnaApi.createComment(qnaId, newComment));
    } finally {
      detailStore.setIsDetailLoading(false);
    }
  }, [detailStore]);

  const deleteComment = useCallback(async (qnaId: number, commentId: number) => {
    detailStore.setIsDetailLoading(true);
    try {
      await qnaApi.deleteComment(qnaId, commentId);
      detailStore.removeComment(commentId);
    } finally {
      detailStore.setIsDetailLoading(false);
    }
  }, [detailStore]);

  return {
    readQnAs,
    readPersonalQnAs,
    readQnaDetail,
    createComment,
    deleteComment,
    createQnA,
    updateQnA,
    deleteQnA,
  };
};
