'use client';

import { useState, useEffect } from 'react';
import { useQnABoardStore } from '@/src/entities/qna/model/store';
import { useQnAFeatureStore } from '@/src/features/qnaCRUD';
import { Button } from '@/src/shared/ui/button';

interface QnaReadProps {
  onQnaSelect: (qnaId: number) => void;
  selectedQnaId: number | null;
}

export default function QnaRead({ onQnaSelect, selectedQnaId }: QnaReadProps) {
  const { qnas, isLoading } = useQnABoardStore();
  const { readQnAs } = useQnAFeatureStore();
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    readQnAs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 필터링된 QnA 목록
  const filteredQnas = qnas.filter(q => {
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

  if (isLoading) {
    return (
      <div className="border rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (filteredQnas.length === 0) {
    return (
      <div className="border rounded-lg shadow-sm p-8 text-center">
        <div className="text-gray-500">질문이 없습니다.</div>
      </div>
    );
  }

  return (
    <section className="border rounded-lg shadow-sm">
      {/* 필터 및 검색 UI */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap items-center gap-4">
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
      </div>

      {/* QnA 목록 */}
      <ul>
        {filteredQnas.map((q) => (
          <li
            key={q.qnaId}
            className={`p-4 border-b bg-white hover:bg-gray-50 cursor-pointer ${selectedQnaId === q.qnaId ? 'bg-gray-100' : ''}`}
            onClick={() => onQnaSelect(q.qnaId)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{q.qnaTitle}</h3>
                <p className="text-sm text-gray-500">{new Date(q.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-600">{q.student?.studentName || "알 수 없음"}</p>
              </div>
              <span className={`text-sm font-medium ${(q.isItAnswered ? 'text-green-600' : 'text-red-500')}`}>
                {q.isItAnswered ? '답변 완료' : '미답변'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
