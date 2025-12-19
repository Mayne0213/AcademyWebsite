import { useCallback } from 'react';
import { fileApi } from '@/src/entities/file/api';

// S3 파일 삭제 기능을 재사용 가능한 함수로 제공
export const useFileFeatureStore = () => {
  
  // 단일 파일 삭제 (DB + S3)
  const deleteFile = useCallback(async (fileId: number): Promise<void> => {
    try {
      await fileApi.deleteFile(fileId);
    } catch (error) {
      throw error;
    }
  }, []);

  // 여러 파일 삭제 (DB + S3)
  const deleteFiles = useCallback(async (fileIds: number[]): Promise<void> => {
    try {
      const deletePromises = fileIds.map(async (fileId) => {
        try {
          await fileApi.deleteFile(fileId);
        } catch (error) {
        }
      });

      await Promise.all(deletePromises);
    } catch (error) {
      throw error;
    }
  }, []);

  // AcademyFile 배열에서 파일들 삭제
  const deleteAcademyFiles = useCallback(async (academyFiles: any[]): Promise<void> => {
    try {
      if (academyFiles && academyFiles.length > 0) {
        const fileIds = academyFiles
          .filter(academyFile => academyFile.fileId)
          .map(academyFile => academyFile.fileId);

        if (fileIds.length > 0) {
          await deleteFiles(fileIds);
        }
      }
    } catch (error) {
      throw error;
    }
  }, [deleteFiles]);

  // AnnouncementFile 배열에서 파일들 삭제
  const deleteAnnouncementFiles = useCallback(async (announcementFiles: any[]): Promise<void> => {
    try {
      if (announcementFiles && announcementFiles.length > 0) {
        const fileIds = announcementFiles
          .filter(announcementFile => announcementFile.fileId)
          .map(announcementFile => announcementFile.fileId);

        if (fileIds.length > 0) {
          await deleteFiles(fileIds);
        }
      }
    } catch (error) {
      throw error;
    }
  }, [deleteFiles]);

  // QnaFile 배열에서 파일들 삭제
  const deleteQnaFiles = useCallback(async (qnaFiles: any[]): Promise<void> => {
    try {
      if (qnaFiles && qnaFiles.length > 0) {
        const fileIds = qnaFiles
          .filter(qnaFile => qnaFile.fileId)
          .map(qnaFile => qnaFile.fileId);

        if (fileIds.length > 0) {
          await deleteFiles(fileIds);
        }
      }
    } catch (error) {
      throw error;
    }
  }, [deleteFiles]);

  return {
    deleteFile,
    deleteFiles,
    deleteAcademyFiles,
    deleteAnnouncementFiles,
    deleteQnaFiles,
  };
}; 