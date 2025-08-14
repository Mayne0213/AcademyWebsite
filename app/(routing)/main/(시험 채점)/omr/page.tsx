'use client';

import React, { useState } from 'react';
import { ExamSummary } from '@/src/entities/exam/model/types';
import { OmrGradingForm } from '@/src/features/omrGrading';
import { ExamList } from '@/src/entities/exam/ui';

export default function OMRGradingPage() {
  const [selectedExam, setSelectedExam] = useState<ExamSummary | null>(null);

  const handleExamSelect = (exam: ExamSummary) => {
    setSelectedExam(exam);
  };

  return (
    <main className="h-full flex flex-col p-4"> 
      <div className="flex justify-between items-center mb-8 text-2xl desktop:text-3xl font-sansKR-Bold">
        📝 OMR 채점
      </div>
        
      <div className="grid grid-cols-1 h-full lg:grid-cols-2 gap-8">
        <ExamList onExamSelect={handleExamSelect} />

        {selectedExam ? (
          <OmrGradingForm examId={selectedExam.examId} />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border p-6 h-full">
            <div className="text-center text-black py-8 h-full flex flex-col justify-center font-sansKR-SemiBold space-y-8">
              <div className="text-5xl">📝</div>
              <p className='text-2xl'>채점할 시험을 선택해주세요</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
