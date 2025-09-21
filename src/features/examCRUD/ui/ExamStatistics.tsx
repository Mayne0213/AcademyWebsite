"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { examResultApi } from "@/src/entities/examResult/api";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import { useExamFeatureStore } from "@/src/features/examCRUD/model/store";
import type { ExamStatistics as ExamStatisticsType } from "@/src/entities/examResult/model/types";
import AcademyFilter from "@/src/entities/academy/ui/AcademyFilter";
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, LabelList, CartesianGrid } from 'recharts';

export default function ExamStatistics() {
  const params = useParams();
  const examId = Number(params.id);
  const [statistics, setStatistics] = useState<ExamStatisticsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAcademyId, setSelectedAcademyId] = useState<number | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [academyStatistics, setAcademyStatistics] = useState<Map<number, ExamStatisticsType>>(new Map());
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, string>>({});
  const [questionTypes, setQuestionTypes] = useState<Record<number, string> | null>(null);

  // academy feature store와 entity store 사용
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  const { readExamDetail } = useExamFeatureStore();

  // 정답 데이터와 문제 유형 데이터 가져오기
  const fetchExamData = async () => {
    try {
      // ExamAnswers.tsx와 동일한 방식으로 examDetail 가져오기
      const exam = await readExamDetail(examId);

      if (exam && exam.correctAnswers) {
        const parsedAnswers = typeof exam.correctAnswers === 'string'
          ? JSON.parse(exam.correctAnswers)
          : exam.correctAnswers;
        setCorrectAnswers(parsedAnswers);
      } else {
        setCorrectAnswers({});
      }

      // 문제 유형 정보 파싱 및 저장
      if (exam && exam.questionTypes) {
        const types = typeof exam.questionTypes === 'string'
          ? JSON.parse(exam.questionTypes)
          : exam.questionTypes;
        setQuestionTypes(types);
      } else {
        setQuestionTypes(null);
      }
    } catch (error) {
      setCorrectAnswers({});
    }
  };

  // 모든 학원의 통계 데이터 가져오기
  const fetchAllAcademyStatistics = async () => {
    const statisticsMap = new Map<number, ExamStatisticsType>();

    // 각 학원별로 순차적으로 통계 데이터 가져오기
    for (const academy of academies) {
      try {
        const academyStats = await examResultApi.getExamStatisticsByAcademy(examId, academy.academyId);
        if (academyStats) {
          statisticsMap.set(academy.academyId, academyStats);
        }
      } catch (error) {
        // 에러가 발생해도 계속 진행
        console.warn(`학원 ${academy.academyName} 통계 로딩 실패:`, error);
      }
    }

    setAcademyStatistics(statisticsMap);
  };

  // 문제 유형별 정답률 계산
  const calculateQuestionTypeStatistics = () => {
    if (!statistics || !questionTypes) return [];

    const typeStats = new Map<string, { correct: number; total: number; questions: number[] }>();

    statistics.questionStatistics.forEach((question) => {
      // 데이터베이스에서 가져온 문제 유형 사용
      const questionType = questionTypes[question.questionNumber] || '기타';

      if (!typeStats.has(questionType)) {
        typeStats.set(questionType, { correct: 0, total: 0, questions: [] });
      }

      const stats = typeStats.get(questionType)!;
      stats.total += question.totalAttempts;
      stats.correct += question.correctAnswers;
      stats.questions.push(question.questionNumber);
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

  // 오답률 TOP10 계산 (정답 정보 활용)
  const getTopIncorrectQuestions = () => {
    if (!statistics || !correctAnswers) return [];

    return [...statistics.questionStatistics]
      .sort((a, b) => b.incorrectAnswers - a.incorrectAnswers)
      .slice(0, 10)
      .map((question) => {
        return {
          ...question,
          correctRate: question.correctRate * 100,
          incorrectRate: question.incorrectRate * 100
        };
      });
  };

  useEffect(() => {
    readAcademies();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 학원 데이터가 로드된 후 모든 학원의 통계 가져오기
  useEffect(() => {
    if (academies.length > 0 && examId) {
      fetchAllAcademyStatistics();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [academies, examId]);

  // 정답 데이터와 문제 유형 데이터 가져오기
  useEffect(() => {
    if (examId) {
      fetchExamData();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  // correctAnswers 상태 변화 추적
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = selectedAcademyId 
          ? await examResultApi.getExamStatisticsByAcademy(examId, selectedAcademyId)
          : await examResultApi.getExamStatistics(examId);
        
        
        if (result && result.examId) {
          setStatistics(result);
          setError(null);
        } else {
          setError('통계 데이터를 불러올 수 없습니다. 응답 데이터가 올바르지 않습니다.');
        }
      } catch (err: any) {
        console.error('시험 통계 로딩 오류:', err);
        if (err.response?.status === 404) {
          setError('해당 시험의 통계 데이터를 찾을 수 없습니다.');
        } else if (err.response?.status === 500) {
          setError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setError(`통계 데이터를 불러오는 중 오류가 발생했습니다: ${err.message || '알 수 없는 오류'}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (examId) {
      fetchStatistics();
    }
  }, [examId, selectedAcademyId]);

  const handleAcademyChange = (academyId: number | null) => {
    setSelectedAcademyId(academyId);
    setIsFiltered(academyId !== null);
  };

  const resetFilter = () => {
    setSelectedAcademyId(null);
    setIsFiltered(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] smalltablet:min-h-[400px] p-4 smalltablet:p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 smalltablet:h-32 w-24 smalltablet:w-32 border-b-2 border-gray-900 mx-auto mb-3 smalltablet:mb-4"></div>
          <p className="text-sm smalltablet:text-base text-gray-600">
            {isFiltered 
              ? `${academies.find(a => a.academyId === selectedAcademyId)?.academyName} 통계를 불러오는 중...`
              : '전체 통계를 불러오는 중...'
            }
          </p>
        </div>
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className="flex items-center justify-center min-h-[300px] smalltablet:min-h-[400px] p-4 smalltablet:p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-10 smalltablet:h-12 w-10 smalltablet:w-12 text-red-500 mb-3 smalltablet:mb-4" />
          <h3 className="text-base smalltablet:text-lg font-sansKR-Medium text-gray-900 mb-2">오류 발생</h3>
          <p className="text-sm smalltablet:text-base text-gray-500">{error || '통계 데이터를 불러올 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 smalltablet:space-y-6 p-4 smalltablet:p-6">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-2xl smalltablet:text-3xl font-sansKR-Bold text-gray-900 mb-2">{statistics.examName}</h1>
        <p className="text-sm smalltablet:text-base text-gray-600">시험 통계 및 분석</p>
        
        {/* 학원 선택 필터 */}
        <div className="mt-4 smalltablet:mt-6 flex items-center justify-end gap-2 smalltablet:gap-4">
          {academies.length > 0 ? (
            <AcademyFilter
              selectedAcademyId={selectedAcademyId}
              academies={academies}
              onAcademyChange={handleAcademyChange}
              resetFilter={resetFilter}
              isFiltered={isFiltered}
            />
          ) : (
            <div className="px-2 smalltablet:px-3 py-1.5 smalltablet:py-2 text-xs smalltablet:text-sm text-gray-500 bg-gray-100 rounded-md">
              학원 목록을 불러오는 중...
            </div>
          )}
        </div>
      </div>

    <div className="w-full grid grid-cols-1 smalltablet:grid-cols-2 gap-4 smalltablet:gap-6">
      {/* 전체 통계 요약 */}
      <div className="space-y-4 smalltablet:space-y-6 w-full">
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-3 smalltablet:gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs smalltablet:text-sm font-sansKR-Medium text-gray-900">응시자 수</h3>
              <Users className="h-3.5 smalltablet:h-4 w-3.5 smalltablet:w-4 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-xl smalltablet:text-2xl font-sansKR-Bold">{statistics.totalParticipants}명</div>
              <p className="text-xs text-gray-500">총 응시 학생</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs smalltablet:text-sm font-sansKR-Medium text-gray-900">평균 점수</h3>
              <Target className="h-3.5 smalltablet:h-4 w-3.5 smalltablet:w-4 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-xl smalltablet:text-2xl text-green-600 font-sansKR-Bold">{statistics.averageScore.toFixed(1)}점</div>
              <p className="text-xs text-gray-500">전체 평균</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
          <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
            점수 분포
          </h3>
          <div className="space-y-3 smalltablet:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs smalltablet:text-sm text-gray-600">최고점</span>
              <div className="flex items-center gap-1.5 smalltablet:gap-2">
                <TrendingUp className="h-3.5 smalltablet:h-4 w-3.5 smalltablet:w-4 text-green-600" />
                <span className="text-sm smalltablet:text-base font-sansKR-Bold text-green-600">{statistics.highestScore}점</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs smalltablet:text-sm text-gray-600">최저점</span>
              <div className="flex items-center gap-1.5 smalltablet:gap-2">
                <TrendingDown className="h-3.5 smalltablet:h-4 w-3.5 smalltablet:w-4 text-red-600" />
                <span className="text-sm smalltablet:text-base font-sansKR-Bold text-red-600">{statistics.lowestScore}점</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs smalltablet:text-sm text-gray-600">평균 등급</span>
              <span className="text-sm smalltablet:text-base font-sansKR-Bold">{statistics.averageGrade.toFixed(1)}등급</span>
            </div>
          </div>
        </div>
      </div>

             {/* 오답률 분포 */}
       <div className="bg-white w-full rounded-lg border border-gray-200 p-4 smalltablet:p-6">
         <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
           <Target className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
           오답률 TOP10
         </h3>
         <div className="grid grid-cols-2 smalltablet:grid-cols-3 tablet:grid-cols-5 desktop:grid-cols-5 gap-2 smalltablet:gap-4">
           {getTopIncorrectQuestions().map((question, index) => (
             <div
               key={question.questionNumber}
               className="flex flex-col items-center justify-center text-center h-20 smalltablet:h-24"
             >
               <div className={`text-2xl smalltablet:text-3xl font-sansKR-Bold ${
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
                 {question.questionNumber}번
               </div>
               <div className="text-xs text-gray-500 mt-1">
                 정답률 {question.correctRate.toFixed(0)}%
               </div>
             </div>
           ))}
         </div>
       </div>

    </div>

      {/* 등급별 학생 분포와 문제 유형별 정답률을 한 row에 배치 */}
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 smalltablet:gap-6">
        {/* 등급별 학생 분포 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
          <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
            등급별 학생 분포
          </h3>
          <div className="w-full h-full max-h-[400px] smalltablet:max-h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statistics.gradeDistribution}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                >
                  <LabelList 
                    dataKey="count" 
                    position="top" 
                    formatter={(value: number) => `${value}명`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 문제 유형별 정답률 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
          <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
            문제 유형별 정답률
          </h3>
          <div className="space-y-3 smalltablet:space-y-4">
            {(() => {
              if (!questionTypes) {
                return (
                  <div className="text-sm smalltablet:text-base text-gray-500 text-center py-3 smalltablet:py-4">
                    문제 유형 정보를 불러올 수 없습니다.
                  </div>
                );
              }

              const typeStatistics = calculateQuestionTypeStatistics();
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];

              return typeStatistics.map((item, index) => {
                const color = colors[index % colors.length];

                return (
                  <div key={index} className="space-y-1.5 smalltablet:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs smalltablet:text-sm text-gray-700">{item.type}</span>
                      <span className="text-xs smalltablet:text-sm text-gray-600">{item.count}문제</span>
                    </div>
                    <div className="flex items-center gap-2 smalltablet:gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 smalltablet:h-4">
                        <div
                          className={`h-3 smalltablet:h-4 rounded-full ${color} transition-all duration-300`}
                          style={{ width: `${item.correctRate}%` }}
                        />
                      </div>
                      <span className="text-xs smalltablet:text-sm font-sansKR-Bold text-gray-900 w-10 smalltablet:w-12 text-right">
                        {item.correctRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* 학원별 비교 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
        <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
          학원별 성취도 비교
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-center">
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">학원</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">응시자</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">평균</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">1등급 수</th>
              </tr>
            </thead>
            <tbody>
              {academies
                .map((academy, index) => {
                  const isSelected = selectedAcademyId === academy.academyId;
                  const academyStats = academyStatistics.get(academy.academyId);

                  return (
                    <tr
                      key={academy.academyId}
                      className={`border-b border-gray-100 hover:bg-gray-50 text-center ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-Bold">
                        {academy.academyName}
                      </td>
                      <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm">
                        {academyStats && academyStats.totalParticipants > 0
                          ? `${academyStats.totalParticipants}명`
                          : '없음'
                        }
                      </td>
                      <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm">
                        {academyStats && academyStats.totalParticipants > 0
                          ? `${academyStats.averageScore.toFixed(1)}`
                          : '없음'
                        }
                      </td>
                      <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm">
                        {academyStats && academyStats.totalParticipants > 0
                          ? `${academyStats.gradeDistribution.find(g => g.grade === 1)?.count || 0}명 (${academyStats.gradeDistribution.find(g => g.grade === 1)?.count &&
                              ((academyStats.gradeDistribution.find(g => g.grade === 1)?.count || 0) / academyStats.totalParticipants * 100).toFixed(1)
                            }%)`
                          : '없음'
                        }
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 문제별 통계 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
        <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-3 smalltablet:mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 smalltablet:h-5 w-4 smalltablet:w-5" />
          문제별 상세 통계
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-center">
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">번호</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">정답</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">배점</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">1</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">2</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">3</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">4</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">5</th>
                <th className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-900">무효</th>
              </tr>
            </thead>
            <tbody>
              {/* {statistics.questionStatistics.map((question) => { */}
              {[...statistics.questionStatistics]
                .sort((a, b) => a.questionNumber - b.questionNumber)
                .map((question) => {
                // 정답 선지 찾기 - correctAnswers에서 확정적으로 가져오기
                const questionNumber = question.questionNumber.toString();
                const correctChoice = correctAnswers[questionNumber] || 'N/A';

                
                return (
                  <tr key={question.questionNumber} className="border-b border-gray-100 hover:bg-gray-50 text-center">
                    <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm">{question.questionNumber}</td>
                    <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm text-blue-600 font-sansKR-Bold">{correctChoice}</td>
                    <td className="py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm text-green-600 font-sansKR-Bold">
                      {question.actualScore}
                    </td>
                    {['1', '2', '3', '4', '5', '무효'].map((choiceNumber) => {
                      const choiceData = question.choiceStatistics?.find(c => c.choice === choiceNumber);
                      const selectionRate = choiceData ? choiceData.selectionRate : 0;
                      const isCorrect = choiceData ? choiceData.isCorrect : false;
                      
                      return (
                        <td key={choiceNumber} className={`py-1.5 smalltablet:py-2 px-2 smalltablet:px-3 text-xs smalltablet:text-sm ${
                          isCorrect ? 'font-sansKR-Bold text-green-600' : 'text-gray-600'
                        }`}>
                          {(selectionRate * 100).toFixed(0)}%
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 오답률 TOP10 계산 함수를 외부에서 사용할 수 있도록 export
export const calculateTopIncorrectQuestions = (
  statistics: ExamStatisticsType | null,
  correctAnswers: Record<string, string>
) => {
  if (!statistics || !correctAnswers) return [];

  return [...statistics.questionStatistics]
    .sort((a, b) => b.incorrectAnswers - a.incorrectAnswers)
    .slice(0, 10)
    .map((question) => {
      return {
        ...question,
        correctRate: question.correctRate * 100,
        incorrectRate: question.incorrectRate * 100
      };
    });
};