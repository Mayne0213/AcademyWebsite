"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { examResultApi } from "@/src/entities/examResult/api";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
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

  // academy feature store와 entity store 사용
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();



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
      }
    }

    setAcademyStatistics(statisticsMap);
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

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        
        const result = selectedAcademyId 
          ? await examResultApi.getExamStatisticsByAcademy(examId, selectedAcademyId)
          : await examResultApi.getExamStatistics(examId);
        
        
        if (result && result.examId) {
          setStatistics(result);
          setError(null);
        } else {
          setError('통계 데이터를 불러올 수 없습니다.');
        }
      } catch (err) {
        setError('통계 데이터를 불러오는 중 오류가 발생했습니다.');
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">오류 발생</h3>
          <p className="text-gray-500">{error || '통계 데이터를 불러올 수 없습니다.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* 헤더 */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{statistics.examName}</h1>
        <p className="text-gray-600">시험 통계 및 분석</p>
        
        {/* 학원 선택 필터 */}
        <div className="mt-6 flex items-center justify-end gap-4">
          {academies.length > 0 ? (
            <AcademyFilter
              selectedAcademyId={selectedAcademyId}
              academies={academies}
              onAcademyChange={handleAcademyChange}
              resetFilter={resetFilter}
              isFiltered={isFiltered}
            />
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-md">
              학원 목록을 불러오는 중...
            </div>
          )}
        </div>
      </div>

    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 전체 통계 요약 */}
      <div className="space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">응시자 수</h3>
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-sansKR-Bold">{statistics.totalParticipants}명</div>
              <p className="text-xs text-gray-500">총 응시 학생</p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">평균 점수</h3>
              <Target className="h-4 w-4 text-gray-400" />
            </div>
            <div className="mt-2">
              <div className="text-2xl text-green-600 font-sansKR-Bold">{statistics.averageScore.toFixed(1)}점</div>
              <p className="text-xs text-gray-500">전체 평균</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            점수 분포
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">최고점</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-sansKR-Bold text-green-600">{statistics.highestScore}점</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">최저점</span>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="font-sansKR-Bold text-red-600">{statistics.lowestScore}점</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">평균 등급</span>
              <span className="font-sansKR-Bold">{statistics.averageGrade.toFixed(1)}등급</span>
            </div>
          </div>
        </div>
      </div>

             {/* 오답률 분포 */}
       <div className="bg-white w-full rounded-lg border border-gray-200 p-6">
         <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
           <Target className="h-5 w-5" />
           오답률 TOP10
         </h3>
         <div className="grid grid-cols-2 smalltablet:grid-cols-3 tablet:grid-cols-5 desktop:grid-cols-5 gap-4">
           {statistics.questionStatistics
             .sort((a, b) => b.incorrectAnswers - a.incorrectAnswers)
             .slice(0, 10)
             .map((question, index) => (
               <div
                 key={question.questionNumber}
                 className="flex flex-col items-center justify-center text-center h-24"
               >
                 <div className={`text-3xl font-bold ${
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
                   정답률 {(question.correctRate * 100).toFixed(0)}%
                 </div>
               </div>
             ))}
         </div>
       </div>

    </div>

      {/* 등급별 학생 분포와 문제 유형별 정답률을 한 row에 배치 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 등급별 학생 분포 */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            등급별 학생 분포
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={statistics.gradeDistribution}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            문제 유형별 정답률
          </h3>
          <div className="space-y-4">
            {[
              { type: '듣기', correctRate: 85, count: 15, color: 'bg-blue-500' },
              { type: '읽기', correctRate: 72, count: 20, color: 'bg-green-500' },
              { type: '문법', correctRate: 68, count: 10, color: 'bg-yellow-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{item.type}</span>
                  <span className="text-sm text-gray-600">{item.count}문제</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${item.color} transition-all duration-300`}
                      style={{ width: `${item.correctRate}%` }}
                    />
                  </div>
                  <span className="text-sm font-sansKR-Bold text-gray-900 w-12 text-right">
                    {item.correctRate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 학원별 비교 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          학원별 성취도 비교
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-center">
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">학원명</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">응시자 수</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">평균점수</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">1등급 비율</th>
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
                      <td className="py-2 px-3 font-sansKR-Bold">
                        {academy.academyName}
                      </td>
                      <td className="py-2 px-3">
                        {academyStats && academyStats.totalParticipants > 0
                          ? `${academyStats.totalParticipants}명`
                          : '응시자 없음'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {academyStats && academyStats.totalParticipants > 0
                          ? `${academyStats.averageScore.toFixed(1)}점`
                          : '평균 점수 없음'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {academyStats && academyStats.totalParticipants > 0
                          ? `${academyStats.gradeDistribution.find(g => g.grade === 1)?.count || 0}명 (${academyStats.gradeDistribution.find(g => g.grade === 1)?.count &&
                              ((academyStats.gradeDistribution.find(g => g.grade === 1)?.count || 0) / academyStats.totalParticipants * 100).toFixed(1)
                            }%)`
                          : '시험 결과 없음'
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
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          문제별 상세 통계
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-center">
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">번호</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">정답</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">배점</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">1</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">2</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">3</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">4</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">5</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">무효</th>
              </tr>
            </thead>
            <tbody>
              {/* {statistics.questionStatistics.map((question) => { */}
              {[...statistics.questionStatistics]
                .sort((a, b) => a.questionNumber - b.questionNumber)
                .map((question) => {
                // 정답 선지 찾기 (가장 많이 선택된 선지 중 정답인 것)
                const correctChoice = question.choiceStatistics?.find(c => c.isCorrect)?.choice || 'N/A';
                
                return (
                  <tr key={question.questionNumber} className="border-b border-gray-100 hover:bg-gray-50 text-center">
                    <td className="py-2 px-3">{question.questionNumber}</td>
                    <td className="py-2 px-3 text-blue-600">{correctChoice}</td>
                    <td className="py-2 px-3 text-green-600 font-sansKR-Bold">
                      {question.actualScore}
                    </td>
                    {['1', '2', '3', '4', '5', '무효'].map((choiceNumber) => {
                      const choiceData = question.choiceStatistics?.find(c => c.choice === choiceNumber);
                      const selectionRate = choiceData ? choiceData.selectionRate : 0;
                      const isCorrect = choiceData ? choiceData.isCorrect : false;
                      
                      return (
                        <td key={choiceNumber} className={`py-2 px-3 text-sm ${
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