'use client';

import { useState } from 'react';
import QnaRead from '@/src/features/qnaCRUD/ui/QnaRead';
import QnaItem from '@/src/entities/qna/ui/QnaItem';
import { usePaginationStore, useTotalPages } from '@/src/shared/model/pagination';
import { Pagination } from '@/src/shared/ui/pagination';

export default function AdminQuestionBoard() {
  const [selectedQnaId, setSelectedQnaId] = useState<number | null>(null);
  const { currentPage, setCurrentPage, totalCount } = usePaginationStore();
  const totalPages = useTotalPages();

  return (
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-SemiBold">📋 질문 관리</h1>
          <span className="text-xs flex items-center justify-center text-center smalltablet:text-sm tablet:text-base text-gray-500 bg-gray-100 px-2 smalltablet:px-3 py-1 rounded-lg smalltablet:rounded-full">
            총 {totalCount}개
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <QnaRead
          onQnaSelect={(qnaId: number) => {setSelectedQnaId(qnaId)}}
          selectedQnaId={selectedQnaId}
        />

        <QnaItem
          qnaId={selectedQnaId}
        />
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
