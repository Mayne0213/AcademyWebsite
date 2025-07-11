export interface Announcement {
  announcementId: number;
  title: string;
  content?: string; // 목록에서는 선택적
  authorId: number;
  isItAssetAnnouncement: boolean;
  files?: {  // 목록에서는 선택적
    url: string; // S3 링크
    name: string; // 파일명
    type: string; // MIME 타입
  }[];
  academies?: {
    academyId: number;
    academyName: string;
  }[];
  author?: {
    adminName: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 상세 조회용 타입
export interface AnnouncementDetail extends Announcement {
  content: string; // 필수
  files: {  // 필수
    url: string;
    name: string;
    type: string;
  }[];
}
