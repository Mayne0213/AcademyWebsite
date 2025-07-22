"use client";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Edit,
  Trash2,
  Pin,
} from "lucide-react";
import useAnnouncement from "@/components/hooks/useAnnouncement";
import Link from "next/link";
import Header from "@/app/DashboardStructureComponent/header";
import Pagination from "@/components/main/student/paginationControls";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContexts";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import AttachedFile from "@/components/attachedFile";
import { toast } from "sonner";
import { Announcement } from "@/components/type/announcementType";

interface ExpandedItems {
  [key: number]: boolean;
}

// 유튜브 URL을 감지하고 임베드 코드로 변환하는 함수
const extractYouTubeEmbed = (content: string) => {
  const youtubePatterns = [
    // 긴 URL: https://www.youtube.com/watch?v=FFdHMm9dHbQ
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g,
    // 짧은 URL: https://youtu.be/FFdHMm9dHbQ
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/g,
    // 영상 재생 시점을 지정한 URL: https://youtu.be/FFdHMm9dHbQ?t=2
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)\?t=\d+/g,
    // 재생 목록에 있는 영상 URL: https://www.youtube.com/watch?v=ds-FowwO9Lg&list=PLUud9rWUXUuWLmZy_ykyuaqrkfTymPjpP
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&list=([a-zA-Z0-9_-]+)/g,
    // 쇼츠 URL: https://www.youtube.com/shorts/n2DcpqDK8C0?feature=share
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)\??[a-zA-Z0-9_=&-]*/g,
    // 쇼츠 우클릭 후 복사한 URL: https://www.youtube.com/shorts/n2DcpqDK8C0
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/g,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]+)/g,
  ];

  let videoId = null;

  // 모든 패턴을 순회하면서 매치되는 첫 번째 비디오 ID를 찾음
  for (const pattern of youtubePatterns) {
    const matches = [...content.matchAll(pattern)];
    if (matches.length > 0) {
      videoId = matches[0][1]; // 첫 번째 그룹이 비디오 ID
      break;
    }
  }

  if (videoId) {
    return (
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
    );
  }
  return null;
};


const Assets: React.FC = () => {
  const ITEMS_PER_PAGE = 10;
  const { user } = useAuth();
  const deviceType = useDeviceDetect();
  const isCompact = deviceType ? deviceType <= DeviceType.SMALLTABLET : false;

  const { assets, assetsTotalCount, isLoadingAssets, loadInitialAsset, removeAnnouncement } = useAnnouncement();
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
  const [expandedDetails, setExpandedDetails] = useState<{ [id: number]: { content: string; files: any[] } }>({});
  const [loadingDetails, setLoadingDetails] = useState<{ [id: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(assetsTotalCount / ITEMS_PER_PAGE);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent, announcement: Announcement) => {
    e.preventDefault();

    try {
      const updatedAnnouncement = {
        announcementId: announcement.announcementId,
        isItImportantAnnouncement: !announcement.isItImportantAnnouncement,
      };

      const res = await fetch(`/api/announcement/${announcement.announcementId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAnnouncement),
      });

      if (res.ok) {
        toast.success("공지사항이 수정되었습니다.");
        await loadInitialAsset(currentPage, ITEMS_PER_PAGE);
      } else {
        toast.error("수정 중 오류가 발생했습니다.");
      }
    } catch (err) {
      toast.error("수정 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    loadInitialAsset(currentPage, ITEMS_PER_PAGE);
  }, [loadInitialAsset, currentPage]);



  const handleDelete = async (id: number) => {
    if (confirm("정말로 이 공지를 삭제하시겠습니까?")) {
      removeAnnouncement(id);
    }
  };

  const handleExpand = async (globalIndex: number, announcementId: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [globalIndex]: !prev[globalIndex],
    }));
    // 이미 상세가 로드되어 있거나, 닫는 경우 fetch하지 않음
    if (expandedItems[globalIndex] || expandedDetails[announcementId]) return;
    setLoadingDetails((prev) => ({ ...prev, [announcementId]: true }));
    try {
      const res = await fetch(`/api/announcement/${announcementId}`);
      if (res.ok) {
        const data = await res.json();
        setExpandedDetails((prev) => ({
          ...prev,
          [announcementId]: { content: data.content, files: data.files || [] },
        }));
      }
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [announcementId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 space-y-6">
      <Header title="자료실" description="적극적으로 활용하세요" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-4">
          {isLoadingAssets ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[100px]"
                >
                  <div className={`p-4 sm:p-6 ${isCompact ? "text-sm" : ""}`}>
                    <div className="flex justify-between items-start gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0 space-y-2">
                        <div
                          className={`bg-gray-200 animate-pulse rounded-full ${
                            isCompact ? "h-4" : "h-5"
                          }`}
                          style={{ width: `${Math.random() * 30 + 50}%` }}
                        />
                        {/* 메타 정보 스켈레톤 */}
                        <div className="flex flex-wrap items-center gap-2">
                          {deviceType && deviceType !== DeviceType.MOBILE && (
                            <div className="flex items-center gap-1">
                              <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                              <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse" />
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {assets.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">자료가 없습니다.</p>
                </div>
              ) : (
                assets.map((item, index) => {
                  const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                  const isExpanded = expandedItems[globalIndex];
                  const detail = expandedDetails[item.announcementId];
                  const isDetailLoading = loadingDetails[item.announcementId];

                  return (
                    <div
                      key={globalIndex}
                      className={`${item.isItImportantAnnouncement ? "border-gray-500" : "border-gray-100"} bg-white rounded-xl shadow-sm border overflow-hidden`}
                    >
                      {/* Header */}
                      <div
                        className={`p-4 sm:p-6 cursor-pointer relative ${
                          isCompact ? "text-sm" : ""
                        }`}
                        onClick={() => handleExpand(globalIndex, item.announcementId)}
                      >
                        <div className="flex justify-between items-start gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0 space-y-2">
                            <h3
                              className={`text-gray-900 mb-1 ${
                                isCompact ? "text-base truncate" : "text-lg"
                              }`}
                            >
                              {item.title}
                            </h3>
                            <div
                              className={`flex flex-wrap items-center gap-2 text-gray-500 ${
                                isCompact ? "text-xs" : "text-sm"
                              }`}
                            >
                              <div
                                className={`flex items-center gap-1 ${deviceType && deviceType === DeviceType.MOBILE ? "hidden" : ""}`}
                              >
                                <User className="w-4 h-4" />
                                <span>연구소 조교</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {new Date(item.updatedAt).toLocaleDateString(
                                    "ko-KR",
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Buttons */}
                          {user?.role === "ADMIN" ? (
                            <div
                              className="flex items-center gap-1 sm:gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={(e) => onSubmit(e, item)}
                                className="p-1 sm:p-2 text-gray-500 hover:text-blue-600"
                                title="고정"
                              >
                                <Pin
                                  className={item.isItImportantAnnouncement ? "text-red-500 w-5 h-5" : "w-5 h-5"}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  router.push(
                                    `/dashboard/announcement/edit/${item.announcementId}`,
                                  )
                                }
                                className="p-1 sm:p-2 text-gray-500 hover:text-blue-600"
                                title="수정"
                              >
                                <Edit
                                  className={isCompact ? "w-4 h-4" : "w-5 h-5"}
                                />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(item.announcementId)
                                }
                                className="p-1 sm:p-2 text-gray-500 hover:text-red-600"
                                title="삭제"
                              >
                                <Trash2
                                  className={isCompact ? "w-4 h-4" : "w-5 h-5"}
                                />
                              </button>
                            </div>
                          ) : isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-25 space-y-4">
                          <div className="prose prose-sm max-w-none space-y-4">
                            {isDetailLoading ? (
                              <div className="text-gray-400">불러오는 중...</div>
                            ) : detail ? (
                              <>
                                {extractYouTubeEmbed(detail.content)}
                                <AttachedFile files={detail.files} isCompact={isCompact} />
                                <p className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${isCompact ? "text-base" : "text-lg"}`}>
                                  {detail.content || "자료실에 내용이 없습니다."}
                                </p>
                              </>
                            ) : (
                              <div className="text-gray-400">상세 정보를 불러올 수 없습니다.</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>

      {/* 작성 버튼 */}
      {user?.role === "ADMIN" && (
        <div className="max-w-6xl mx-auto px-4 flex justify-end">
          <Link href="announcement/add">
            <button
              className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
                isCompact ? "text-sm px-3 py-1.5" : ""
              }`}
            >
              자료 업로드
            </button>
          </Link>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="my-6 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Assets;
