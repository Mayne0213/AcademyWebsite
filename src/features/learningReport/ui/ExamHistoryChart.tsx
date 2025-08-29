'use client';

import React from 'react';
import { StudentExamHistory } from '../model/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ExamHistoryChartProps {
  examHistory: StudentExamHistory[];
}

export const ExamHistoryChart: React.FC<ExamHistoryChartProps> = ({ examHistory }) => {
  // 시험 이력이 없거나 1개인 경우 처리
  if (!examHistory || examHistory.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
        <h3 className="text-lg smalltablet:text-xl font-semibold text-gray-800 mb-4">
          시험 이력
        </h3>
        <div className="text-center py-8 text-gray-500">
          아직 시험 이력이 없습니다.
        </div>
      </div>
    );
  }

  if (examHistory.length === 1) {
    const exam = examHistory[0];
    return (
      <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
        <h3 className="text-lg smalltablet:text-xl font-semibold text-gray-800 mb-4">
          시험 이력
        </h3>
        <div className="text-center py-8">
          <div className="text-2xl font-bold text-blue-600 mb-2">{exam.examName}</div>
          <div className="text-lg text-gray-600">
            {new Date(exam.examDate).toLocaleDateString('ko-KR')}
          </div>
          <div className="text-3xl font-bold text-green-600 mt-2">{exam.totalScore}점</div>
          <div className="text-lg text-purple-600">{exam.grade}등급</div>
        </div>
      </div>
    );
  }

  // 점수 변화 추이 계산
  const sortedExams = [...examHistory].sort((a, b) => 
    new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  // 차트 데이터 준비
  const chartData = sortedExams.map((exam, index) => ({
    name: exam.examName.length > 8 ? exam.examName.substring(0, 8) + '...' : exam.examName,
    score: exam.totalScore,
    grade: exam.grade,
    date: new Date(exam.examDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
    fullDate: new Date(exam.examDate).toLocaleDateString('ko-KR'),
    examId: exam.examId,
    change: index > 0 ? exam.totalScore - sortedExams[index - 1].totalScore : 0,
    changePercent: index > 0 && sortedExams[index - 1].totalScore > 0 
      ? ((exam.totalScore - sortedExams[index - 1].totalScore) / sortedExams[index - 1].totalScore * 100).toFixed(1)
      : '0'
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6 h-full">
      <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-800 mb-4">
        시험 통계
      </h3>

      {/* 점수 변화 추이 차트 */}
      <div className="mb-6 flex-1">
        <div className="relative h-64 mb-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                        <p className="font-medium text-gray-800">{data.name}</p>
                        <p className="text-sm text-gray-600">{data.fullDate}</p>
                        <p className="text-lg font-bold text-blue-600">{data.score}점</p>
                        <p className="text-sm text-purple-600">{data.grade}등급</p>
                        {data.change !== 0 && (
                          <p className={`text-sm ${data.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            변화: {data.change > 0 ? '+' : ''}{data.change}점 ({data.changePercent}%)
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="linear" 
                dataKey="score" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
