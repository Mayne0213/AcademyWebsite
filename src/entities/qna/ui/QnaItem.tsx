'use client';

import { Button } from '@/src/shared/ui/button';
import { FileDisplay } from '@/src/entities/file/ui';
import { Trash2 } from 'lucide-react';
import { useQnAFeatureStore } from '@/src/features/qnaCRUD';
import { useQnaDetailStore } from '@/src/entities/qna/model/store';
import { useAuth } from "@/src/app/providers";
import { useState, useEffect } from 'react';

interface QnaItemProps {
  qnaId: number | null;
}

export default function QnaItem({
  qnaId,
}: QnaItemProps) {
  const { createComment, deleteComment, readQnaDetail } = useQnAFeatureStore();
  const { selectedDetail, isDetailLoading } = useQnaDetailStore();
  const { user } = useAuth();
  const [answer, setAnswer] = useState("");

  // qnaId가 변경될 때마다 상세 정보 로드
  useEffect(() => {
    if (qnaId) {
      readQnaDetail(qnaId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qnaId]);

  const handleSave = async () => {
    if (!qnaId || !user?.memberId) return;

    try {
      const newComment = {
        commentContent: answer,
        commentMemberId: user.memberId,
        qnaId: qnaId
      };

      await createComment(qnaId, newComment);
      setAnswer("");
    } catch (error) {
      console.error("답변 저장 실패:", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!qnaId) return;
    
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteComment(qnaId, commentId);
      } catch (error) {
      }
    }
  };

  if (!qnaId) {
    return (
      <div className="bg-white border flex justify-center text-2xl font-sansKR-SemiBold items-center h-full rounded-lg shadow-sm p-8 text-center">
        왼쪽에서 질문을 선택하세요.
      </div>
    );
  }

  if (isDetailLoading) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-8 flex justify-center items-center text-lg text-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!selectedDetail) {
    return (
      <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-500 text-lg">질문 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      {/* 제목 및 메타데이터 */}
      <div className="border-b p-6">
        <h2 className="text-xl font-sansKR-SemiBold text-gray-900 mb-3">{selectedDetail.qnaTitle}</h2>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <span>작성자: {selectedDetail.student?.studentName || "알 수 없음"}</span>
          <span>|</span>
          <span>작성일: {new Date(selectedDetail.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 질문 내용 */}
      <div className="p-6">
        <div className="text-gray-800 leading-relaxed">
          {selectedDetail.qnaContent}
        </div>
        
        {/* 첨부 파일 표시 */}
        {selectedDetail.files && selectedDetail.files.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              첨부 파일 ({selectedDetail.files.length}개)
            </h4>
            <div className="space-y-2">
              {selectedDetail.files.map((fileItem: any) => (
                <FileDisplay
                  key={fileItem.fileId}
                  file={fileItem}
                  showDelete={false}
                  className="bg-gray-50"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 답변 목록 */}
      {selectedDetail.comments && selectedDetail.comments.length > 0 && (
        <div className="border-t bg-gray-50">
          <div className="p-6">
            <h3 className="font-sansKR-SemiBold text-gray-900 mb-4">답변 ({selectedDetail.comments.length}개)</h3>
            <div className="space-y-4">
              {selectedDetail.comments.map((comment: any) => (
                <div key={comment.commentId} className="bg-white rounded-lg p-4 border shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {comment?.admin?.adminName || 
                         comment?.student?.studentName || 
                         "알 수 없음"}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {comment?.adminId? '관리자' : '학생'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.commentId)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="댓글 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {comment.commentContent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 답변 작성 */}
      <div className="border-t p-6 bg-white">
        <h3 className="font-sansKR-SemiBold text-gray-900 mb-3">새 답변 작성</h3>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 h-32 mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="답변을 입력하세요"
        />
        <div className="flex gap-3 justify-end">
          <Button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            답변 저장
          </Button>
        </div>
      </div>
    </div>
  );
}
