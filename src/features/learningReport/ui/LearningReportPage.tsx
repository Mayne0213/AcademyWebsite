'use client';

import React, { useEffect, useState } from 'react';
import { Student } from '@/src/entities/student/model/types';
import { StudentLearningReport } from '../model/types';
import { studentApi } from '@/src/entities/student/api';
import { learningReportApi } from '../api/learningReportApi';
import { StudentReportCard } from './StudentReportCard';


interface LearningReportPageProps {
  academyId?: number;
}

export const LearningReportPage: React.FC<LearningReportPageProps> = ({ 
  academyId 
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [selectedReport, setSelectedReport] = useState<StudentLearningReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 학생 목록 로딩
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const studentsData = await studentApi.getStudents();
        setStudents(studentsData);
      } catch (err) {
        setError('학생 목록을 불러올 수 없습니다.');
        console.error('학생 목록 로딩 오류:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // 학생 선택 시 리포트 로딩
  const handleStudentSelect = async (studentId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const report = await learningReportApi.readStudentLearningReport(studentId);
      setSelectedReport(report);
      setSelectedStudentId(studentId);
    } catch (err) {
      setError('학습 리포트를 불러올 수 없습니다.');
      console.error('학습 리포트 로딩 오류:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 리포트 닫기
  const handleCloseReport = () => {
    setSelectedReport(null);
    setSelectedStudentId(null);
    setError(null);
  };

  // 검색 필터링
  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentPhone.includes(searchTerm)
  );

  if (isLoading && students.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">학생 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && students.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">오류 발생</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 smalltablet:p-6">
        {/* 헤더 */}
        <div className="mb-6">
          <h1 className="text-2xl smalltablet:text-3xl font-bold text-gray-800 mb-2">
            📊 학습 리포트
          </h1>
          <p className="text-gray-600">
            학생별 시험 결과와 학습 진행 상황을 확인할 수 있습니다.
          </p>
        </div>

        {!selectedReport ? (
          /* 학생 선택 화면 */
          <div className="space-y-6">
            {/* 검색 및 필터 */}
            <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
              <div className="flex flex-col smalltablet:flex-row smalltablet:items-center space-y-3 smalltablet:space-y-0 smalltablet:space-x-4">
                <div className="flex-1">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    학생 검색
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="이름 또는 전화번호로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  총 {filteredStudents.length}명의 학생
                </div>
              </div>
            </div>

            {/* 학생 목록 */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="border-b bg-gray-50 p-4 smalltablet:p-6">
                <h2 className="text-lg smalltablet:text-xl font-semibold text-gray-800">
                  학생 목록
                </h2>
              </div>
              
              <div className="p-4 smalltablet:p-6">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">👥</div>
                    <p className="text-gray-500 mb-2">
                      {searchTerm ? '검색 결과가 없습니다.' : '등록된 학생이 없습니다.'}
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        검색어 지우기
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.memberId}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => handleStudentSelect(student.memberId)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-lg">
                              {student.studentName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{student.studentName}</h3>
                            <p className="text-sm text-gray-600">{student.studentPhone}</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          {student.studentHighschool || '고등학교 미입력'}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">학습 리포트 보기</span>
                            <span className="text-blue-600">→</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* 선택된 학생 리포트 */
          <StudentReportCard
            report={selectedReport}
            onClose={handleCloseReport}
          />
        )}

        {/* 로딩 오버레이 */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">학습 리포트를 불러오는 중...</p>
            </div>
          </div>
        )}

        {/* 오류 메시지 */}
        {error && (
          <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50">
            <div className="flex items-center space-x-2">
              <span>❌</span>
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
