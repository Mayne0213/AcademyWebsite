import { OMRGradingInput, OMRGradingResult, OMRProcessingResult } from './types';
import { apiPostFormData } from '@/src/shared/api/http';

export const processOMR = async (input: OMRGradingInput): Promise<OMRProcessingResult> => {
  try {
    // 1. 입력값 검증
    if (!input.imageFile) {
      return { success: false, error: '이미지 파일이 필요합니다' };
    }

    // 2. OMR 채점 API 호출
    const formData = new FormData();
    formData.append('image', input.imageFile);
    formData.append('correctAnswers', JSON.stringify(input.correctAnswers));
    formData.append('questionScores', JSON.stringify(input.questionScores));
    formData.append('questionTypes', JSON.stringify(input.questionTypes));

    // API 응답을 직접 fetch로 처리하여 전체 응답 객체를 받음
    const response = await fetch('/api/omr', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = errorText;
      
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (parseError) {}
      
      return { success: false, error: errorMessage };
    }

    const result = await response.json();
    
    // API 응답 검증
    if (!result.success) {
      return { success: false, error: result.message || 'OMR 채점에 실패했습니다' };
    }
    
    if (!result.data) {
      return { success: false, error: '채점 결과 데이터가 없습니다' };
    }
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('OMR 처리 오류:', error);
    return { success: false, error: '알 수 없는 오류가 발생했습니다' };
  }
};

export const createTestResultData = (
  studentId: string,
  examId: string,
  gradingResult: OMRGradingResult
) => {
  return {
    examId,
    studentId: parseInt(studentId),
    testDate: new Date(),
    totalScore: gradingResult.totalScore,
    grade: gradingResult.grade,
    results: gradingResult.results
  };
};
