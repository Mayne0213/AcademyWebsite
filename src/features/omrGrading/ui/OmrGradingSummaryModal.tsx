import React, { useState } from 'react';
import { ExtendedOMRGradingResult } from '../model/types';

interface OmrGradingSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: ExtendedOMRGradingResult[];
  examName: string;
  examId: number;
}

interface InvalidCase {
  file: string;
  question: number;
  correct: string;
}

export const OmrGradingSummaryModal: React.FC<OmrGradingSummaryModalProps> = ({
  isOpen,
  onClose,
  results,
  examName,
  examId
}) => {
  const [showInvalidAnalysis, setShowInvalidAnalysis] = useState(false);

  if (!isOpen) return null;

  const successfulResults = results.filter(r => r.success);
  const failedResults = results.filter(r => !r.success);
  const averageScore = successfulResults.length > 0 
    ? successfulResults.reduce((sum, r) => sum + r.totalScore, 0) / successfulResults.length 
    : 0;

  // 무효 판정 케이스 분석
  const invalidCases: InvalidCase[] = [];

  for (const student of successfulResults) {
    const fileName = student.fileName;

    for (const question of student.results) {
      if (question.studentAnswer === '무효') {
        invalidCases.push({
          file: fileName,
          question: question.questionNumber,
          correct: question.correctAnswer
        });
      }
    }
  }

  // 파일별로 그룹화
  const invalidByFile: Record<string, InvalidCase[]> = {};
  for (const caseItem of invalidCases) {
    if (!invalidByFile[caseItem.file]) {
      invalidByFile[caseItem.file] = [];
    }
    invalidByFile[caseItem.file].push(caseItem);
  }

  const totalQuestions = successfulResults.length * 45;
  const invalidRate = totalQuestions > 0
    ? (invalidCases.length / totalQuestions) * 100
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="border-b bg-green-50 p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">채점 완료</h3>
              <p className="text-sm text-green-600 mt-1">{examName}</p>
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

        {/* 자동 저장 안내 */}
        <div className="p-4 border-b bg-blue-50">
          <div className="flex items-center space-x-3">
            <span className="text-blue-600 text-lg">💾</span>
            <div>
              <p className="text-sm font-medium text-blue-800">자동 데이터베이스 저장 완료</p>
              <p className="text-xs text-blue-600 mt-1">
                채점이 완료된 모든 결과가 자동으로 데이터베이스에 저장되었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 요약 통계 */}
        <div className="p-4 border-b bg-gray-50">
          <div className="grid grid-cols-2 smalltablet:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{results.length}</div>
              <div className="text-sm text-gray-600">총 이미지</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{successfulResults.length}</div>
              <div className="text-sm text-gray-600">성공</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedResults.length}</div>
              <div className="text-sm text-gray-600">실패</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{averageScore.toFixed(1)}</div>
              <div className="text-sm text-gray-600">평균점수</div>
            </div>
          </div>
        </div>

        {/* 상세 결과 */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">채점 결과 상세</h4>
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
                      <span className="font-medium text-gray-900 truncate">
                        {result.fileName}
                      </span>
                    </div>
                    {result.success ? (
                      <div className="mt-2 flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          총점: <span className="font-semibold text-blue-600">{result.totalScore}점</span>
                        </span>
                        <span className="text-gray-600">
                          등급: <span className="font-semibold text-purple-600">{result.grade}등급</span>
                        </span>
                        <span className="text-green-600 text-xs">
                          💾 DB 저장됨
                        </span>
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-red-600">
                        오류: {result.error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 무효 판정 분석 */}
        {invalidCases.length > 0 && (
          <div className="border-t">
            <button
              onClick={() => setShowInvalidAnalysis(!showInvalidAnalysis)}
              className="w-full p-4 bg-yellow-50 hover:bg-yellow-100 transition-colors text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-600 text-lg">⚠️</span>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      무효 판정 {invalidCases.length}개
                    </p>
                    <p className="text-xs text-yellow-600">
                      전체 {totalQuestions}문제 중 {invalidRate.toFixed(2)}%
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-yellow-600 transition-transform ${showInvalidAnalysis ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {showInvalidAnalysis && (
              <div className="p-4 bg-yellow-50 border-t border-yellow-200">
                <h4 className="font-medium text-gray-900 mb-3">📄 파일별 무효 판정</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {Object.entries(invalidByFile)
                    .sort(([fileA], [fileB]) => fileA.localeCompare(fileB))
                    .map(([file, cases]) => (
                      <div key={file} className="p-3 bg-white rounded-lg border border-yellow-200">
                        <div className="font-medium text-gray-900 mb-2">
                          📁 {file}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          무효 문제 수: {cases.length}개
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cases
                            .sort((a, b) => a.question - b.question)
                            .map((caseItem, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded"
                              >
                                문제 {caseItem.question}번 (정답: {caseItem.correct})
                              </span>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 푸터 */}
        <div className="border-t p-4 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              시험 ID: {examId}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
