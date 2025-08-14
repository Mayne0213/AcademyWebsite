'use client';

import React, { useEffect, useState } from 'react';
import { ExtendedOMRGradingResult } from '../model/types';
import { Exam } from '@/src/entities/exam/model/types';
import { examApi } from '@/src/entities/exam/api';
import { OmrGradingSummaryModal } from './OmrGradingSummaryModal';
import { OmrProcessingProgressModal } from './OmrProcessingProgressModal';
import { useOMRGrading } from '../hooks/useOMRGrading';

interface OmrGradingFormProps {
  examId: number;
  onGradingComplete?: (result: ExtendedOMRGradingResult[]) => void;
}

export const OmrGradingForm: React.FC<OmrGradingFormProps> = ({
  examId,
  onGradingComplete
}) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [examInfo, setExamInfo] = useState<Exam | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  
  // OMR 채점 로직을 담당하는 hook
  const {
    isProcessing,
    processingProgress,
    gradingResults,
    processingError,
    processImages,
    resetResults,
    retryProcessing
  } = useOMRGrading();

  // 컴포넌트 마운트 시 시험 정보 가져오기
  useEffect(() => {
    const fetchExamInfo = async () => {
      const exam = await examApi.readExamDetail(examId);
      setExamInfo(exam);
    };
    fetchExamInfo();
  }, [examId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedImages(prev => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!examInfo) {
      alert('시험 정보를 가져올 수 없습니다. 다시 시도해주세요.');
      return;
    }

    try {
      await processImages(selectedImages, examInfo, onGradingComplete);
      
      setShowSummaryModal(true);
      
    } catch (err) {
      // 오류는 이미 hook에서 처리됨
    }
  };

  const handleRetry = async () => {
    if (!examInfo) return;

    try {
      await retryProcessing(selectedImages, examInfo, onGradingComplete);
      setShowSummaryModal(true);
    } catch (err) {
      console.error('재시도 중 오류 발생:', err);
    }
  };

  const handleCloseSummaryModal = () => {
    setShowSummaryModal(false);
    resetResults(); // 결과 초기화
    setSelectedImages([]); // 선택된 이미지도 초기화
  };

  // 시험 정보 로딩 중일 때 표시
  if (!examInfo) {
    return (
      <div className="bg-white rounded-lg shadow-sm border h-full">
        <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6 flex justify-between items-center">
          <h2 className="font-semibold text-base smalltablet:text-lg tablet:text-xl">OMR 업로드</h2>
          <p className="text-sm text-gray-600 mt-1">시험: {examId}</p>
        </div>
        <div className="p-4 smalltablet:p-6 flex items-center justify-center h-full">
          <div className="flex items-center space-x-3 h-full  ">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">시험 정보를 불러오는 중...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full">
      <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6 flex justify-between items-center">
        <h2 className="font-semibold text-base smalltablet:text-lg tablet:text-xl">OMR 업로드</h2>
        <div className="text-right">
          <p className="text-sm font-medium text-blue-600">{examInfo.examName}</p>
          <p className="text-xs text-gray-500">총 {examInfo.totalQuestions}문제</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-4 smalltablet:space-y-6">
        <div>
          <label className="block text-sm smalltablet:text-base font-medium text-gray-700 mb-2 smalltablet:mb-3">
            OMR 이미지 업로드 <span className="text-red-500">*</span>
          </label>
          
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full border p-2 smalltablet:p-3 text-sm smalltablet:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {/* 주의사항 */}
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">주의사항:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>지원 형식: JPG, PNG, WEBP 등 이미지 파일</li>
                  <li>파일 크기: 각 파일당 10MB 이하 권장</li>
                  <li>이미지 품질: 스캔된 이미지 사용</li>
                  <li>여러 이미지 선택 시 순차적으로 채점됩니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 업로드된 이미지 목록 */}
        {selectedImages.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">업로드된 이미지 ({selectedImages.length}개)</h4>
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <span className="text-blue-600 text-lg flex-shrink-0">📷</span>
                    <span className="text-sm text-gray-700 truncate">
                      {image.name}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      ({(image.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors flex-shrink-0 ml-2"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <div className="w-full flex justify-end pt-4 smalltablet:pt-6 border-t">
          <button
            type="submit"
            disabled={isProcessing || selectedImages.length === 0}
            className={`px-4 py-2 smalltablet:px-6 smalltablet:py-3 rounded-md transition-all duration-200 text-sm smalltablet:text-base font-medium ${
              isProcessing || selectedImages.length === 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                채점 중...
              </>
            ) : (
              `OMR 채점 시작 (${selectedImages.length}개 이미지)`
            )}
          </button>
        </div>
      </form>

      {/* 오류 발생 시 표시 */}
      {processingError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md mb-4">
          <div className="flex items-start space-x-3">
            <span className="text-red-600 text-lg">❌</span>
            <div className="flex-1">
              <h4 className="font-medium text-red-800 mb-2">채점 중 오류가 발생했습니다</h4>
              <p className="text-sm text-red-700 mb-3">{processingError.message}</p>
              <div className="flex space-x-3">
                <button
                  onClick={handleRetry}
                  className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  다시 시도
                </button>
                <button
                  onClick={resetResults}
                  className="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                >
                  초기화
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 처리 진행 상황 모달 */}
      {processingProgress && (
        <OmrProcessingProgressModal
          isOpen={!!processingProgress}
          current={processingProgress.current}
          total={processingProgress.total}
          currentFileName={processingProgress.currentFileName}
        />
      )}

      {/* 채점 결과 요약 모달 */}
      {examInfo && gradingResults.length > 0 && (
        <OmrGradingSummaryModal
          isOpen={showSummaryModal}
          onClose={handleCloseSummaryModal}
          results={gradingResults}
          examName={examInfo.examName}
        />
      )}
    </div>
  );
}; 