'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useQna } from "@/components/hooks/useQna";
import { useAuth } from "@/contexts/authContexts";

// 타입 정의
interface Question {
  id: number;
  title: string;
  content: string;
  answer?: string;
  answeredBy?: string;
  createdAt: string;
  updatedAt?: string;
  history?: { answer: string; updatedAt: string }[];
  hidden?: boolean;
}

export default function AdminQuestionBoard() {
  const { Qnas, loadInitialQna, addComment, deleteQna, deleteCommentFromQna } = useQna();
  const { user } = useAuth();
  const [selected, setSelected] = useState<any>(null);
  const [answer, setAnswer] = useState("");
  const [responder, setResponder] = useState("");
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [search, setSearch] = useState('');
  const [desc, setDesc] = useState(true);

  useEffect(() => {
    loadInitialQna();
  }, []);

  // QnA 필터링/정렬
  const filtered = Qnas
    .filter((q) => filter === 'answered' ? q.comments?.length : filter === 'unanswered' ? !q.comments?.length : true)
    .filter((q) =>
      q.qnaTitle.toLowerCase().includes(search.toLowerCase()) ||
      q.qnaContent.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      desc
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  const handleView = (q: any) => {
    setSelected(q);
    setAnswer("");
    setResponder("");
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
  };

  const handleHide = async (id: number) => {
    await deleteQna(id);
    setSelected(null);
    loadInitialQna();
  };

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
            {filtered.map((q) => (
              <li
                key={q.qnaId}
                className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${selected?.qnaId === q.qnaId ? 'bg-gray-100' : ''}`}
                onClick={() => handleView(q)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{q.qnaTitle}</h3>
                    <p className="text-sm text-gray-500">{new Date(q.createdAt).toLocaleString()}</p>
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
            <div className="bg-gray-50 border rounded-lg shadow-sm p-4 space-y-4 min-h-screen">
              <h2 className="text-xl font-bold">{selected.qnaTitle}</h2>
              <p className="whitespace-pre-wrap text-gray-700">{selected.qnaContent}</p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full border rounded p-2 h-32"
                placeholder="답변을 입력하세요"
              />
              <input
                type="text"
                value={responder}
                onChange={(e) => setResponder(e.target.value)}
                placeholder="답변자 이름"
                className="border p-2 rounded w-full"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >답변 저장</Button>
                <Button
                  onClick={() => handleHide(selected.qnaId)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >질문 숨기기</Button>
              </div>
              {selected.comments && selected.comments.length > 0 && (
                <div>
                  <h3 className="font-semibold">수정 이력</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {selected.comments.map((h: any, i: number) => (
                      <li key={i}>[{new Date(h.createdAt).toLocaleString()}] {h.commentContent}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">왼쪽에서 질문을 선택하세요.</p>
          )}
        </section>
      </div>
    </main>
  );
}
