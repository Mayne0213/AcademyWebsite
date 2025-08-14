'use client';

import React, { useEffect, useState } from 'react';
import { ExamSummary } from '@/src/entities/exam/model/types';
import { useExamStore } from '@/src/entities/exam/model/store';
import { ExamCard } from '@/src/entities/exam/ui/ExamCard';
import { useTotalPages } from '@/src/shared/model/pagination';
import { Pagination } from '@/src/shared/ui';
import { useExamFeatureStore } from '@/src/features/examCRUD';

interface ExamListProps {
  onExamSelect: (exam: ExamSummary) => void;
}

const ExamCardSkeleton: React.FC = () => {
  return (
    <div className="w-full p-4 border border-gray-200 rounded-lg animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export function ExamList({ onExamSelect }: ExamListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const { readExamSummaries } = useExamFeatureStore();
  const { exams, isLoading } = useExamStore();
  const totalPages = useTotalPages();

  useEffect(() => {
    readExamSummaries(currentPage, 5);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedExamId(null); // 페이지 변경 시 선택 해제
  };

  const handleExamSelect = (exam: ExamSummary) => {
    setSelectedExamId(exam.examId);
    onExamSelect(exam);
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-lg shadow-sm border h-full">
        <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
          <h2 className="font-semibold text-base smalltablet:text-lg tablet:text-xl">시험 선택</h2>
        </div>
        {isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <ExamCardSkeleton key={index} />
            ))}
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center text-gray-500 flex-col flex items-center justify-center h-full space-y-2">
            <div className="text-4xl">📚</div>
            <p className="text-lg font-sansKR-SemiBold">등록된 시험이 없습니다.</p>
          </div>
        ) : (
          <>
            <div className="space-y-3 p-4">
              {exams.map((exam) => (
                <ExamCard
                  key={exam.examId}
                  exam={exam}
                  onSelect={handleExamSelect}
                  isSelected={selectedExamId === exam.examId}
                />
              ))}
            </div>
            <div className="p-4 border-t ">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
