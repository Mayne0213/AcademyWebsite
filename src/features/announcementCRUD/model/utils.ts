import { AnnouncementDetail } from "@/src/entities/announcement/model/types";
import { File as FileEntity } from "@/src/entities/file/model/types";

/**
 * AnnouncementDetail의 파일을 FileEntity로 변환
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
/**
 * 공지사항 데이터 정규화
 */
export const normalizeAnnouncementData = (data: Partial<AnnouncementDetail>): AnnouncementDetail => {
  return {
    announcementId: data.announcementId || 0,
    announcementTitle: data.announcementTitle || "",
    announcementContent: data.announcementContent || "",
    authorId: data.authorId || 0,
    isItAssetAnnouncement: data.isItAssetAnnouncement || false,
    isItImportantAnnouncement: data.isItImportantAnnouncement || false,
    announcementFiles: data.announcementFiles || [],
    academies: data.academies || [],
  };
}; 