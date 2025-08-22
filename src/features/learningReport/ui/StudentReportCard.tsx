'use client';

import React, { useState } from 'react';
import { StudentLearningReport } from '../model/types';
import { PerformanceMetrics } from './PerformanceMetrics';
import { ExamHistoryChart } from './ExamHistoryChart';
import { ExamQuestionResult } from '@/src/entities/examResult/model/types';
import { learningReportApi } from '../api/learningReportApi';


interface StudentReportCardProps {
  report: StudentLearningReport;
  onClose?: () => void;
}

export const StudentReportCard: React.FC<StudentReportCardProps> = ({ 
  report, 
  onClose 
}) => {
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [questionResults, setQuestionResults] = useState<ExamQuestionResult[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const { student, examHistory } = report;

  const handleExamSelect = async (examId: number) => {
    setSelectedExamId(examId);
    
    // 선택된 시험의 examResultId 찾기
    const selectedExam = examHistory.find(exam => exam.examId === examId);
    if (selectedExam) {
      setIsLoadingQuestions(true);
      try {
        const results = await learningReportApi.readExamQuestionResults(selectedExam.examResultId);
        setQuestionResults(results);
      } catch (error) {
        console.error('문제별 결과를 불러올 수 없습니다:', error);
        setQuestionResults([]);
      } finally {
        setIsLoadingQuestions(false);
      }
    }
  };

  const handleBackToList = () => {
    setSelectedExamId(null);
    setQuestionResults([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="border-b bg-gray-50 p-4 smalltablet:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl smalltablet:text-2xl font-bold text-gray-800">
              {student.studentName} 학생 학습 리포트
            </h2>
            <p className="text-gray-600 mt-1">
              {student.studentPhone} • {student.studentHighschool || '고등학교 미입력'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 네비게이션 탭 */}
      <div className="border-b bg-white">
        <div className="flex space-x-1 p-4 smalltablet:p-6">
          <button
            onClick={handleBackToList}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !selectedExamId
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            📊 전체 리포트
          </button>
          {examHistory.length > 0 && (
            <button
              onClick={() => handleExamSelect(examHistory[0].examId)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedExamId === examHistory[0].examId
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              📈 시험 이력
            </button>
          )}
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="p-4 smalltablet:p-6">
        {!selectedExamId && (
          /* 전체 리포트 보기 */
          <div className="space-y-6">
            {/* 성과 지표 */}
            <PerformanceMetrics report={report} />
            
            {/* 시험 이력 차트 */}
            <ExamHistoryChart examHistory={examHistory} />
            
            {/* 시험 목록 */}
            {examHistory.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                <h3 className="text-lg smalltablet:text-xl font-semibold text-gray-800 mb-4">
                  시험 목록
                </h3>
                <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
                  {examHistory.map((exam) => (
                    <div
                      key={exam.examResultId}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => handleExamSelect(exam.examId)}
                    >
                      <div className="text-lg font-semibold text-gray-800 mb-2">
                        {exam.examName}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        {new Date(exam.examDate).toLocaleDateString('ko-KR')}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {exam.totalScore}점
                        </span>
                        <span className="text-lg font-medium text-purple-600">
                          {exam.grade}등급
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedExamId && (
          /* 특정 시험 선택 시 */
          <div>
            <div className="mb-4">
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span>←</span>
                <span>전체 리포트로 돌아가기</span>
              </button>
            </div>
            
            {(() => {
              const selectedExam = examHistory.find(exam => exam.examId === selectedExamId);
              if (!selectedExam) return null;
              
              return (
                <div className="space-y-6">
                  {/* 선택된 시험 정보 */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      📈 {selectedExam.examName} - 시험 상세 정보
                    </h3>
                    <p className="text-yellow-700 mb-3">
                      {new Date(selectedExam.examDate).toLocaleDateString('ko-KR')}에 치른 시험 결과입니다.
                    </p>
                    
                    <div className="grid grid-cols-1 smalltablet:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedExam.totalScore}점</div>
                        <div className="text-sm text-gray-600">총점</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedExam.grade}등급</div>
                        <div className="text-sm text-gray-600">등급</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {new Date(selectedExam.examDate).toLocaleDateString('ko-KR')}
                        </div>
                        <div className="text-sm text-gray-600">시험일</div>
                      </div>
                    </div>
                  </div>

                  {/* 문제별 결과 테이블 */}
                  <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      📝 문제별 결과
                    </h4>
                    
                    {isLoadingQuestions ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">문제별 결과를 불러오는 중...</p>
                      </div>
                    ) : questionResults.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-4 py-2 border-b text-left">문항</th>
                              <th className="px-4 py-2 border-b text-left">선택한 답</th>
                              <th className="px-4 py-2 border-b text-left">정답 여부</th>
                              <th className="px-4 py-2 border-b text-left">배점</th>
                              <th className="px-4 py-2 border-b text-left">득점</th>
                            </tr>
                          </thead>
                          <tbody>
                            {questionResults.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b font-medium">{item.questionNumber}</td>
                                <td className="px-4 py-2 border-b">
                                  <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">
                                    {item.selectedChoice || '-'}
                                  </span>
                                </td>
                                <td className="px-4 py-2 border-b">
                                  <span className={`px-2 py-1 rounded text-sm ${
                                    item.isCorrect 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {item.isCorrect ? '정답' : '오답'}
                                  </span>
                                </td>
                                <td className="px-4 py-2 border-b">{item.score}</td>
                                <td className="px-4 py-2 border-b font-bold">
                                  <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>
                                    {item.isCorrect ? item.score : 0}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>문제별 결과 데이터가 없습니다.</p>
                      </div>
                    )}
                  </div>

                  {/* 시험 분석 정보 */}
                  <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      📊 시험 분석
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">전체 시험 중 순위</span>
                        <span className="font-medium text-gray-800">
                          {examHistory.findIndex(exam => exam.examId === selectedExamId) + 1}번째
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">전체 평균 대비</span>
                        <span className={`font-medium ${
                          selectedExam.totalScore > report.averageScore ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {selectedExam.totalScore > report.averageScore ? '↑' : '↓'} 
                          {Math.abs(selectedExam.totalScore - report.averageScore).toFixed(1)}점
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">등급 수준</span>
                        <span className={`font-medium ${
                          selectedExam.grade <= 3 ? 'text-green-600' :
                          selectedExam.grade <= 5 ? 'text-blue-600' :
                          selectedExam.grade <= 7 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {selectedExam.grade <= 3 ? '상위권' :
                           selectedExam.grade <= 5 ? '중상위권' :
                           selectedExam.grade <= 7 ? '중위권' : '하위권'}
                        </span>
                      </div>
                      {questionResults.length > 0 && (
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">정답률</span>
                          <span className="font-medium text-blue-600">
                            {Math.round((questionResults.filter(q => q.isCorrect).length / questionResults.length) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
