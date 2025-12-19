import { useCallback } from 'react';
import { QnABoard, CreateCommentRequest, CreateQnARequest } from "@/src/entities/qna/model/types";
import { qnaApi } from '@/src/entities/qna/api';
import { useQnABoardStore, useQnaDetailStore } from "@/src/entities/qna/model/store";
import { usePaginationStore } from '@/src/shared/model/pagination';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useQnAFeatureStore = () => {
  const entityStore = useQnABoardStore.getState();
  const detailStore = useQnaDetailStore.getState();
  const paginationStore = usePaginationStore.getState();

  const readQnAs = useCallback(async (page: number = 1, itemsPerPage: number = 6) => {
    entityStore.setLoading(true);
    try {
      const result = await qnaApi.getQnAs(page, itemsPerPage);
      entityStore.readQnABoards(result.qnas);
      paginationStore.setTotalCount(result.totalCount);
      paginationStore.setCurrentPage(page);
      paginationStore.setItemsPerPage(itemsPerPage);
      return result;
    } catch (error) {
      console.error('readQnAs error:', error);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

  const readPersonalQnAs = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      const qnas = await qnaApi.getPersonalQnAs();
      entityStore.readQnABoards(qnas);
      paginationStore.setTotalCount(qnas.length);
      paginationStore.setCurrentPage(1);
      paginationStore.setItemsPerPage(qnas.length);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

  const createQnA = useCallback(async (newQnA: CreateQnARequest) => {
    entityStore.setLoading(true);
    try {
      entityStore.createQnABoard(await qnaApi.createQnA(newQnA));
      paginationStore.incrementTotalCount();
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, paginationStore]);

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
      paginationStore.decrementTotalCount();
      // QnA 삭제 시 상세 정보도 클리어
      detailStore.clearDetail();
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore, detailStore, paginationStore]);

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
