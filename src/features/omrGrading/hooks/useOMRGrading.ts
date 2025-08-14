import { useState } from 'react';
import { processOMR } from '../model/omrProcessor';
import { OMRGradingInput, ExtendedOMRGradingResult } from '../model/types';
import { Exam } from '@/src/entities/exam/model/types';

interface ProcessingProgress {
  current: number;
  total: number;
  currentFileName: string;
}

interface ProcessingError {
  message: string;
  fileName?: string;
  type: 'PROCESSING_ERROR' | 'NETWORK_ERROR' | 'VALIDATION_ERROR';
}

export const useOMRGrading = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState<ProcessingProgress | null>(null);
  const [gradingResults, setGradingResults] = useState<ExtendedOMRGradingResult[]>([]);
  const [processingError, setProcessingError] = useState<ProcessingError | null>(null);

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
      currentFileName: ''
    });

    try {
      const results: ExtendedOMRGradingResult[] = [];

      // 모든 이미지를 순차적으로 처리
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // 진행 상황 업데이트
        setProcessingProgress({
          current: i + 1,
          total: images.length,
          currentFileName: image.name
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
            results.push({
              fileName: image.name,
              success: false,
              error: result.error || '처리 실패',
              totalScore: 0,
              grade: 0,
              results: []
            });
          } else {
            // 성공한 결과에 파일명 추가
            const resultWithFileName: ExtendedOMRGradingResult = {
              ...result.data,
              fileName: image.name,
              success: true
            };
            results.push(resultWithFileName);
          }
        } catch (imageError) {
          // 개별 이미지 처리 중 예외 발생 - 계속 진행
          console.error(`이미지 ${image.name} 처리 중 오류:`, imageError);
          results.push({
            fileName: image.name,
            success: false,
            error: `처리 중 오류 발생: ${imageError instanceof Error ? imageError.message : '알 수 없는 오류'}`,
            totalScore: 0,
            grade: 0,
            results: []
          });
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

  const resetResults = () => {
    setGradingResults([]);
    setProcessingProgress(null);
    setProcessingError(null);
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
    retryProcessing
  };
};
