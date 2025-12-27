import React, { useState } from 'react';
import { Announcement, AnnouncementSummary } from '@/src/entities/announcement/model/types';
import { ChevronDown, ChevronUp, Calendar, User, Edit, Trash2, Pin, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FileItem } from '@/src/entities/file/ui';
import { extractYouTubeVideoId, convertUrlsToLinks } from '@/src/shared/lib/utils';
import { announcementApi } from '../api';

// 공지사항 헤더 컴포넌트
const AnnouncementHeader = ({ 
  announcement, 
  isExpanded, 
  onExpand, 
  router 
}: {
  announcement: Announcement;
  isExpanded: boolean;
  onExpand: (announcementId: number) => void;
  router: any;
}) => (
  <div
    className="p-4 sm:p-6 cursor-pointer relative text-sm smalltablet:text-base"
    onClick={() => onExpand(announcement.announcementId)}
  >
    <div className="flex justify-between items-start gap-2 sm:gap-4">
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-start mb-1 gap-1">
          <h3 className="text-gray-900 flex items-center gap-1 text-base smalltablet:text-lg">
            {announcement.announcementTitle}
            {(announcement.fileCount ?? 0) > 0 && (
                <FileText className="w-4 h-4 text-blue-500" />
            )}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-gray-500 text-xs smalltablet:text-sm">
          <div className="hidden smalltablet:flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>연구소 조교</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(announcement.updatedAt).toLocaleDateString("ko-KR")}
            </span>
          </div>
        </div>
      </div>

      {isExpanded ? (
        <ChevronUp className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      )}
    </div>
  </div>
);

// 공지사항 내용 컴포넌트
const AnnouncementContent = ({ 
  detail, 
  isDetailLoading, 
  isExpanded 
}: {
  detail: any;
  isDetailLoading: boolean;
  isExpanded: boolean;
}) => {
  if (!isExpanded) return null;

  return (
    <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-25 space-y-4">
      <div className="prose prose-sm max-w-none space-y-4">
        {isDetailLoading ? (
          <div className="text-gray-400">불러오는 중...</div>
        ) : detail ? (
          <>
            {detail.content && (() => {
              const videoId = extractYouTubeVideoId(detail.content);
              return videoId ? (
                <div className="my-4">
                  <iframe
                    width="100%"
                    height="auto"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube asset video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg aspect-video"
                  ></iframe>
                </div>
              ) : null;
            })()}
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-base smalltablet:text-lg">
              {detail.content ? convertUrlsToLinks(detail.content) : "공지사항 내용이 없습니다."}
            </p>
            
            {detail.files && detail.files.length > 0 && (
              <div className="mt-6">
                <div className="space-y-2">
                  {detail.files.map((file: any, index: number) => (
                    <FileItem key={index} file={file} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-400">상세 정보를 불러올 수 없습니다.</div>
        )}
      </div>
    </div>
  );
};

// 메인 AnnouncementCard 컴포넌트
interface AnnouncementCardProps {
  announcement: Announcement | AnnouncementSummary;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ 
  announcement, 
}) => {
  const router = useRouter();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [detail, setDetail] = useState<{ content: string; files: any[] } | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const handleExpand = async (announcementId: number) => {
    setIsExpanded(!isExpanded);
    
    if (!isExpanded && !detail) {
      setIsDetailLoading(true);
      const result = await announcementApi.getAnnouncement(announcementId);
      setDetail({
        content: result.announcementContent,
        files: result.files || []
      });
      setIsDetailLoading(false);
    }
  };

  return (
    <div
      className={`${announcement.isItImportantAnnouncement ? "border-gray-500" : "border-gray-100"} bg-white rounded-xl shadow-sm border overflow-hidden`}
    >
      <AnnouncementHeader
        announcement={announcement as Announcement}
        isExpanded={isExpanded}
        onExpand={handleExpand}
        router={router}
      />
      <AnnouncementContent
        detail={detail}
        isDetailLoading={isDetailLoading}
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default AnnouncementCard; 