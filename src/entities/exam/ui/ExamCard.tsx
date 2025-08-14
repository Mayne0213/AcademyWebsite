'use client';

import React from 'react';
import { ExamSummary } from '@/src/entities/exam/model/types';

interface ExamCardProps {
  exam: ExamSummary;
  onSelect: (exam: ExamSummary) => void;
  isSelected: boolean;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onSelect, isSelected }) => {
  return (
    <button
      onClick={() => onSelect(exam)}
      className={`w-full text-left p-4 border rounded-lg transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
            {exam.examName}
          </h4>
          <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
            총 {exam.totalQuestions}문제 • {new Date(exam.createdAt).toLocaleDateString('ko-KR')}
          </p>
        </div>
        <div className={`text-lg ${isSelected ? 'text-blue-600' : 'text-blue-600'}`}>
          {isSelected ? '✓' : '→'}
        </div>
      </div>
    </button>
  );
};
