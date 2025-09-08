import { File as FileEntity } from "@/src/entities/file/model/types";

/**
 * Announcement의 파일을 FileEntity로 변환
 */
export const convertAnnouncementFileToEntity = (file: any): FileEntity => ({
  fileId: file.fileId,
  fileName: file.key,
  originalName: file.originalName,
  fileUrl: file.key,
  fileType: file.fileType,
  fileSize: file.fileSize,
  createdAt: new Date(),
});