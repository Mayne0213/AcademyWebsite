import { useCallback } from 'react';
import { CreateTextbookRequest, UpdateTextbookRequest } from "@/src/entities/textbook/model/types";
import { textbookApi } from '@/src/entities/textbook/api';
import { useTextbookStore } from "@/src/entities/textbook/model/store";

// API 호출과 전역 상태 관리를 통합하는 훅
export const useTextbookFeatureStore = () => {
  const entityStore = useTextbookStore.getState();

  const readTextbooks = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      const result = await textbookApi.readTextbooks();
      entityStore.readTextbooks(result);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTextbook = useCallback(async (newTextbook: CreateTextbookRequest) => {
    entityStore.setLoading(true);
    try {
      const result = await textbookApi.createTextbook(newTextbook);
      entityStore.createTextbook(result);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const updateTextbook = useCallback(async (textbookId: number, updateData: UpdateTextbookRequest) => {
    entityStore.setLoading(true);
    try {
      const result = await textbookApi.updateTextbook(textbookId, updateData);
      entityStore.updateTextbook(result);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const deleteTextbook = useCallback(async (textbookId: number) => {
    entityStore.setLoading(true);
    try {
      entityStore.deleteTextbook(await textbookApi.deleteTextbook(textbookId));
      return textbookId;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const toggleImportantTextbook = useCallback(async (textbookId: number, isImportant: boolean) => {
    entityStore.setLoading(true);
    try {
      const result = await textbookApi.toggleImportantTextbook(textbookId, isImportant);
      entityStore.updateTextbook(result);
      return result;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  return {
    readTextbooks,
    createTextbook,
    updateTextbook,
    deleteTextbook,
    toggleImportantTextbook,
  };
};
