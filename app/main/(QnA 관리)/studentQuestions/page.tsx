'use client';

import { Button } from '@/src/shared/ui/button';
import { useEffect, useState } from 'react';
import { useQna } from "@/components/hooks/useQna";
import { useAuth } from "@/contexts/authContexts";
import { apiGet } from "@/src/shared/api";
import { FileDisplay } from '@/src/entities/file/ui';
import { Trash2 } from 'lucide-react';

export default function AdminQuestionBoard() {
  const { Qnas, loadInitialQna, addComment, deleteQna, deleteCommentFromQna } = useQna();
  const { user } = useAuth();
  const [selected, setSelected] = useState<any>(null);
  const [selectedDetail, setSelectedDetail] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [responder, setResponder] = useState("");
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadInitialQna();
  }, [loadInitialQna]);

  const handleView = async (q: any) => {
    setSelected(q);
    setAnswer("");
    setResponder("");
    
    // 상세 정보 로드
    try {
      const data = await apiGet<any>(`/api/qna/${q.qnaId}`);
      if (data) {
        setSelectedDetail(data);
      }
    } catch (error) {
      console.error("QnA 상세 정보 로드 실패:", error);
    }
  };

  const handleSave = async () => {
    if (!selected) return;
    if (!user?.memberId) return;
    await addComment({
      commentContent: answer,
      commentMemberId: user.memberId,
      qnaId: selected.qnaId,
    });
    setAnswer("");
    setResponder("");
    loadInitialQna();
    // 상세 정보 다시 로드
    handleView(selected);
  };

  const handleHide = async (id: number) => {
    await deleteQna(id);
    setSelected(null);
    setSelectedDetail(null);
    loadInitialQna();
  };

  const handleDeleteComment = async (qnaId: number, commentId: number) => {
    if (confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      await deleteCommentFromQna(qnaId, commentId);
      // 상세 정보 다시 로드
      if (selected) {
        handleView(selected);
      }
    }
  };

  // 필터링된 QnA 목록
  const filteredQnas = Qnas.filter(q => {
    const matchesSearch = q.qnaTitle.toLowerCase().includes(search.toLowerCase()) ||
                         q.qnaContent.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    
    const hasComments = q.comments && q.comments.length > 0;
    
    switch (filter) {
      case 'answered':
        return hasComments;
      case 'unanswered':
        return !hasComments;
      default:
        return true;
    }
  });

  return (
    <main className="min-h-screen bg-white rounded-xl p-8 text-gray-800">
      <h1 className="text-3xl font-sansKR-SemiBold mb-6">📋 관리자 질문 게시판</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="space-x-2">
          <Button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${
              filter === 'all'
                ? 'bg-blue-500 text-white hover:bg-blue-500'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            전체
          </Button>
          <Button
            onClick={() => setFilter('unanswered')}
            className={`px-3 py-1 rounded ${
              filter === 'unanswered'
                ? 'bg-blue-500 text-white hover:bg-blue-500'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            미답변
          </Button>
          <Button
            onClick={() => setFilter('answered')}
            className={`px-3 py-1 rounded ${
              filter === 'answered'
                ? 'bg-blue-500 text-white hover:bg-blue-500'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            답변 완료
          </Button>
        </div>
        <input
          type="text"
          placeholder="검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-64 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen">
        <section className="border rounded-lg shadow-sm">
          <ul>
            {filteredQnas.map((q) => (
              <li
                key={q.qnaId}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selected?.qnaId === q.qnaId ? 'bg-gray-100' : ''}`}
                onClick={() => handleView(q)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{q.qnaTitle}</h3>
                    <p className="text-sm text-gray-500">{new Date(q.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{q.student?.studentName || "알 수 없음"}</p>
                  </div>
                  <span className={`text-sm font-medium ${(q.comments && q.comments.length > 0) ? 'text-green-600' : 'text-red-500'}`}>
                    {(q.comments && q.comments.length > 0) ? '답변 완료' : '미답변'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          {selected ? (
            <div className="bg-white border rounded-lg shadow-sm min-h-screen">
              {/* 제목 및 메타데이터 */}
              <div className="border-b p-6">
                <h2 className="text-xl font-sansKR-SemiBold text-gray-900 mb-3">{selected.qnaTitle}</h2>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>작성자: {selected.student?.studentName || "알 수 없음"}</span>
                  <span>|</span>
                  <span>작성일: {new Date(selected.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* 질문 내용 */}
              <div className="p-6">
                <div className="text-gray-800 leading-relaxed">
                  {selected.qnaContent}
                </div>
                
                {/* 첨부 파일 표시 */}
                {selectedDetail?.qnaFiles && selectedDetail.qnaFiles.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">
                      첨부 파일 ({selectedDetail.qnaFiles.length}개)
                    </h4>
                    <div className="space-y-2">
                      {selectedDetail.qnaFiles.map((fileItem: any) => (
                        <FileDisplay
                          key={fileItem.fileId}
                          file={fileItem.file}
                          showDelete={false}
                          className="bg-gray-50"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 답변 목록 */}
              {selectedDetail?.comments && selectedDetail.comments.length > 0 && (
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
                                onClick={() => handleDeleteComment(selected.qnaId, comment.commentId)}
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
                  <Button
                    onClick={() => handleHide(selected.qnaId)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    질문 숨기기
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">왼쪽에서 질문을 선택하세요.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
