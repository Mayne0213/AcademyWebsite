import { useState } from 'react';
import { processOMR, saveOMRResultsToDatabase } from '../model/omrProcessor';
import { OMRGradingInput, ExtendedOMRGradingResult, OMRDatabaseSaveInput } from '../model/types';
import { Exam } from '@/src/entities/exam/model/types';

interface ProcessingProgress {
  current: number;
  total: number;
  currentFileName: string;
  currentStep: 'grading' | 'saving';
}

interface ProcessingError {
  message: string;
  fileName?: string;
  type: 'PROCESSING_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR';
}

interface DatabaseSaveProgress {
  isSaving: boolean;
  savedCount: number;
  totalCount: number;
  currentFileName: string;
}

export const useOMRGrading = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState<ProcessingProgress | null>(null);
  const [gradingResults, setGradingResults] = useState<ExtendedOMRGradingResult[]>([]);
  const [processingError, setProcessingError] = useState<ProcessingError | null>(null);

  // 데이터베이스 저장 관련 상태
  const [isSavingToDatabase, setIsSavingToDatabase] = useState(false);
  const [databaseSaveProgress, setDatabaseSaveProgress] = useState<DatabaseSaveProgress | null>(null);
  const [databaseSaveResult, setDatabaseSaveResult] = useState<{ success: boolean; savedCount: number; errors: string[] } | null>(null);

  const processImages = async (
    images: File[], 
    examInfo: Exam,
    onComplete?: (results: ExtendedOMRGradingResult[]) => void
  ): Promise<ExtendedOMRGradingResult[]> => {
    if (images.length === 0) {
      return [];
    }

    // 이전 오류 초기화
    setProcessingError(null);
    setIsProcessing(true);
    setProcessingProgress({
      current: 0,
      total: images.length,
      currentFileName: '',
      currentStep: 'grading'
    });

    try {
      const results: ExtendedOMRGradingResult[] = [];

      // 모든 이미지를 순차적으로 처리 (채점 + DB 저장)
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // 진행 상황 업데이트 - 채점 단계
        setProcessingProgress({
          current: i + 1,
          total: images.length,
          currentFileName: image.name,
          currentStep: 'grading'
        });

        // 시험 정보를 기반으로 formData 설정
        const formData: OMRGradingInput = {
          imageFile: image,
          correctAnswers: examInfo.correctAnswers as any,
          questionScores: examInfo.questionScores as any,
          questionTypes: examInfo.questionTypes as any
        };

        try {
          // OMR 채점 API 호출
          const result = await processOMR(formData);
          
          // API 응답 검증
          if (!result.success || !result.data) {
            // 개별 이미지 처리 실패 - 계속 진행
            const failedResult: ExtendedOMRGradingResult = {
              fileName: image.name,
              success: false,
              error: result.error || '처리 실패',
              totalScore: 0,
              grade: 0,
              phoneNumber: '00000000',
              results: []
            };
            results.push(failedResult);
            continue;
          }

          // 성공한 결과에 파일명 추가
          console.log('OMR 채점 결과:', result.data);
          console.log('추출된 전화번호:', result.data.phoneNumber);
          const resultWithFileName: ExtendedOMRGradingResult = {
            ...result.data,
            fileName: image.name,
            success: true
          };

          // 진행 상황 업데이트 - DB 저장 단계
          setProcessingProgress({
            current: i + 1,
            total: images.length,
            currentFileName: image.name,
            currentStep: 'saving'
          });

          // 채점 성공한 경우 즉시 DB에 저장
          try {
            const saveInput: OMRDatabaseSaveInput = {
              examId: examInfo.examId,
              gradingResults: [resultWithFileName]
            };

            const saveResult = await saveOMRResultsToDatabase(saveInput);

            if (saveResult.success) {
              console.log(`파일 ${image.name} DB 저장 성공`);
              results.push(resultWithFileName);
            } else {
              console.error(`파일 ${image.name} DB 저장 실패:`, saveResult.errors);
              // DB 저장 실패 시 실패 결과로 추가
              const failedResult: ExtendedOMRGradingResult = {
                ...resultWithFileName,
                success: false,
                error: `DB 저장 실패: ${saveResult.errors.join(', ')}`
              };
              results.push(failedResult);
            }
          } catch (saveError) {
            console.error(`파일 ${image.name} DB 저장 중 오류:`, saveError);
            // DB 저장 오류가 발생해도 채점 결과는 유지하되, 실패 상태로 표시
            const failedResult: ExtendedOMRGradingResult = {
              ...resultWithFileName,
              success: false,
              error: `DB 저장 중 오류: ${saveError instanceof Error ? saveError.message : '알 수 없는 오류'}`
            };
            results.push(failedResult);
          }

        } catch (imageError) {
          // 개별 이미지 처리 중 예외 발생 - 계속 진행
          console.error(`이미지 ${image.name} 처리 중 오류:`, imageError);
          const failedResult: ExtendedOMRGradingResult = {
            fileName: image.name,
            success: false,
            error: `처리 중 오류 발생: ${imageError instanceof Error ? imageError.message : '알 수 없는 오류'}`,
            totalScore: 0,
            grade: 0,
            phoneNumber: '00000000',
            results: []
          };
          results.push(failedResult);
        }
      }

      // 결과 저장
      setGradingResults(results);
      
      // 부모 컴포넌트에 결과 전달
      if (onComplete) {
        onComplete(results);
      }

      return results;

    } catch (err) {
      // 전체 프로세스 중 예외 발생
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setProcessingError({
        message: errorMessage,
        type: 'PROCESSING_ERROR'
      });
      
      console.error('OMR 채점 중 오류 발생:', err);
      throw err;
    } finally {
      setIsProcessing(false);
      setProcessingProgress(null);
    }
  };

  // OMR 채점 결과를 데이터베이스에 저장 (개별 파일용)
  const saveResultsToDatabase = async (examId: number): Promise<{ success: boolean; savedCount: number; errors: string[] }> => {
    if (gradingResults.length === 0) {
      return { success: false, savedCount: 0, errors: ['저장할 채점 결과가 없습니다.'] };
    }

    setIsSavingToDatabase(true);
    setDatabaseSaveProgress({
      isSaving: true,
      savedCount: 0,
      totalCount: gradingResults.filter(r => r.success).length,
      currentFileName: ''
    });

    try {
      const input: OMRDatabaseSaveInput = {
        examId,
        gradingResults
      };

      const result = await saveOMRResultsToDatabase(input);

      setDatabaseSaveResult(result);
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      const result = { success: false, savedCount: 0, errors: [errorMessage] };
      setDatabaseSaveResult(result);
      return result;
    } finally {
      setIsSavingToDatabase(false);
      setDatabaseSaveProgress(null);
    }
  };

  const resetResults = () => {
    setGradingResults([]);
    setProcessingProgress(null);
    setProcessingError(null);
    setDatabaseSaveResult(null);
  };

  const retryProcessing = async (
    images: File[], 
    examInfo: Exam,
    onComplete?: (results: ExtendedOMRGradingResult[]) => void
  ) => {
    return await processImages(images, examInfo, onComplete);
  };

  return {
    isProcessing,
    processingProgress,
    gradingResults,
    processingError,
    processImages,
    resetResults,
    retryProcessing,

    // 데이터베이스 저장 관련
    isSavingToDatabase,
    databaseSaveProgress,
    databaseSaveResult,
    saveResultsToDatabase
  };
};
