import React from 'react';
import { ReportProcessingProgress } from '../model/types';

interface ReportProcessingProgressModalProps {
  isOpen: boolean;
  progress: ReportProcessingProgress | null;
}

export const ReportProcessingProgressModal: React.FC<ReportProcessingProgressModalProps> = ({
  isOpen,
  progress
}) => {
  if (!isOpen || !progress) return null;

  const { current, total, currentStudentName, currentStep, processingTime } = progress;
  const progressPercentage = (current / total) * 100;

  const getStepText = () => {
    switch (currentStep) {
      case 'loading':
        return '학생 데이터 로딩 중';
      case 'generating':
        return '리포트 데이터 생성 중';
      default:
        return '처리 중';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'loading':
        return '📊';
      case 'generating':
        return '📝';
      default:
        return '⏳';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* 헤더 */}
        <div className="border-b bg-green-50 p-4 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            <div>
              <h3 className="text-lg font-sansKR-Bold text-gray-900">리포트 생성 진행 중</h3>
              <p className="text-sm text-green-600 mt-1 font-sansKR-Regular">학생들의 리포트를 순차적으로 생성하고 있습니다</p>
            </div>
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="p-6">
          {/* 진행률 표시 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-sansKR-Medium text-gray-700">진행률</span>
              <span className="text-sm font-sansKR-Bold text-green-600">
                {current} / {total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-500 font-sansKR-Regular">{progressPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* 현재 단계 표시 */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">{getStepIcon()}</span>
              <span className="text-sm font-sansKR-Medium text-gray-700">{getStepText()}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500 font-sansKR-Regular">
                {currentStep === 'loading' ? '학생 시험 데이터 및 통계 정보 로딩' : '개별 학생 리포트 데이터 생성'}
              </span>
            </div>
          </div>

          {/* 현재 처리 중인 학생 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-lg">👨‍🎓</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-sansKR-Medium text-gray-900 mb-1">현재 처리 중</p>
                <p className="text-sm text-gray-600 truncate font-sansKR-Regular">{currentStudentName}</p>
              </div>
            </div>
          </div>

          {/* 처리 시간 정보 */}
          {processingTime && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 font-sansKR-Regular">
                처리 시간: <span className="font-sansKR-Medium text-green-600">{processingTime}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
