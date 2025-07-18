"use client";

import React, { useState } from "react";
import {
  Calendar,
  Edit,
  Trash2,
  User,
} from "lucide-react";
import { Announcement, AnnouncementDetail } from "@/components/type/announcementType";
import EditAnnouncement from "./editAnnouncement";
import useAnnouncement from "@/components/hooks/useAnnouncement";
import AttachedFile from "@/components/attachedFile";

interface Props {
  announcement: Announcement;
  isCompact?: boolean;
}

const AnnouncementItem: React.FC<Props> = ({
  announcement,
  isCompact = false,
}) => {
  const { updateAnnouncement, removeAnnouncement, getAnnouncementDetail } = useAnnouncement();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [detailData, setDetailData] = useState<AnnouncementDetail | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "정말 삭제하시겠습니까?\n삭제된 글은 복구될 수 없습니다.",
    );
    if (confirmed) {
      removeAnnouncement(announcement.announcementId);
    }
  };

  const handleUpdate = (updated: Announcement) => {
    const updateInput = {
      announcementId: updated.announcementId,
      title: updated.title,
      content: updated.content || "",
      authorId: updated.authorId,
      isItAssetAnnouncement: updated.isItAssetAnnouncement,
      files: updated.files,
    };
    updateAnnouncement(updateInput);
    setIsEditing(false);
  };

  const handleExpand = async () => {
    if (!isExpanded && !detailData) {
      setIsLoadingDetail(true);
      try {
        const detail = await getAnnouncementDetail(announcement.announcementId);
        console.log("상세 데이터 받아옴:", detail);
        console.log("파일 데이터:", detail?.files);
        setDetailData(detail);
      } catch (error) {
        console.error("Failed to load announcement detail:", error);
      } finally {
        setIsLoadingDetail(false);
      }
    }
    setIsExpanded(!isExpanded);
  };

  if (isEditing) {
    return (
      <div className="border p-4 rounded-lg shadow-sm">
        <EditAnnouncement
          announcement={detailData || announcement}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-300 overflow-hidden">
      {/* Header */}
      <div
        className={`p-4 sm:p-6 cursor-pointer relative ${isCompact ? "text-sm" : ""}`}
        onClick={handleExpand}
      >
        <div className="flex justify-between items-start gap-2 sm:gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <h3
              className={`text-gray-900 mb-1 ${isCompact ? "text-base truncate" : "text-lg"}`}
            >
              {announcement.title}
            </h3>
            <div
              className={`flex flex-wrap items-center gap-2 text-gray-500 ${isCompact ? "text-xs" : "text-sm"}`}
            >
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>
                  {announcement.author?.adminName || "작성자 정보 없음"}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(announcement.updatedAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
          </div>

          <div
            className="flex items-center gap-1 sm:gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleEdit}
              className="p-1 sm:p-2 text-gray-500 hover:text-blue-600"
              title="수정"
            >
              <Edit className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 sm:p-2 text-gray-500 hover:text-red-600"
              title="삭제"
            >
              <Trash2 className={isCompact ? "w-4 h-4" : "w-5 h-5"} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-gray-300 p-4 sm:p-6 bg-gray-25">
          <div className="">
            {isLoadingDetail ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                <span className="ml-2 text-gray-600">내용을 불러오는 중...</span>
              </div>
            ) : detailData ? (
              <>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {detailData.content || "공지 내용이 없습니다."}
                </p>
                {/* 첨부파일 표시 */}
                {console.log("AttachedFile 호출 전:", { detailData, files: detailData.files })}
                {detailData.files && detailData.files.length > 0 && (
                  <AttachedFile files={detailData.files} isCompact={isCompact} />
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

export default AnnouncementItem;
