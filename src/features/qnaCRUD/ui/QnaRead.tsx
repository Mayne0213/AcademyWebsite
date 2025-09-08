'use client';

import { useState, useEffect } from 'react';
import { useQnABoardStore } from '@/src/entities/qna/model/store';
import { useQnAFeatureStore } from '@/src/features/qnaCRUD';
import { Button } from '@/src/shared/ui/button';
import { usePaginationStore } from '@/src/shared/model/pagination';

const QnaSkeleton = () => {
  return (
    <div className="bg-white border-b p-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded-lg w-3/4" />

          {/* Meta info skeleton */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-4 bg-gray-200 rounded-lg w-32" />
            <div className="h-4 bg-gray-200 rounded-lg w-20" />
          </div>
        </div>

        {/* Status skeleton */}
        <div className="h-5 bg-gray-200 rounded-lg w-16" />
      </div>
    </div>
  );
};

interface QnaReadProps {
  onQnaSelect: (qnaId: number) => void;
  selectedQnaId: number | null;
}

export default function QnaRead({ onQnaSelect, selectedQnaId }: QnaReadProps) {
  const { qnas, isLoading } = useQnABoardStore();
  const { readQnAs } = useQnAFeatureStore();
  const { currentPage, itemsPerPage } = usePaginationStore();
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    readQnAs(currentPage, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // 필터링된 QnA 목록
  const filteredQnas = (qnas || []).filter(q => {
    const matchesSearch = q.qnaTitle.toLowerCase().includes(search.toLowerCase()) ||
                         q.qnaContent.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // isItAnswered 필드를 사용하여 답변 여부 판단
    switch (filter) {
      case 'answered':
        return q.isItAnswered === true;
      case 'unanswered':
        return q.isItAnswered === false;
      default:
        return true;
    }
  });

  // 헤더 컴포넌트
  const HeaderSection = () => (
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
  );

  return (
    <section className="border rounded-lg shadow-sm">
      <HeaderSection />

      {/* 로딩 상태 */}
      {isLoading ? (
        <ul>
          {Array.from({ length: 6 }).map((_, index) => (
            <QnaSkeleton key={index} />
          ))}
        </ul>
      ) : (
        /* QnA 목록 또는 빈 상태 */
        filteredQnas.length === 0 ? (
          <div className="p-8 text-center flex justify-center items-center h-full">
            <span className="font-sansKR-SemiBold text-lg">질문이 없습니다.</span>
          </div>
        ) : (
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
                    <p className="text-sm text-gray-500">{new Date(q.createdAt).toLocaleString('ko-KR')}</p>
                    <p className="text-sm text-gray-600">{q.student?.studentName || "알 수 없음"}</p>
                  </div>
                  <span className={`text-sm font-medium ${(q.isItAnswered ? 'text-green-600' : 'text-red-500')}`}>
                    {q.isItAnswered ? '답변 완료' : '미답변'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}