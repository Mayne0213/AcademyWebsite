"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Student } from '@/src/entities/student/model/types';
import { StudentLearningReport } from '@/src/features/learningReport/model/types';
import { learningReportApi } from '@/src/features/learningReport/api/learningReportApi';
import { PerformanceMetrics, ExamHistoryChart } from '@/src/features/learningReport';
import { ExamQuestionResult } from '@/src/entities/examResult/model/types';
import { UserInfo } from '@/src/entities/user/model/types';
import { userApi } from '@/src/entities/user/api';
import Header from '@/src/widgets/header/DashboardHeader';
import { Calendar, TrendingUp, Award, Target } from 'lucide-react';

// 로딩 스켈레톤 컴포넌트
const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 빈 상태 컴포넌트
const EmptyState = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
    <div className="text-gray-400 mb-4">
      <Calendar className="w-12 h-12 mx-auto" />
    </div>
    <p className="text-gray-500">시험 기록이 없습니다.</p>
  </div>
);

const GradePage = () => {

  const [user, setUser] = useState<UserInfo | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [learningReport, setLearningReport] = useState<StudentLearningReport | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [questionResults, setQuestionResults] = useState<ExamQuestionResult[]>([]);
  const [examCorrectAnswers, setExamCorrectAnswers] = useState<Record<number, string> | null>(null);
  const [examStatistics, setExamStatistics] = useState<any>(null);
  const [questionTypes, setQuestionTypes] = useState<Record<number, string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const examDetailRef = useRef<HTMLDivElement>(null);

  // 문제 유형별 통계 계산 함수
  const calculateQuestionTypeStatistics = (questionResults: ExamQuestionResult[], questionTypes: Record<number, string> | null) => {
    if (!questionTypes) {
      return [];
    }

    const typeStats = new Map<string, { correct: number; total: number; questions: number[] }>();

    questionResults.forEach((item) => {
      // 데이터베이스에서 가져온 문제 유형 사용
      const questionType = questionTypes[item.questionNumber] || '기타';

      if (!typeStats.has(questionType)) {
        typeStats.set(questionType, { correct: 0, total: 0, questions: [] });
      }

      const stats = typeStats.get(questionType)!;
      stats.total += 1;
      if (item.isCorrect) stats.correct += 1;
      stats.questions.push(item.questionNumber);
    });

    // 문제 유형을 문제 번호 순서대로 정렬
    return Array.from(typeStats.entries())
      .map(([type, stats]) => ({
        type,
        correctRate: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        count: stats.questions.length,
        minQuestionNumber: Math.min(...stats.questions) // 정렬을 위한 최소 문제 번호
      }))
      .sort((a, b) => a.minQuestionNumber - b.minQuestionNumber) // 문제 번호 순서대로 정렬
      .map(({ type, correctRate, count }) => ({ type, correctRate, count })); // 정렬 후 필요한 속성만 반환
  };

  // 현재 사용자 정보와 학습 리포트 로딩
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 현재 사용자 정보 가져오기
        const userData = await userApi.getCurrentUser();
        setUser(userData);

        // admin 접근 차단
        if (userData.role === 'ADMIN') {
          setError('관리자는 이 페이지에 접근할 수 없습니다.');
          return;
        }

        // 학생이 아닌 경우 오류
        if (userData.role !== 'STUDENT' || !userData.student) {
          setError('학생만 이 페이지에 접근할 수 있습니다.');
          return;
        }

        const studentData = userData.student;
        setStudent(studentData);

        // 학습 리포트 가져오기
        const reportData = await learningReportApi.readStudentLearningReport(studentData.memberId);
        setLearningReport(reportData);
      } catch (err) {
        setError('사용자 정보를 불러올 수 없습니다.');
        console.error('사용자 데이터 로딩 오류:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 시험 선택 시 문제별 결과와 정답 정보 로딩
  const handleExamSelect = async (examId: number) => {
    setSelectedExamId(examId);

    if (learningReport) {
      const selectedExam = learningReport.examHistory.find(exam => exam.examId === examId);
      if (selectedExam) {
        try {
          // 문제별 결과, 시험 정답 정보, 시험 통계를 병렬로 가져오기
          const [results, examData, statisticsData] = await Promise.all([
            learningReportApi.readExamQuestionResults(selectedExam.examResultId),
            fetch(`/api/exam/${examId}`).then(res => res.json()),
            fetch(`/api/examResult/exam/${examId}/statistics`).then(res => res.json())
          ]);

          setQuestionResults(results);

          // 정답 정보 파싱 및 저장
          if (examData.success && examData.data.correctAnswers) {
            const correctAnswers = typeof examData.data.correctAnswers === 'string'
              ? JSON.parse(examData.data.correctAnswers)
              : examData.data.correctAnswers;

            setExamCorrectAnswers(correctAnswers);
          }

          // 문제 유형 정보 파싱 및 저장
          if (examData.success && examData.data.questionTypes) {
            const types = typeof examData.data.questionTypes === 'string'
              ? JSON.parse(examData.data.questionTypes)
              : examData.data.questionTypes;

            setQuestionTypes(types);
          }

          // 시험 통계 정보 저장
          if (statisticsData.success && statisticsData.data) {
            setExamStatistics(statisticsData.data);
          }
        } catch (error) {
          console.error('문제별 결과를 불러올 수 없습니다:', error);
          setQuestionResults([]);
          setExamCorrectAnswers(null);
          setExamStatistics(null);
        }
      }
    }
  };

  const handleBackToList = () => {
    setSelectedExamId(null);
    setQuestionResults([]);
    setExamCorrectAnswers(null);
    setExamStatistics(null);
    setQuestionTypes(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="성적 관리" description="나의 시험 결과와 학습 리포트를 확인하세요" />
        <div className="max-w-6xl mx-auto px-6">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !user || !student || !learningReport) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="성적 관리" description="나의 시험 결과와 학습 리포트를 확인하세요" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-red-600 text-6xl mb-4">❌</div>
            <h2 className="text-xl font-MaruBuri-Bold text-gray-800 mb-2">오류 발생</h2>
            <p className="text-gray-600 mb-4">{error || '사용자 정보를 찾을 수 없습니다.'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="성적 관리" description="나의 시험 결과와 학습 리포트를 확인하세요" />
      
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        {selectedExamId && (
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>←</span>
              <span>전체 리포트로 돌아가기</span>
            </button>
          </div>
        )}
        {!selectedExamId ? (
          /* 전체 리포트 보기 */
          <div>
            {/* 성과 지표와 시험 이력을 가로로 배치 */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
              {/* 성과 지표 */}
              <PerformanceMetrics report={learningReport} />

              {/* 시험 이력 차트 */}
              <ExamHistoryChart examHistory={learningReport.examHistory} />
            </div>

            {/* 시험 목록 */}
            {learningReport.examHistory.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-MaruBuri-Bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  시험 목록
                </h3>
                <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
                  {learningReport.examHistory.map((exam) => (
                    <div
                      key={exam.examResultId}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => handleExamSelect(exam.examId)}
                    >
                      <div className="text-lg font-MaruBuri-Bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {exam.examName}
                      </div>
                      <div className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(exam.examDate).toLocaleDateString('ko-KR')}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-MaruBuri-Bold text-blue-600">
                          {exam.totalScore}점
                        </span>
                        <span className="text-lg font-MaruBuri-Medium text-purple-600">
                          {exam.grade}등급
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        ) : (
          /* 특정 시험 선택 시 */
          <div>
            {(() => {
              const selectedExam = learningReport.examHistory.find(exam => exam.examId === selectedExamId);
              if (!selectedExam) return null;

              return (
                <div className="space-y-6">
                  {/* 선택된 시험 정보 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-2xl font-MaruBuri-Bold text-gray-900 flex items-center gap-3">
                      <Award className="w-8 h-8 text-blue-600" />
                      {selectedExam.examName}
                    </h2>
                    <div className="mt-4 flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(selectedExam.examDate).toLocaleDateString('ko-KR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{selectedExam.totalScore}점</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{selectedExam.grade}등급</span>
                      </div>
                    </div>
                  </div>

                  {/* 문제별 결과 테이블과 추가 분석 섹션들을 가로로 배치 */}
                  <div ref={examDetailRef} className="grid grid-cols-1 desktop:grid-cols-2 gap-6">
                    {/* 문제별 결과 테이블 - 왼쪽 */}
                    <div className="desktop:col-span-1">
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                          <h3 className="text-lg font-MaruBuri-Bold text-gray-900 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            문제별 결과
                          </h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">문항</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">선택한 답</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">정답</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">정답 여부</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">득점</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {questionResults.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.questionNumber}</td>
                                  <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">
                                      {item.selectedChoice || '-'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                                      {examCorrectAnswers?.[item.questionNumber] || '-'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-sm ${
                                      item.isCorrect
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {item.isCorrect ? '정답' : '오답'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 font-MaruBuri-Bold">
                                    <span className={item.isCorrect ? 'text-green-600' : 'text-red-600'}>
                                      {item.isCorrect ? item.score : 0}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* 추가 분석 섹션들 - 오른쪽 */}
                    <div className="space-y-6">
                      {/* 성취도 분석 */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-MaruBuri-Bold text-gray-900 mb-6 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-600" />
                          성취도 분석
                        </h3>
                        <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-4">
                          {/* 현재 시험 점수 */}
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-blue-900">시험 점수</h4>
                              <span className="text-2xl font-MaruBuri-Bold text-blue-600">
                                {(() => {
                                  const selectedExam = learningReport.examHistory.find(exam => exam.examId === selectedExamId);
                                  return selectedExam ? selectedExam.totalScore : 0;
                                })()}점
                              </span>
                            </div>
                          </div>

                          {/* 등급 */}
                          <div className="bg-purple-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-purple-900">등급</h4>
                              <span className="text-2xl font-MaruBuri-Bold text-purple-600">
                                {(() => {
                                  const selectedExam = learningReport.examHistory.find(exam => exam.examId === selectedExamId);
                                  return selectedExam ? selectedExam.grade : 0;
                                })()}등급
                              </span>
                            </div>
                          </div>

                          {/* 평균 점수 */}
                          <div className="bg-green-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-green-900">평균 점수</h4>
                              <span className="text-2xl font-MaruBuri-Bold text-green-600">
                                {(() => {
                                  if (!examStatistics) return 'N/A';
                                  return `${examStatistics.averageScore.toFixed(1)}점`;
                                })()}
                              </span>
                            </div>
                          </div>

                          {/* 평균 점수 대비 */}
                          <div className="bg-orange-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-orange-900">평균 대비</h4>
                              <span className={`text-2xl font-MaruBuri-Bold ${
                                (() => {
                                  const selectedExam = learningReport.examHistory.find(exam => exam.examId === selectedExamId);
                                  if (!selectedExam || !examStatistics) return 'text-gray-600';
                                  // 실제 시험 통계에서 평균 점수 가져오기
                                  const averageScore = examStatistics.averageScore;
                                  return selectedExam.totalScore > averageScore ? 'text-green-600' : 'text-red-600';
                                })()
                              }`}>
                                {(() => {
                                  const selectedExam = learningReport.examHistory.find(exam => exam.examId === selectedExamId);
                                  if (!selectedExam || !examStatistics) return 'N/A';
                                  // 실제 시험 통계에서 평균 점수 가져오기
                                  const averageScore = examStatistics.averageScore;
                                  const difference = selectedExam.totalScore - averageScore;
                                  if (difference > 0) return `+${difference.toFixed(1)}점`;
                                  if (difference < 0) return `${difference.toFixed(1)}점`;
                                  return '동일';
                                })()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-MaruBuri-Bold text-gray-900 mb-6 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          문제 유형별 정답률
                        </h3>
                        <div className="space-y-4">
                          {(() => {
                            if (!examCorrectAnswers) return <div className="text-gray-500 text-center py-4">정답 정보를 불러올 수 없습니다.</div>;

                            const typeStatistics = calculateQuestionTypeStatistics(questionResults, questionTypes);

                            const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

                            return typeStatistics.map((item, index) => {
                              const color = colors[index % colors.length];

                              return (
                                <div key={index} className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-700">{item.type}</span>
                                    <span className="text-sm text-gray-600">{item.count}문제</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                                      <div
                                        className={`h-4 rounded-full ${color} transition-all duration-300`}
                                        style={{ width: `${item.correctRate}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-MaruBuri-Bold text-gray-900 w-12 text-right">
                                      {item.correctRate.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* 시험의 오답률 TOP10 */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-MaruBuri-Bold text-gray-900 mb-6 flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          오답률 TOP10
                        </h3>
                        <div className="grid grid-cols-2 smalltablet:grid-cols-3 tablet:grid-cols-5 gap-3">
                          {(() => {
                            if (!examCorrectAnswers) return <div className="text-gray-500 text-center py-4">정답 정보를 불러올 수 없습니다.</div>;

                            // 오답률 TOP10 계산
                            const incorrectQuestions = questionResults
                              .filter(item => !item.isCorrect)
                              .sort((a, b) => (b.score || 0) - (a.score || 0))
                              .slice(0, 10);

                            return incorrectQuestions.map((item, index) => (
                              <div
                                key={item.questionNumber}
                                className="flex flex-col items-center justify-center text-center h-20"
                              >
                                <div className={`text-2xl font-MaruBuri-Bold ${
                                  index === 0
                                    ? 'text-red-800'
                                    : index === 1
                                    ? 'text-orange-800'
                                    : index === 2
                                    ? 'text-yellow-800'
                                    : index < 5
                                    ? 'text-gray-700'
                                    : 'text-gray-600'
                                }`}>
                                  {item.questionNumber}번
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  정답: {examCorrectAnswers[item.questionNumber] || 'N/A'}
                                </div>
                                <div className="text-xs text-red-600 mt-1 font-MaruBuri-Medium">
                                  선택: {item.selectedChoice || '-'}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>


                      {/* 학생 개인별 추이 - 전체 너비 */}
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-MaruBuri-Bold text-gray-900 mb-6 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          시험 성적 추이
                        </h3>
                        <div className="h-80">
                          <ExamHistoryChart examHistory={learningReport.examHistory} />
                        </div>
                      </div>
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

export default GradePage;
