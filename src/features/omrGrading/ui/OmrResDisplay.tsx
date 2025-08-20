'use client';

import React from 'react';
import { OMRGradingResult } from '../model/types';

interface OmrResDisplayProps {
  result: OMRGradingResult;
  studentName?: string;
  examName?: string;
}

export const OmrResDisplay: React.FC<OmrResDisplayProps> = ({
  result,
  studentName,
  examName
}) => {
  const { totalScore, grade, phoneNumber, results } = result;

  // results가 없거나 빈 배열인 경우 처리
  if (!results || results.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">채점 결과 오류</h2>
          <p className="text-gray-600 mb-4">채점 결과 데이터가 올바르게 전달되지 않았습니다.</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-red-800 mb-2">디버깅 정보:</h3>
            <pre className="text-sm text-red-700 overflow-auto">
              {JSON.stringify({ totalScore, grade, resultsLength: results?.length }, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  const getGradeText = (grade: number) => {
    const gradeMap: Record<number, string> = {
      1: '1등급',
      2: '2등급',
      3: '3등급',
      4: '4등급',
      5: '5등급',
      6: '6등급',
      7: '7등급',
      8: '8등급',
      9: '9등급'
    };
    return gradeMap[grade] || `${grade}등급`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: number) => {
    if (grade <= 3) return 'text-green-600';
    if (grade <= 5) return 'text-blue-600';
    if (grade <= 7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQuestionTypeStats = () => {
    const typeStats: Record<string, { total: number; correct: number; score: number }> = {};
    
    results.forEach(item => {
      const type = item.questionType;
      if (!typeStats[type]) {
        typeStats[type] = { total: 0, correct: 0, score: 0 };
      }
      
      typeStats[type].total += item.score;
      typeStats[type].score += item.earnedScore;
      if (item.earnedScore > 0) {
        typeStats[type].correct += 1;
      }
    });

    return typeStats;
  };

  const typeStats = getQuestionTypeStats();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {examName || '시험'} 결과
        </h2>
        {studentName && (
          <p className="text-xl text-gray-600">{studentName} 학생</p>
        )}
      </div>

      {/* 총점, 등급, 전화번호 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">총점</h3>
          <p className={`text-4xl font-bold ${getScoreColor(totalScore)}`}>
            {totalScore}점
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">등급</h3>
          <p className={`text-4xl font-bold ${getGradeColor(grade)}`}>
            {getGradeText(grade)}
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">전화번호</h3>
          <p className="text-2xl font-bold text-purple-700 font-mono">
            {phoneNumber || '00000000'}
          </p>
        </div>
      </div>

      {/* 유형별 통계 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">유형별 성취도</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(typeStats).map(([type, stats]) => {
            const percentage = stats.total > 0 ? Math.round((stats.score / stats.total) * 100) : 0;
            return (
              <div key={type} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{type}</h4>
                <p className="text-2xl font-bold text-blue-600">{percentage}%</p>
                <p className="text-sm text-gray-600">
                  {stats.score}/{stats.total}점
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 문제별 결과 테이블 */}
      <div className="w-1/2 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">문제별 결과</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 border-b text-left">문항</th>
                <th className="px-4 py-2 border-b text-left">쓴 답</th>
                <th className="px-4 py-2 border-b text-left">정답</th>
                <th className="px-4 py-2 border-b text-left">배점</th>
                <th className="px-4 py-2 border-b text-left">득점</th>
                <th className="px-4 py-2 border-b text-left">유형</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b font-medium">{item.questionNumber}</td>
                  <td className="px-4 py-2 border-b">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.studentAnswer === item.correctAnswer 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.studentAnswer}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b font-medium">{item.correctAnswer}</td>
                  <td className="px-4 py-2 border-b">{item.score}</td>
                  <td className="px-4 py-2 border-b font-bold">
                    <span className={item.earnedScore > 0 ? 'text-green-600' : 'text-red-600'}>
                      {item.earnedScore}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b text-sm">{item.questionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
