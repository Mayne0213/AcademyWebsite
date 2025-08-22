'use client';

import React from 'react';
import { StudentLearningReport } from '../model/types';

interface PerformanceMetricsProps {
  report: StudentLearningReport;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ report }) => {
  const { 
    totalExams, 
    averageScore, 
    highestScore, 
    lowestScore, 
  } = report;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };


  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6 h-full">
      
              <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-4 h-full">
          {/* 총 시험 횟수 */}
          <div className="bg-blue-50 p-4 rounded-lg text-center min-h-[120px] flex flex-col justify-center">
            <div className="text-2xl smalltablet:text-3xl font-bold text-blue-600 mb-1">
              {totalExams}
            </div>
            <div className="text-sm text-blue-700">총 시험 횟수</div>
          </div>

          {/* 평균 점수 */}
          <div className="bg-green-50 p-4 rounded-lg text-center min-h-[120px] flex flex-col justify-center">
            <div className={`text-2xl smalltablet:text-3xl font-bold mb-1 ${getScoreColor(averageScore)}`}>
              {averageScore.toFixed(1)}
            </div>
            <div className="text-sm text-green-700">평균 점수</div>
          </div>

          {/* 최고 점수 */}
          <div className="bg-yellow-50 p-4 rounded-lg text-center min-h-[120px] flex flex-col justify-center">
            <div className={`text-2xl smalltablet:text-3xl font-bold mb-1 ${getScoreColor(highestScore)}`}>
              {highestScore}
            </div>
            <div className="text-sm text-yellow-700">최고 점수</div>
          </div>

          {/* 최저 점수 */}
          <div className="bg-orange-50 p-4 rounded-lg text-center min-h-[120px] flex flex-col justify-center">
            <div className={`text-2xl smalltablet:text-3xl font-bold mb-1 ${getScoreColor(lowestScore)}`}>
              {lowestScore}
            </div>
            <div className="text-sm text-orange-700">최저 점수</div>
          </div>
        </div>
    </div>
  );
};
