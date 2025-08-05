"use client";

import React, { useState } from "react";
import {
  Calendar,
  Edit,
  Trash2,
  User,
  Pin,
  FileText,
} from "lucide-react";
import { Announcement, AnnouncementDetail } from "@/src/entities/announcement/model/types";
import UpdateAnnouncement from "./UpdateAnnouncement";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";
import { FileItem } from "@/src/entities/file/ui";
import { FORMATS } from "@/src/shared/lib/formats";

interface Props {
  announcement: Announcement;
  isAssetOnly?: boolean;
}

const AnnouncementItemWithUD: React.FC<Props> = ({
  announcement,
  isAssetOnly = false,
}) => {
  const { readAnnouncementById, deleteAnnouncement, toggleImportantAnnouncement } = useAnnouncementFeatureStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [detailData, setDetailData] = useState<AnnouncementDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "정말 삭제하시겠습니까?\n삭제된 글은 복구될 수 없습니다.",
    );
    if (confirmed) {
      deleteAnnouncement(announcement.announcementId, isAssetOnly);
    }
  };

  const loadDetailData = async () => {
    if (!detailData) {
      setIsLoadingDetail(true);
      setDetailData(await readAnnouncementById(announcement.announcementId));
      setIsLoadingDetail(false);
    }
  };

  // 수정 모드일 때 EditAnnouncement 렌더링
  if (isEditing) {
    if (!detailData) {
      return (
        <div className="border p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span className="ml-2 text-gray-600">수정 데이터를 불러오는 중...</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className="border p-4 rounded-lg shadow-sm">
        <UpdateAnnouncement
          announcement={detailData}
          onCancel={() => {
            setIsEditing(false);
            setDetailData(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
      {/* Header */}
      <div
        className="p-4 sm:p-6 cursor-pointer relative"
        onClick={() => {
          setIsExpanded(!isExpanded);
          loadDetailData();
        }}
      >
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-start mb-1 gap-1">
            <h3
              className="text-gray-900 mb-1 text-lg"
            >
              {announcement.announcementTitle}
            </h3>
              {(announcement.fileCount ?? 0) > 0 && (
                  <FileText className="w-3 h-3 text-blue-500" />
              )}
            </div>
            <div
              className="flex flex-wrap items-center gap-2 text-gray-500 text-sm"
            >
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{announcement.author?.adminName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{FORMATS.formatDate(announcement.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1 sm:gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {toggleImportantAnnouncement(announcement.announcementId, !announcement.isItImportantAnnouncement)}}
              className={`p-1 sm:p-2 transition-colors ${
                announcement.isItImportantAnnouncement 
                  ? 'text-yellow-600 hover:text-yellow-700' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title={announcement.isItImportantAnnouncement ? '중요 공지 해제' : '중요 공지 설정'}
            >
              <Pin className={announcement.isItImportantAnnouncement ? 'fill-current w-5 h-5 text-yellow-500' : 'w-5 h-5 text-gray-500'} />
            </button>
            <button
              onClick={() => {
                setIsEditing(true);
                loadDetailData();
              }}
              className="p-1 sm:p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="수정"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 sm:p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="삭제"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-300 p-4 sm:p-6 bg-gray-25">
          <div className="">
            {isLoadingDetail ? (
              <div className="flex items-center">
                <span className="ml-2 text-gray-400">불러오는 중...</span>
              </div>
            ) : detailData ? (
              <>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {detailData.announcementContent || "공지 내용이 없습니다."}
                </p>

                {/* 파일 목록 */}
                {detailData.announcementFiles && detailData.announcementFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">첨부 파일:</h4>
                    <div className="space-y-2">
                      {detailData.announcementFiles.map((file, index) => (
                        <FileItem
                          key={index}
                          file={{
                            fileType: file.fileType || 'application/octet-stream',
                            originalName: file.originalName,
                            key: file.key,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </>
            ) : (
              <p className="text-gray-500">내용을 불러올 수 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementItemWithUD; 