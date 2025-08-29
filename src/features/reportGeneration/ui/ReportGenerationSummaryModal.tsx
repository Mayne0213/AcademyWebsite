import React from 'react';
import { ReportGenerationResult } from '../model/types';

interface ReportGenerationSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ReportGenerationResult[];
  examName: string;
  examId: number;
}

export const ReportGenerationSummaryModal: React.FC<ReportGenerationSummaryModalProps> = ({
  isOpen,
  onClose,
  results,
  examName,
  examId
}) => {
  if (!isOpen) return null;

  const successfulResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);
  const averageScore = successfulResults.length > 0 
    ? successfulResults.reduce((sum, r) => sum + (r.totalScore || 0), 0) / successfulResults.length 
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="border-b bg-green-50 p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-sansKR-Bold text-gray-900">리포트 생성 완료</h3>
              <p className="text-sm text-green-600 mt-1 font-sansKR-Regular">{examName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 자동 생성 안내 */}
        <div className="p-4 border-b bg-blue-50">
          <div className="flex items-center space-x-3">
            <span className="text-blue-600 text-lg">📝</span>
            <div>
              <p className="text-sm font-sansKR-Medium text-blue-800">리포트 데이터 생성 완료</p>
              <p className="text-xs text-blue-600 mt-1 font-sansKR-Regular">
                모든 학생의 리포트 데이터가 성공적으로 생성되었습니다. 이제 JPG 다운로드가 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 요약 통계 */}
        <div className="p-4 border-b bg-gray-50">
          <div className="grid grid-cols-2 smalltablet:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-sansKR-Bold text-blue-600">{results.length}</div>
              <div className="text-sm text-gray-600 font-sansKR-Regular">총 학생</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-sansKR-Bold text-green-600">{successfulResults.length}</div>
              <div className="text-sm text-gray-600 font-sansKR-Regular">성공</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-sansKR-Bold text-red-600">{failedResults.length}</div>
              <div className="text-sm text-gray-600 font-sansKR-Regular">실패</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-sansKR-Bold text-purple-600">{averageScore.toFixed(1)}</div>
              <div className="text-sm text-gray-600 font-sansKR-Regular">평균점수</div>
            </div>
          </div>
        </div>

        {/* 상세 결과 */}
        <div className="p-4">
          <h4 className="font-sansKR-Medium text-gray-900 mb-3">리포트 생성 결과 상세</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg ${
                        result.success ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.success ? '✅' : '❌'}
                      </span>
                      <span className="font-sansKR-Medium text-gray-900 truncate">
                        {result.studentName}
                      </span>
                    </div>
                    {result.success ? (
                      <div className="mt-2 flex items-center space-x-4 text-sm">
                        <span className="text-gray-600 font-sansKR-Regular">
                          총점: <span className="font-sansKR-Bold text-blue-600">{result.totalScore}점</span>
                        </span>
                        <span className="text-gray-600 font-sansKR-Regular">
                          등급: <span className="font-sansKR-Bold text-purple-600">{result.grade}등급</span>
                        </span>
                        <span className="text-green-600 text-xs font-sansKR-Regular">
                          📝 리포트 생성됨
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-red-600 font-sansKR-Regular">
                        오류: {result.error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 font-sansKR-Regular">
              시험 ID: {examId}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-sansKR-Medium"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
