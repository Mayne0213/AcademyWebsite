"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { examResultApi } from "@/src/entities/examResult/api";
import { academyApi } from "@/src/entities/academy/api";
import type { ExamStatistics as ExamStatisticsType } from "@/src/entities/examResult/model/types";
import AcademyFilter from "@/src/entities/academy/ui/AcademyFilter";
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
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
  const [academyList, setAcademyList] = useState<Array<{ id: number | null; name: string }>>([]);

  // 학원 목록 가져오기
  const fetchAcademyList = async () => {
    try {
      const academiesData = await academyApi.getAcademies();
      const academiesWithAll = [
        { id: null, name: '전체 학원' },
        ...academiesData.map(academy => ({ 
          id: academy.academyId, 
          name: academy.academyName 
        }))
      ];
      setAcademyList(academiesWithAll);
    } catch (err) {
      console.error('Error fetching academy list:', err);
      // 에러 발생 시 기본값 사용
      setAcademyList([
        { id: null, name: '전체 학원' },
        { id: 1, name: '목동학원' },
        { id: 2, name: '강남학원' }
      ]);
    }
  };

  // 컴포넌트 마운트 시 학원 목록 가져오기
  useEffect(() => {
    fetchAcademyList();
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching statistics for examId:', examId, 'academyId:', selectedAcademyId);
        
        const result = selectedAcademyId 
          ? await examResultApi.getExamStatisticsByAcademy(examId, selectedAcademyId)
          : await examResultApi.getExamStatistics(examId);
        
        console.log('API response:', result);
        
        if (result && result.examId) {
          console.log('Setting statistics:', result);
          setStatistics(result);
          setError(null);
        } else {
          console.log('API call failed or no data:', result);
          setError('통계 데이터를 불러올 수 없습니다.');
        }
      } catch (err) {
        console.error('Error fetching exam statistics:', err);
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
              ? `${academyList.find(a => a.id === selectedAcademyId)?.name} 통계를 불러오는 중...`
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
          {academyList.length > 0 ? (
            <AcademyFilter
              selectedAcademyId={selectedAcademyId}
              academyList={academyList}
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

      {/* 전체 통계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">정답률</h3>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-sansKR-Bold text-green-600">
              {(statistics.overallCorrectRate * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500">전체 정답률</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">학원</h3>
            <CheckCircle className="h-4 w-4 text-red-600" />
          </div>
          <div className="mt-2">
            {isFiltered ? (
              <>
                <div className="text-2xl font-sansKR-Bold text-red-600">
                  {selectedAcademyId === null 
                    ? '전체 학원' 
                    : academyList.find(a => a.id === selectedAcademyId)?.name
                  }
                </div>
                <p className="text-xs text-gray-500">선택된 학원</p>
              </>
            ) : (
              <>
                <div className="text-2xl font-sansKR-Bold text-black">
                  전체 통계
                </div>
                <p className="text-xs text-gray-500">위에서 학원을 선택하면 상세 정보가 표시됩니다</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 점수 분포 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            오답률 TOP5
          </h3>
          <div className="flex justify-center gap-4">
            {statistics.questionStatistics
              .sort((a, b) => b.incorrectAnswers - a.incorrectAnswers)
              .slice(0, 5)
              .map((question, index) => (
                <div 
                  key={question.questionNumber}
                  className="text-center"
                >
                  <div className={`text-3xl ${
                    index === 0 
                      ? 'text-red-800' 
                      : index === 1 
                      ? 'text-orange-800'
                      : index === 2
                      ? 'text-yellow-800'
                      : 'text-gray-800'
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
      <div className="bg-white rounded-lg border border-gray-200 p-6 hidden">
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
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">정답률</th>
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">1등급 비율</th>
              </tr>
            </thead>
            <tbody>
              {academyList
                .filter(academy => academy.id !== null) // '전체 학원' 제외
                .map((academy, index) => {
                  const isSelected = selectedAcademyId === academy.id;
                  
                  return (
                    <tr 
                      key={academy.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 text-center ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-sansKR-Bold">
                        {academy.name}
                      </td>
                      <td className="py-2 px-3">
                        {isSelected && statistics 
                          ? `${statistics.totalParticipants}명`
                          : '응시자 없음'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {isSelected && statistics 
                          ? `${statistics.averageScore.toFixed(1)}점`
                          : '평균 점수 없음'
                        }
                      </td>
                      <td className="py-2 px-3">
                        {isSelected && statistics ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
                            (statistics.overallCorrectRate * 100) >= 85 ? 'bg-green-100 text-green-800' :
                            (statistics.overallCorrectRate * 100) >= 80 ? 'bg-blue-100 text-blue-800' :
                            (statistics.overallCorrectRate * 100) >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {(statistics.overallCorrectRate * 100).toFixed(1)}%
                          </span>
                        ) : (
                          '정답률 없음'
                        )}
                      </td>
                      <td className="py-2 px-3">
                        {isSelected && statistics 
                          ? `${statistics.gradeDistribution.find(g => g.grade === 1)?.count || 0}명 (${statistics.gradeDistribution.find(g => g.grade === 1)?.count && 
                              ((statistics.gradeDistribution.find(g => g.grade === 1)?.count || 0) / statistics.totalParticipants * 100).toFixed(1)
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
        
        {academyList.length === 1 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            학원 목록을 불러오는 중입니다...
          </div>
        )}
        
        {academyList.length > 1 && !isFiltered && (
          <div className="mt-4 text-center text-sm text-gray-500">
            위에서 학원을 선택하면 해당 학원의 상세 통계를 볼 수 있습니다.
          </div>
        )}
      </div>

      {/* 문제별 통계 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {isFiltered ? '선택된 학원 문제별 상세 통계' : '문제별 상세 통계'}
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
                <th className="py-2 px-3 font-sansKR-SemiBold text-gray-900">미기입</th>
              </tr>
            </thead>
            <tbody>
              {statistics.questionStatistics.map((question) => {
                // 정답 선지 찾기 (가장 많이 선택된 선지 중 정답인 것)
                const correctChoice = question.choiceStatistics?.find(c => c.isCorrect)?.choice || 'N/A';
                
                return (
                  <tr key={question.questionNumber} className="border-b border-gray-100 hover:bg-gray-50 text-center">
                    <td className="py-2 px-3">{question.questionNumber}</td>
                    <td className="py-2 px-3 text-blue-600">{correctChoice}</td>
                    <td className="py-2 px-3 text-green-600 font-sansKR-Bold">
                      {question.actualScore}
                    </td>
                    {['1', '2', '3', '4', '5', '미기입'].map((choiceNumber) => {
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