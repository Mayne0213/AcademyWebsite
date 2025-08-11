'use client';

import { useState } from 'react';
import { QnaRead, QnaItem } from '@/src/features/qnaCRUD/ui';

export default function AdminQuestionBoard() {
  const [selectedQnaId, setSelectedQnaId] = useState<number | null>(null);

  return (
    <main className="h-full flex flex-col p-4">
      <h1 className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-SemiBold mb-4">📋 질문 관리</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <QnaRead
          onQnaSelect={(qnaId: number) => {setSelectedQnaId(qnaId)}}
          selectedQnaId={selectedQnaId}
        />

        <QnaItem
          qnaId={selectedQnaId}
        />
      </div>
    </main>
  );
}
