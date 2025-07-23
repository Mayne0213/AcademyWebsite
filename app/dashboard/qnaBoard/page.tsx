"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import Header from "@/app/DashboardStructureComponent/header";
import Pagination from "@/components/main/student/paginationControls";
import { useAuth } from "@/contexts/authContexts";
import { useQna } from "@/components/hooks/useQna";
import DeviceType, { useDeviceDetect } from "@/components/home/deviceType";
import AttachedFile from "@/components/attachedFile";
import { QnaCommentFormInput } from "@/components/type/qnaType";

interface ExpandedItems {
  [key: number]: boolean;
}

const QnaBoard: React.FC = () => {
  const ITEMS_PER_PAGE = 10;
  const { user } = useAuth();
  const deviceType = useDeviceDetect();
  const isCompact = deviceType ? deviceType <= DeviceType.SMALLTABLET : false;

  const {
    loading,
    Qnas,
    addComment,
    loadInitialPersonalQna,
    loadInitialQna,
    deleteQna,
    deleteCommentFromQna,
    expandedDetails,
    setExpandedDetails,
  } = useQna();
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
  const [loadingDetails, setLoadingDetails] = useState<{ [id: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {},
  );

  const totalPages = Math.ceil(Qnas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const router = useRouter();

  useEffect(() => {
    if (!user?.memberId) return;

    if (user.role === "ADMIN" || user.role === "DEVELOPER") {
      loadInitialQna();
    } else {
      loadInitialPersonalQna();
    }
  }, [user, loadInitialPersonalQna, loadInitialQna]);

  const handleDelete = async (id: number) => {
    if (confirm("정말로 이 질문을 삭제하시겠습니까?")) {
      deleteQna(id);
    }
  };

  const handleDeleteComment = async (qnaId: number, commentId: number) => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      await deleteCommentFromQna(qnaId, commentId);
      // 상태 업데이트는 zustand store에서만!
    }
  };

  const handleCommentChange = (qnaId: number, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [qnaId]: value }));
  };

  const handleCommentSubmit = async (qnaId: number) => {
    const content = commentInputs[qnaId]?.trim();
    if (!content) return;

    const newQnaComment: QnaCommentFormInput = {
      commentContent: content,
      commentMemberId: user?.memberId as number,
      qnaId: qnaId,
    };

    try {
      await addComment(newQnaComment);
      setCommentInputs((prev) => ({ ...prev, [qnaId]: "" }));
    } catch (err) {
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleExpand = async (globalIndex: number, qnaId: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [globalIndex]: !prev[globalIndex],
    }));
    // 이미 상세가 로드되어 있거나, 닫는 경우 fetch하지 않음
    if (expandedItems[globalIndex] || expandedDetails[qnaId]) return;
    setLoadingDetails((prev) => ({ ...prev, [qnaId]: true }));
    try {
      const res = await fetch(`/api/qna/${qnaId}`);
      if (res.ok) {
        const data = await res.json();
        setExpandedDetails((prev) => ({
          ...prev,
          [qnaId]: {
            qnaContent: data.qnaContent,
            qnaImageUrl: data.qnaImageUrl,
            comments: data.comments || [],
          },
        }));
      }
    } finally {
      setLoadingDetails((prev) => ({ ...prev, [qnaId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 space-y-6">
      <Header
        title="질문 게시판"
        description="궁금한 내용을 확인하고 질문해보세요"
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {Qnas.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="w-12 h-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">자신이 올린 질문만 표시됩니다.</p>
                </div>
              ) : (
                Qnas.slice(startIndex, endIndex).map((item, index) => {
                  const globalIndex = startIndex + index;
                  const isExpanded = expandedItems[globalIndex];
                  const detail = expandedDetails[item.qnaId];
                  const isDetailLoading = loadingDetails[item.qnaId];
                  return (
                    <div
                      key={item.qnaId}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      {/* Header */}
                      <div
                        className={`p-4 sm:p-6 cursor-pointer relative ${
                          isCompact ? "text-sm" : ""
                        }`}
                        onClick={() => handleExpand(globalIndex, item.qnaId)}
                      >
                        <div className="flex justify-between items-start gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3
                                className={`text-gray-900 mb-1 ${
                                  isCompact ? "text-base truncate" : "text-lg"
                                }`}
                              >
                                {item.qnaTitle}
                              </h3>
                            </div>
                            <div
                              className={`flex flex-wrap items-center gap-2 text-gray-500 ${
                                isCompact ? "text-xs" : "text-sm"
                              }`}
                            >
                              {item.user?.student?.studentName}
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

                          {/* 수정/삭제 버튼 */}
                          <div
                            className="flex items-center gap-1 sm:gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => handleDelete(item.qnaId)}
                              className="p-1 sm:p-2 text-gray-500 hover:text-red-600"
                              title="삭제"
                            >
                              <Trash2
                                className={isCompact ? "w-4 h-4" : "w-5 h-5"}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content + Comments */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-25 space-y-4">
                          <div className="prose prose-sm max-w-none space-y-4">
                            {isDetailLoading ? (
                              <div className="text-gray-400">불러오는 중...</div>
                            ) : detail ? (
                              <>
                                {/* 첨부된 이미지 표시 */}
                                <AttachedFile
                                  fileUrl={detail.qnaImageUrl || undefined}
                                  isCompact={isCompact}
                                />
                                <p
                                  className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${isCompact ? "text-base" : "text-lg"}`}
                                >
                                  {detail.qnaContent || "내용이 없습니다."}
                                </p>
                              </>
                            ) : (
                              <div className="text-gray-400">상세 정보를 불러올 수 없습니다.</div>
                            )}
                          </div>

                          {/* 구분선 */}
                          <hr className="my-4 border-t border-gray-200" />

                          {/* 댓글 섹션 */}
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
                              댓글 {detail?.comments?.length ?? 0}개
                            </h4>

                            {/* 댓글 목록 */}
                            <ul className="space-y-3 mb-3">
                              {detail?.comments?.map((comment) => (
                                <li
                                  key={comment.commentId}
                                  className="bg-white rounded-md px-4 py-2 text-sm text-gray-800 shadow-sm border border-gray-100 flex justify-between items-center"
                                >
                                  <p className="whitespace-pre-wrap">
                                    {comment.commentContent}
                                  </p>
                                  <Trash2
                                    className={`cursor-pointer ${isCompact ? "w-4 h-4" : "w-5 h-5"}`}
                                    onClick={() => {
                                      handleDeleteComment(
                                        item.qnaId,
                                        comment.commentId,
                                      );
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>

                            {/* 댓글 입력 */}
                            {user && (
                              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                <textarea
                                  rows={2}
                                  placeholder="댓글을 입력하세요"
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                  value={commentInputs[item.qnaId] || ""}
                                  onChange={(e) =>
                                    handleCommentChange(
                                      item.qnaId,
                                      e.target.value,
                                    )
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleCommentSubmit(item.qnaId)
                                  }
                                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm shrink-0"
                                >
                                  등록
                                </button>
                              </div>
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

      {/* 질문 작성 버튼 */}
      {user?.role === "STUDENT" && (
        <div className="max-w-6xl mx-auto px-4 flex justify-end">
          <Link href="/dashboard/qnaBoard/add">
            <button
              className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition ${
                isCompact ? "text-sm px-3 py-1.5" : ""
              }`}
            >
              질문 작성
            </button>
          </Link>
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default QnaBoard;
