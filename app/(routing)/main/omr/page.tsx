'use client';

import React, { useState } from 'react';
import { OMRGradingForm, OMRResultDisplay } from '@/src/features/omrGrading';
import { OMRGradingResult } from '@/src/features/omrGrading';
import { Button } from '@/src/shared/ui/button';

export default function OMRGradingPage() {
  const [gradingResult, setGradingResult] = useState<OMRGradingResult | null>(null);
  const [isGradingComplete, setIsGradingComplete] = useState(false);

  const handleGradingComplete = (result: OMRGradingResult) => {
    setGradingResult(result);
    setIsGradingComplete(true);
  };

  const handleReset = () => {
    setGradingResult(null);
    setIsGradingComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">OMR 자동 채점 시스템</h1>
          <p className="text-xl text-gray-600">
            OMR 답안지를 업로드하고 자동으로 채점 결과를 확인하세요
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {!isGradingComplete ? (
            <div>
              {/* 채점 폼 */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  OMR 답안지 업로드 및 채점 설정
                </h2>
                <p className="text-gray-600 mb-6">
                  OMR 답안지 이미지를 업로드하고, 각 문제의 정답과 배점을 설정한 후 채점을 진행하세요.
                </p>
              </div>
              
              <OMRGradingForm
                onGradingComplete={handleGradingComplete}
              />
            </div>
          ) : (
            <div>
              {/* 결과 표시 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    채점 결과
                  </h2>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    새로운 채점
                  </Button>
                </div>
              </div>
              
              {gradingResult && (
                <OMRResultDisplay
                  result={gradingResult}
                  studentName="테스트 학생"
                  examName="2024년 모의고사"
                />
              )}
            </div>
          )}
        </div>

        {/* 사용법 안내 */}
        {!isGradingComplete && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              📋 사용법 안내
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">1. 이미지 업로드</h4>
                <p>OMR 답안지의 선명한 이미지를 업로드하세요. JPG, PNG, WEBP 형식을 지원합니다.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. 정답 및 배점 설정</h4>
                <p>문제 수를 설정하면 자동으로 기본값이 설정됩니다. 정답 1번, 배점 2점(뒤에 10문제는 3점), 유형 듣기로 자동 설정되며, 필요시 수정 가능합니다.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. 자동 채점</h4>
                <p>설정을 완료한 후 채점 버튼을 클릭하면 AI가 자동으로 답안을 인식하고 채점합니다.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
