import React from 'react';

interface ProcessingProgress {
  current: number;
  total: number;
  currentFileName: string;
  currentStep: 'grading' | 'saving';
  processingTime?: string;
}

interface OmrProcessingProgressModalProps {
  isOpen: boolean;
  progress: ProcessingProgress | null;
}

export const OmrProcessingProgressModal: React.FC<OmrProcessingProgressModalProps> = ({
  isOpen,
  progress
}) => {
  if (!isOpen || !progress) return null;

  const { current, total, currentFileName, currentStep, processingTime } = progress;
  const progressPercentage = (current / total) * 100;

  const getStepText = () => {
    switch (currentStep) {
      case 'grading':
        return 'OMR 채점 중';
      case 'saving':
        return '데이터베이스 저장 중';
      default:
        return '처리 중';
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case 'grading':
        return '📊';
      case 'saving':
        return '💾';
      default:
        return '⏳';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* 헤더 */}
        <div className="border-b bg-blue-50 p-4 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">OMR 처리 진행 중</h3>
              <p className="text-sm text-blue-600 mt-1">이미지를 순차적으로 처리하고 있습니다</p>
            </div>
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="p-6">
          {/* 진행률 표시 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">진행률</span>
              <span className="text-sm font-semibold text-blue-600">
                {current} / {total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-500">{progressPercentage.toFixed(1)}%</span>
            </div>
          </div>

          {/* 현재 단계 표시 */}
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">{getStepIcon()}</span>
              <span className="text-sm font-medium text-gray-700">{getStepText()}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-gray-500">
                {currentStep === 'grading' ? 'OMR 이미지 분석 및 채점' : '결과를 데이터베이스에 저장'}
              </span>
            </div>
          </div>

          {/* 현재 처리 중인 파일 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <span className="text-blue-600 text-lg">📷</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-1">현재 처리 중</p>
                <p className="text-sm text-gray-600 truncate">{currentFileName}</p>
              </div>
            </div>
          </div>

          {/* 처리 시간 정보 */}
          {processingTime && (
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                처리 시간: <span className="font-medium text-blue-600">{processingTime}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
