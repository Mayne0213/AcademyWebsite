'use client';

import React, { useState, useEffect } from 'react';
import { ExamSummary } from '@/src/entities/exam/model/types';
import { ExamList } from '@/src/entities/exam/ui';
import { examResultApi } from '@/src/entities/examResult/api';
import { ExamQuestionResult, ExamResultWithAcademyInfo } from '@/src/entities/examResult/model/types';
import StudentReportJPG, { generateStudentReportJPG } from '@/src/features/learningReport/ui/StudentReportJPG';
import { learningReportApi } from '@/src/features/learningReport/api/learningReportApi';
import { Academy } from '@/src/entities/academy/model/types';
import { academyApi } from '@/src/entities/academy/api';
import AcademyFilter from '@/src/entities/academy/ui/AcademyFilter';
import { calculateTopIncorrectQuestions } from '@/src/features/examCRUD/ui/ExamStatistics';
import { useReportGeneration, ReportProcessingProgressModal, ReportGenerationSummaryModal } from '@/src/features/reportGeneration';
import { studentApi } from '@/src/entities/student/api';

// 새로운 구조: 각 시험 결과를 독립적으로 관리
interface StudentExamResult {
  examId: number;
  studentId: number;
  examResultId: number;
  studentName: string;
  // 기본 정보 (즉시 로딩)
  academyName?: string;
  totalScore?: number;
  grade?: string;
  // 상세 정보 (나중에 로딩)
  questionResults?: ExamQuestionResult[];
  examCorrectAnswers?: Record<number, string>;
  examStatistics?: any;
  questionTypeStatistics?: Array<{
    type: string;
    correctRate: number;
    count: number;
  }>;
  // 학생의 최근 4개 시험 이력 (학습 추이용)
  recentExamHistory?: Array<{
    examId: number;
    examName: string;
    totalScore: number;
    grade: number;
    examDate: Date;
    examResultId: number;
  }>;
}

// 새로운 상태 구조: examResultId를 키로 사용
interface StudentExamResultsMap {
  [examResultId: number]: StudentExamResult;
}

export default function ReportPage() {
  const [selectedExam, setSelectedExam] = useState<ExamSummary | null>(null);
  // 새로운 상태 구조 사용
  const [studentExamResultsMap, setStudentExamResultsMap] = useState<StudentExamResultsMap>({});
  const [filteredExamResultIds, setFilteredExamResultIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [academies, setAcademies] = useState<Academy[]>([]);
  const [selectedAcademyId, setSelectedAcademyId] = useState<number | null>(null);
  const [loadingStudents, setLoadingStudents] = useState<Set<number>>(new Set());
  const [showReportSummaryModal, setShowReportSummaryModal] = useState(false);

  // 리포트 생성 로직을 담당하는 hook
  const {
    isProcessing: isReportProcessing,
    processingProgress: reportProgress,
    generationResults: reportResults,
    processingError: reportError,
    processReports,
    resetResults: resetReportResults,
    retryProcessing: retryReportProcessing
  } = useReportGeneration();

  // 학원 목록 조회
  useEffect(() => {
    const fetchAcademies = async () => {
      try {
        const academiesData = await academyApi.getAcademies();
        setAcademies(academiesData);
      } catch (error) {
        console.error('학원 목록 조회 실패:', error);
      }
    };
    fetchAcademies();
  }, []);

  // 시험 선택 시 해당 시험을 응시한 학생들의 결과 조회
  useEffect(() => {
    if (selectedExam) {
      fetchStudentResults(selectedExam.examId);
    } else {
      setStudentExamResultsMap({});
      setFilteredExamResultIds([]);
    }
  }, [selectedExam]);

  // 학원 필터 변경 시 학생 결과 필터링
  useEffect(() => {
    if (selectedAcademyId === null) {
      // 모든 examResultId를 필터링
      setFilteredExamResultIds(Object.keys(studentExamResultsMap).map(Number));
    } else {
      const selectedAcademy = academies.find(a => a.academyId === selectedAcademyId);
      if (selectedAcademy) {
        const filtered = Object.values(studentExamResultsMap)
          .filter(student => student.academyName === selectedAcademy.academyName)
          .map(student => student.examResultId);
        setFilteredExamResultIds(filtered);
      }
    }
  }, [selectedAcademyId, studentExamResultsMap, academies]);

  const fetchStudentResults = async (examId: number) => {
  setIsLoading(true);
  try {
    // 시험 결과와 학원 정보를 한 번에 조회 (새로운 API 사용)
    const response = await examResultApi.readWithAcademyInfo({ examId, limit: 300 });

    // API 응답이 배열을 직접 반환하는 경우와 객체를 반환하는 경우 모두 처리
    let examResults: ExamResultWithAcademyInfo[] = [];

    if (Array.isArray(response)) {
      // 배열을 직접 반환하는 경우
      examResults = response;
    } else if (response.success && response.data) {
      // 객체 형태 응답 처리
      examResults = response.data;
    } else {
      setStudentExamResultsMap({});
      return;
    }

    if (examResults.length > 0) {
      const newStudentExamResultsMap: StudentExamResultsMap = {};

      // 학원 정보가 이미 포함된 데이터를 사용
      examResults.forEach((examResult) => {
        newStudentExamResultsMap[examResult.examResultId] = {
          examId: examResult.examId,
          studentId: examResult.studentId,
          examResultId: examResult.examResultId,
          studentName: examResult.student?.studentName || 'Unknown',
          academyName: examResult.student?.academy?.academyName || '학원 정보 없음',
          totalScore: examResult.totalScore,
          grade: examResult.grade.toString()
        };
      });

      setStudentExamResultsMap(newStudentExamResultsMap);
    } else {
      setStudentExamResultsMap({});
    }
  } catch (error) {
    console.error('학생 결과 조회 실패:', error);
    setStudentExamResultsMap({});
  } finally {
    setIsLoading(false);
  }
};

  // 문제 유형별 정답률 계산 함수
  const calculateQuestionTypeStatistics = (questionResults: ExamQuestionResult[], questionTypes: Record<number, string>) => {
    if (!questionTypes || Object.keys(questionTypes).length === 0) {
      return [];
    }

    const typeStats = new Map<string, { correct: number; total: number; questions: number[] }>();

    questionResults.forEach((item) => {
      const questionType = questionTypes[item.questionNumber] || '기타';

      if (!typeStats.has(questionType)) {
        typeStats.set(questionType, { correct: 0, total: 0, questions: [] });
      }

      const stats = typeStats.get(questionType)!;
      stats.total += 1;
      if (item.isCorrect) stats.correct += 1;
      stats.questions.push(item.questionNumber);
    });

    return Array.from(typeStats.entries())
      .map(([type, stats]) => ({
        type,
        correctRate: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        count: stats.questions.length,
        minQuestionNumber: Math.min(...stats.questions)
      }))
      .sort((a, b) => a.minQuestionNumber - b.minQuestionNumber)
      .map(({ type, correctRate, count }) => ({ type, correctRate, count }));
  };

  // 학원 필터 초기화
  const resetAcademyFilter = () => {
    setSelectedAcademyId(null);
  };

  // 학생의 최근 4개 시험 이력 조회
  const fetchStudentRecentExamHistory = async (studentId: number) => {
    try {
      const response = await fetch(`/api/examResult/student/${studentId}?limit=4&sortBy=createdAt&sortOrder=desc`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          return data.data.map((examResult: any) => ({
            examId: examResult.examId,
            examName: examResult.exam.examName,
            totalScore: examResult.totalScore,
            grade: examResult.grade,
            examDate: new Date(examResult.createdAt),
            examResultId: examResult.examResultId
          }));
        }
      }
      return [];
    } catch (error) {
      console.error('학생 최근 시험 이력 조회 실패:', error);
      return [];
    }
  };

    // 전체 학생 리포트 생성 (새로운 모달 시스템 사용)
  const loadAllStudentDetails = async () => {
    const studentsToLoad = filteredExamResultIds
      .filter(examResultId => {
        const student = studentExamResultsMap[examResultId];
        return student && (!student.questionResults || student.questionResults.length === 0);
      })
      .map(examResultId => {
        const student = studentExamResultsMap[examResultId];
        return {
          examResultId,
          studentId: student.studentId,
          studentName: student.studentName,
          totalScore: student.totalScore || 0,
          grade: student.grade || '0'
        };
      });

    if (studentsToLoad.length === 0) return;

    try {
      await processReports(
        studentsToLoad,
        loadStudentDetails,
        selectedExam?.examName || '',
        () => {
          setShowReportSummaryModal(true);
        }
      );
    } catch (error) {
      console.error('전체 리포트 생성 실패:', error);
    }
  };

  // 학생의 상세 정보 로딩 (JPG 다운로드 시 필요)
  const loadStudentDetails = async (examResultId: number, examName: string) => {
    // 로딩 상태 추가
    setLoadingStudents(prev => new Set(prev).add(examResultId));

    try {
      const student = studentExamResultsMap[examResultId];
      if (!student) return;

      // 시험의 정답과 문제 유형 정보 가져오기
      const [examResponse, statisticsResponse] = await Promise.all([
        fetch(`/api/exam/${student.examId}`),
        fetch(`/api/examResult/exam/${student.examId}/statistics`)
      ]);

      let examDetails = null;
      let examStatistics = null;

      if (examResponse.ok) {
        examDetails = await examResponse.json();
      }
      if (statisticsResponse.ok) {
        examStatistics = await statisticsResponse.json();
      }

      // 문제별 결과 가져오기
      let questionResults: ExamQuestionResult[] = [];
      try {
        questionResults = await learningReportApi.readExamQuestionResults(student.examResultId);
      } catch (error) {
        console.error('문제별 결과 조회 실패:', error);
      }

      // 문제 유형별 정답률 계산
      const questionTypeStatistics = calculateQuestionTypeStatistics(
        questionResults,
        examDetails?.success ? examDetails.data.questionTypes || {} : {}
      );

      // 오답률 TOP10 계산 (전체 시험 통계 기반)
      const topIncorrectQuestions = calculateTopIncorrectQuestions(
        examStatistics?.success ? examStatistics.data : null,
        examDetails?.success ? examDetails.data.correctAnswers || {} : {}
      );

      // 학생의 최근 4개 시험 이력 조회
      const recentExamHistory = await fetchStudentRecentExamHistory(student.studentId);

      // 학생 정보 업데이트 - examResultId 기반으로 정확한 업데이트
      const updatedStudent = {
        ...student,
        questionResults,
        examCorrectAnswers: examDetails?.success ? examDetails.data.correctAnswers || {} : {},
        examStatistics: examStatistics?.success ? examStatistics.data : { averageScore: 0 },
        questionTypeStatistics,
        topIncorrectQuestions,
        recentExamHistory
      };

      // 새로운 맵 구조로 업데이트
      setStudentExamResultsMap(prev => ({
        ...prev,
        [examResultId]: updatedStudent
      }));

      // 데이터 로딩 완료 후 자동으로 JPG 다운로드
      try {
        await generateStudentReportJPG(
          {
            examId: updatedStudent.examId,
            examName: examName,
            totalScore: updatedStudent.totalScore || 0,
            grade: parseInt(updatedStudent.grade || '0'),
            examDate: new Date(),
            examResultId: updatedStudent.examResultId
          },
          updatedStudent.recentExamHistory || [],
          updatedStudent.examCorrectAnswers || {},
          updatedStudent.examStatistics || { averageScore: 0 },
          updatedStudent.questionResults || [],
          updatedStudent.questionTypeStatistics || [],
          updatedStudent.studentName
        );
      } catch (jpgError) {
        console.error('JPG 생성 실패:', jpgError);
        // JPG 생성 실패해도 데이터는 정상적으로 로딩되었으므로 에러를 throw하지 않음
      }

    } catch (error) {
      console.error('학생 상세 정보 로딩 실패:', error);
    } finally {
      // 로딩 상태 제거
      setLoadingStudents(prev => {
        const newSet = new Set(prev);
        newSet.delete(examResultId);
        return newSet;
      });
    }
  };

  // 리포트 생성 모달 관련 함수들
  const handleCloseReportSummaryModal = () => {
    setShowReportSummaryModal(false);
    resetReportResults();
  };

  const handleRetryReportGeneration = async () => {
    if (!selectedExam) return;

    const studentsToLoad = filteredExamResultIds
      .filter(examResultId => {
        const student = studentExamResultsMap[examResultId];
        return student && (!student.questionResults || student.questionResults.length === 0);
      })
      .map(examResultId => {
        const student = studentExamResultsMap[examResultId];
        return {
          examResultId,
          studentId: student.studentId,
          studentName: student.studentName,
          totalScore: student.totalScore || 0,
          grade: student.grade || '0'
        };
      });

    try {
      await retryReportProcessing(
        studentsToLoad,
        loadStudentDetails,
        selectedExam.examName,
        () => {
          setShowReportSummaryModal(true);
        }
      );
    } catch (error) {
      console.error('리포트 재생성 실패:', error);
    }
  };

  return (
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-8 text-2xl desktop:text-3xl font-sansKR-Bold">
        📝 학습 리포트
      </div>

      <div className="grid grid-cols-1 h-full smalltablet:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-4 smalltablet:gap-6 tablet:gap-8">
        <div className="space-y-4 smalltablet:space-y-6">
          <ExamList onExamSelect={(exam) => setSelectedExam(exam)} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6 h-full">
          {selectedExam ? (
            <div>
              <div className='flex flex-col smalltablet:flex-row justify-between items-start smalltablet:items-center mb-4 smalltablet:mb-6 gap-3 smalltablet:gap-0'>
                <h2 className="text-lg smalltablet:text-xl font-sansKR-Bold text-gray-800">
                  {selectedExam.examName} - 응시 학생 목록
                </h2>
                <div className="flex flex-col smalltablet:flex-row w-full smalltablet:w-auto gap-2 smalltablet:gap-3">
                  <AcademyFilter
                    selectedAcademyId={selectedAcademyId}
                    academies={academies}
                    onAcademyChange={setSelectedAcademyId}
                    resetFilter={resetAcademyFilter}
                    isFiltered={selectedAcademyId !== null}
                  />
                  {filteredExamResultIds.length > 0 && (
                                        <button
                      onClick={loadAllStudentDetails}
                      disabled={loadingStudents.size > 0 || isReportProcessing}
                      className={`px-3 smalltablet:px-4 py-2 text-white rounded-lg transition-colors font-sansKR-Medium text-xs smalltablet:text-sm flex items-center justify-center gap-2 whitespace-nowrap ${
                        loadingStudents.size > 0 || isReportProcessing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {(loadingStudents.size > 0 || isReportProcessing) && (
                        <div className="animate-spin rounded-full h-3 w-3 smalltablet:h-4 smalltablet:w-4 border-b-2 border-white"></div>
                      )}
                      {isReportProcessing ? 'JPG 생성 중...' : loadingStudents.size > 0 ? `JPG 생성 중... (${loadingStudents.size})` : '전체 JPG 다운로드'}
                    </button>
                  )}
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col smalltablet:flex-row items-center justify-center py-8 smalltablet:py-12">
                  <div className="animate-spin rounded-full h-6 w-6 smalltablet:h-8 smalltablet:w-8 border-b-2 border-blue-600"></div>
                  <span className="mt-2 smalltablet:mt-0 smalltablet:ml-3 text-sm smalltablet:text-base text-gray-600 font-sansKR-Regular">학생 결과를 불러오는 중...</span>
                </div>
              ) : filteredExamResultIds.length > 0 ? (
                <div className="space-y-3 smalltablet:space-y-4 max-h-[calc(100vh-280px)] smalltablet:max-h-[calc(100vh-300px)] tablet:max-h-[calc(100vh-320px)] overflow-y-auto">
                  {filteredExamResultIds.map((examResultId) => {
                    const student = studentExamResultsMap[examResultId];
                    if (!student) return null;

                    return (
                      <StudentResultCard
                        key={examResultId}
                        student={student}
                        examName={selectedExam.examName}
                        onLoadDetails={loadStudentDetails}
                        isLoading={loadingStudents.has(examResultId)}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8 smalltablet:py-12 font-sansKR-Regular">
                  <div className="text-3xl smalltablet:text-4xl mb-3 smalltablet:mb-4">📝</div>
                  <p className="text-sm smalltablet:text-base">
                    {selectedAcademyId
                      ? '선택한 학원에 응시한 학생이 없습니다'
                      : '이 시험을 응시한 학생이 없습니다'
                    }
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-black py-6 smalltablet:py-8 h-full flex flex-col justify-center font-sansKR-SemiBold space-y-6 smalltablet:space-y-8">
              <div className="text-4xl smalltablet:text-5xl">📝</div>
              <p className='text-lg smalltablet:text-xl tablet:text-2xl'>채점할 시험을 선택해주세요</p>
            </div>
          )}
        </div>
      </div>

      {/* 리포트 생성 진행 상황 모달 */}
      {reportProgress && (
        <ReportProcessingProgressModal
          isOpen={!!reportProgress}
          progress={reportProgress}
        />
      )}

      {/* 리포트 생성 결과 요약 모달 */}
      {selectedExam && reportResults.length > 0 && (
        <ReportGenerationSummaryModal
          isOpen={showReportSummaryModal}
          onClose={handleCloseReportSummaryModal}
          results={reportResults}
          examName={selectedExam.examName}
          examId={selectedExam.examId}
        />
      )}

      {/* 리포트 생성 오류 발생 시 표시 */}
      {reportError && (
        <div className="fixed bottom-4 right-4 max-w-md z-50">
          <div className="p-4 bg-red-50 border border-red-200 rounded-md shadow-lg">
            <div className="flex items-start space-x-3">
              <span className="text-red-600 text-lg">❌</span>
              <div className="flex-1">
                <h4 className="font-sansKR-Medium text-red-800 mb-2">리포트 생성 중 오류가 발생했습니다</h4>
                <p className="text-sm text-red-700 mb-3 font-sansKR-Regular">{reportError.message}</p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleRetryReportGeneration}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors font-sansKR-Medium"
                  >
                    다시 시도
                  </button>
                  <button
                    onClick={resetReportResults}
                    className="px-3 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-sansKR-Medium"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// 학생별 결과 카드 컴포넌트 - 단순화됨
const StudentResultCard: React.FC<{
  student: StudentExamResult;
  examName: string;
  onLoadDetails: (examResultId: number, examName: string) => Promise<void>;
  isLoading: boolean;
}> = ({ student, examName, onLoadDetails, isLoading }) => {



  return (
    <div className="border border-gray-200 rounded-lg p-3 smalltablet:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col smalltablet:flex-row items-start smalltablet:items-center justify-between gap-3 smalltablet:gap-0">
        <div className="flex-1 w-full smalltablet:w-auto">
          <div className="flex flex-col smalltablet:flex-row smalltablet:items-center gap-2 mb-2 smalltablet:mb-2">
            <h3 className="text-base smalltablet:text-lg font-sansKR-Bold text-gray-800">
              {student.studentName}
            </h3>
            <span className="text-xs smalltablet:text-sm text-gray-500 font-sansKR-Regular bg-gray-100 px-2 py-1 rounded w-fit">
              {student.academyName}
            </span>
          </div>
          <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-2 smalltablet:gap-4 text-xs smalltablet:text-sm">
            <div className="flex flex-wrap gap-2 smalltablet:gap-0">
              <span className="text-gray-600 font-sansKR-Regular">총점:</span>
              <span className="ml-0 smalltablet:ml-2 mr-2 smalltablet:mr-4 font-sansKR-Bold text-blue-600">{student.totalScore || '로딩 중...'}점</span>
              <span className="text-gray-600 font-sansKR-Regular">등급:</span>
              <span className="ml-0 smalltablet:ml-2 font-sansKR-Bold text-green-600">{student.grade || '로딩 중...'}등급</span>
            </div>
          </div>
        </div>

        {/* StudentReportJPG 컴포넌트만 표시 */}
        <div className="flex flex-col items-center smalltablet:items-end gap-2 w-full smalltablet:w-auto">
          {/* StudentReportJPG를 항상 표시하되, 상세 정보가 로딩되지 않은 경우 로딩 상태 표시 */}
          {student.questionResults && student.questionResults.length > 0 ? (
            <>
              {console.log('🔍 StudentReportJPG Props 전달:', {
                selectedExamId: student.examId,
                examResultId: student.examResultId,
                studentName: student.studentName,
                totalScore: student.totalScore,
                grade: student.grade,
                // 새로운 구조: 단일 시험 결과만 전달
                singleExamHistory: [
                  {
                    examId: student.examId,
                    examName: examName,
                    totalScore: student.totalScore || 0,
                    grade: student.grade || 0,
                    examDate: new Date().toISOString(),
                    examResultId: student.examResultId
                  }
                ],
                examCorrectAnswers: student.examCorrectAnswers,
                examStatistics: student.examStatistics,
                questionResults: student.questionResults,
                questionTypeStatistics: student.questionTypeStatistics
              })}
              <StudentReportJPG
                selectedExamId={student.examId}
                selectedExamName={examName}
                selectedExamData={{
                  examId: student.examId,
                  examName: examName,
                  totalScore: (student.totalScore || 0) as number,
                  grade: parseInt(student.grade || '0') as number,
                  examDate: new Date(),
                  examResultId: student.examResultId
                }}
                recentExamHistory={student.recentExamHistory || []}
                examCorrectAnswers={student.examCorrectAnswers || {}}
                examStatistics={student.examStatistics || { averageScore: 0 }}
                questionResults={student.questionResults || []}
                questionTypeStatistics={student.questionTypeStatistics || []}
                studentName={student.studentName}
              />
            </>
          ) : (
            // 상세 정보가 로딩되지 않은 경우 로딩 상태 표시
            <div className="text-center w-full smalltablet:w-auto">
                            <button
                onClick={() => onLoadDetails(student.examResultId, examName)}
                disabled={isLoading}
                className={`px-3 smalltablet:px-4 py-2 text-white rounded-lg transition-colors font-sansKR-Medium text-xs smalltablet:text-sm w-full smalltablet:w-auto flex items-center justify-center gap-2 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading && (
                  <div className="animate-spin rounded-full h-3 w-3 smalltablet:h-4 smalltablet:w-4 border-b-2 border-white"></div>
                )}
                {isLoading ? 'JPG 생성 중...' : 'JPG 다운로드'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
