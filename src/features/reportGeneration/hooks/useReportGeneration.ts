import { useState, useCallback } from 'react';
import { ReportProcessingProgress, ReportGenerationError, ReportGenerationResult } from '../model/types';

export const useReportGeneration = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState<ReportProcessingProgress | null>(null);
  const [generationResults, setGenerationResults] = useState<ReportGenerationResult[]>([]);
  const [processingError, setProcessingError] = useState<ReportGenerationError | null>(null);

  const processReports = useCallback(async (
    studentsToProcess: Array<{
      examResultId: number;
      studentId: number;
      studentName: string;
      totalScore: number;
      grade: string;
    }>,
    loadStudentDetailsFunc: (examResultId: number, examName: string) => Promise<void>,
    examName: string,
    onComplete?: (results: ReportGenerationResult[]) => void
  ) => {
    setIsProcessing(true);
    setProcessingError(null);
    setGenerationResults([]);
    
    const startTime = Date.now();
    const results: ReportGenerationResult[] = [];

    try {
      for (let i = 0; i < studentsToProcess.length; i++) {
        const student = studentsToProcess[i];
        const current = i + 1;
        const total = studentsToProcess.length;

        // 진행 상황 업데이트
        const elapsedTime = Date.now() - startTime;
        const processingTime = `${Math.floor(elapsedTime / 1000)}초`;

        setProcessingProgress({
          current,
          total,
          currentStudentName: student.studentName,
          currentStep: 'loading',
          processingTime
        });

        try {
          // 학생 상세 정보 로딩
          await loadStudentDetailsFunc(student.examResultId, examName);

          // 생성 단계로 변경
          setProcessingProgress(prev => prev ? {
            ...prev,
            currentStep: 'generating'
          } : null);

          // 짧은 대기 (UI 업데이트를 위해)
          await new Promise(resolve => setTimeout(resolve, 500));

          // 성공 결과 추가
          results.push({
            studentId: student.studentId,
            examResultId: student.examResultId,
            studentName: student.studentName,
            success: true,
            totalScore: student.totalScore,
            grade: student.grade
          });

        } catch (error) {
          console.error(`학생 ${student.studentName} 리포트 생성 실패:`, error);
          
          // 실패 결과 추가
          results.push({
            studentId: student.studentId,
            examResultId: student.examResultId,
            studentName: student.studentName,
            success: false,
            error: error instanceof Error ? error.message : '알 수 없는 오류'
          });
        }
      }

      setGenerationResults(results);
      onComplete?.(results);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';
      setProcessingError({ message: errorMessage });
      throw error;
    } finally {
      setIsProcessing(false);
      setProcessingProgress(null);
    }
  }, []);

  const resetResults = useCallback(() => {
    setGenerationResults([]);
    setProcessingError(null);
    setProcessingProgress(null);
  }, []);

  const retryProcessing = useCallback(async (
    studentsToProcess: Array<{
      examResultId: number;
      studentId: number;
      studentName: string;
      totalScore: number;
      grade: string;
    }>,
    loadStudentDetailsFunc: (examResultId: number, examName: string) => Promise<void>,
    examName: string,
    onComplete?: (results: ReportGenerationResult[]) => void
  ) => {
    setProcessingError(null);
    return processReports(studentsToProcess, loadStudentDetailsFunc, examName, onComplete);
  }, [processReports]);

  return {
    isProcessing,
    processingProgress,
    generationResults,
    processingError,
    processReports,
    resetResults,
    retryProcessing
  };
};
