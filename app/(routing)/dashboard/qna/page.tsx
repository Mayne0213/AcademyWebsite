"use client";

import { useEffect, useState } from "react";
import { Calendar, Trash2 } from "lucide-react";
import Link from "next/link";
import Header from "@/src/widgets/header/DashboardHeader";
import { Pagination } from "@/src/shared/ui";
import { useAuth } from "@/src/app/providers";
import { useQnABoardStore } from "@/src/entities/qna/model/store";
import { useQnAFeatureStore } from "@/src/features/qnaCRUD";
import DeviceType, { useDeviceDetect } from "@/src/shared/lib/deviceType";
import { FileDisplay } from "@/src/entities/file/ui";
import { CreateCommentRequest } from "@/src/entities/qna/model/types";
import { apiGet } from "@/src/shared/api";

interface ExpandedItems {
  [key: number]: boolean;
}

interface ExpandedDetail {
  qnaContent: string;
  qnaImageUrl: string | null;
  comments: any[];
  files: any[];
}

// QnA 헤더 컴포넌트
const QnaHeader: React.FC<{
  item: any;
  isCompact: boolean;
  onDelete: (id: number) => void;
  onExpand: () => void;
}> = ({ item, isCompact, onDelete, onExpand }) => (
  <div
    className={`p-4 sm:p-6 cursor-pointer relative ${
      isCompact ? "text-sm" : ""
    }`}
    onClick={onExpand}
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
          {item.student?.studentName || "알 수 없음"}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(item.updatedAt).toLocaleDateString("ko-KR")}
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
          onClick={() => onDelete(item.qnaId)}
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
);

// QnA 내용 컴포넌트
const QnaContent: React.FC<{
  detail: ExpandedDetail | undefined;
  isCompact: boolean;
  isDetailLoading: boolean;
}> = ({ detail, isCompact, isDetailLoading }) => (
  <div className="prose prose-sm max-w-none space-y-4">
    {isDetailLoading ? (
      <div className="text-gray-400">불러오는 중...</div>
    ) : detail ? (
      <>
        <p
          className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${isCompact ? "text-base" : "text-lg"}`}
        >
          {detail.qnaContent || "내용이 없습니다."}
        </p>

        {/* 첨부 파일 섹션 */}
        {detail.files && detail.files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              첨부 파일 ({detail.files.length}개)
            </h4>
            <div className="space-y-2">
              {detail.files.map((fileItem: any) => (
                <FileDisplay
                  key={fileItem.fileId}
                  file={fileItem}
                  onDelete={() => {}} // 읽기 전용이므로 빈 함수
                  showDelete={false}
                />
              ))}
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="text-gray-400">상세 정보를 불러올 수 없습니다.</div>
    )}
  </div>
);

// 댓글 컴포넌트
const QnaComments: React.FC<{
  detail: ExpandedDetail | undefined;
  qnaId: number;
  user: any;
  isCompact: boolean;
  commentInputs: { [key: number]: string };
  onCommentChange: (qnaId: number, value: string) => void;
  onCommentSubmit: (qnaId: number) => void;
  onDeleteComment: (qnaId: number, commentId: number) => void;
}> = ({
  detail,
  qnaId,
  user,
  isCompact,
  commentInputs,
  onCommentChange,
  onCommentSubmit,
  onDeleteComment
}) => (
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
        </li>
      ))}
    </ul>
  </div>
);

// 로딩 스켈레톤 컴포넌트
const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
);

// 빈 상태 컴포넌트
const EmptyState: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
    <div className="text-gray-400 mb-4">
      <Calendar className="w-12 h-12 mx-auto" />
    </div>
    <p className="text-gray-500">자신이 올린 질문만 표시됩니다.</p>
  </div>
);


const QnaBoard: React.FC = () => {
  const ITEMS_PER_PAGE = 10;
  const { user } = useAuth();
  const deviceType = useDeviceDetect();
  const isCompact = deviceType ? deviceType <= DeviceType.SMALLTABLET : false;

  const {
    qnas,
    isLoading,
  } = useQnABoardStore();
  const {
    readQnAs,
    readPersonalQnAs,
    deleteQnA,
    createComment,
    deleteComment,
  } = useQnAFeatureStore();

  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});
  const [loadingDetails, setLoadingDetails] = useState<{ [id: number]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {},
  );
  const [expandedDetails, setExpandedDetails] = useState<{ [id: number]: ExpandedDetail }>({});

  const totalPages = Math.ceil(qnas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  useEffect(() => {
    if (!user?.memberId) {
      return;
    }

    if (user.role === "ADMIN" || user.role === "DEVELOPER") {
      readQnAs();
    } else {
      readPersonalQnAs();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.memberId, user?.role]);

  const handleDelete = async (id: number) => {
    if (confirm("정말로 이 질문을 삭제하시겠습니까?")) {
      deleteQnA(id);
    }
  };

  const handleDeleteComment = async (qnaId: number, commentId: number) => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      await deleteComment(qnaId, commentId);
    }
  };

  const handleCommentChange = (qnaId: number, value: string) => {
    setCommentInputs((prev) => ({ ...prev, [qnaId]: value }));
  };

  const handleCommentSubmit = async (qnaId: number) => {
    const content = commentInputs[qnaId]?.trim();
    if (!content) return;

    const newQnaComment: CreateCommentRequest = {
      commentContent: content,
      commentMemberId: user?.memberId as number,
      qnaId: qnaId,
    };

    try {
      await createComment(qnaId, newQnaComment);
      setCommentInputs((prev) => ({ ...prev, [qnaId]: "" }));
    } catch (err) {
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
      const data = await apiGet<any>(`/api/qna/${qnaId}`);
      if (data) {
        setExpandedDetails((prev) => ({
          ...prev,
          [qnaId]: {
            qnaContent: data.qnaContent,
            qnaImageUrl: data.files?.[0]?.fileUrl,
            comments: data.comments || [],
            files: data.files || [],
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
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {qnas.length === 0 ? (
                <EmptyState />
              ) : (
                qnas.slice(startIndex, endIndex).map((item, index) => {
                  const globalIndex = startIndex + index;
                  const isExpanded = expandedItems[globalIndex];
                  const detail = expandedDetails[item.qnaId] as ExpandedDetail | undefined;
                  const isDetailLoading = loadingDetails[item.qnaId];

                  return (
                    <div
                      key={item.qnaId}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <QnaHeader
                        item={item}
                        isCompact={isCompact}
                        onDelete={handleDelete}
                        onExpand={() => handleExpand(globalIndex, item.qnaId)}
                      />

                      {/* Content + Comments */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 p-4 sm:p-6 bg-gray-25 space-y-4">
                          <QnaContent
                            detail={detail}
                            isCompact={isCompact}
                            isDetailLoading={isDetailLoading}
                          />

                          {/* 구분선 */}
                          <hr className="my-4 border-t border-gray-200" />

                          {/* 댓글 섹션 */}
                          <QnaComments
                            detail={detail}
                            qnaId={item.qnaId}
                            user={user}
                            isCompact={isCompact}
                            commentInputs={commentInputs}
                            onCommentChange={handleCommentChange}
                            onCommentSubmit={handleCommentSubmit}
                            onDeleteComment={handleDeleteComment}
                          />
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
          <Link href="/dashboard/qna/add">
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
