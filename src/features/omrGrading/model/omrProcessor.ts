import { OMRGradingInput, OMRGradingResult, OMRProcessingResult, OMRDatabaseSaveInput, OMRDatabaseSaveResult } from './types';
import { studentApi } from '@/src/entities/student/api';

export const processOMR = async (input: OMRGradingInput): Promise<OMRProcessingResult> => {
  try {
    // 1. 입력값 검증
    if (!input.imageFile) {
      return { success: false, error: '이미지 파일이 필요합니다' };
    }

    // 2. OMR 채점 API 호출
    // FormData에 객체를 전달할 때는 JSON.stringify()를 사용해야 함
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

// 전화번호로 학생을 찾는 함수 - entities/student/api 사용
export const findStudentByPhone = async (phoneNumber: string): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const student = await studentApi.findStudentByPhone(phoneNumber);
    return { success: true, data: student };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '학생을 찾을 수 없습니다';
    return { success: false, error: errorMessage };
  }
};

// ExamResult 생성 함수
const createExamResult = async (data: any): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response = await fetch('/api/examResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!result.success) {
      return { success: false, error: result.message || 'ExamResult 생성에 실패했습니다' };
    }
    return { success: true, data: result.data };
  } catch (error) {
    console.error('ExamResult 생성 오류:', error);
    return { success: false, error: 'ExamResult 생성 중 오류가 발생했습니다' };
  }
};

// ExamQuestionResult 생성 함수
const createExamQuestionResult = async (data: any): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const response = await fetch('/api/examResult/question-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!result.success) {
      return { success: false, error: result.message || 'ExamQuestionResult 생성에 실패했습니다' };
    }
    return { success: true, data: result.data };
  } catch (error) {
    console.error('ExamQuestionResult 생성 오류:', error);
    return { success: false, error: 'ExamQuestionResult 생성 중 오류가 발생했습니다' };
  }
};

// OMR 채점 결과를 데이터베이스에 저장하는 함수 (배치 처리로 최적화)
export const saveOMRResultsToDatabase = async (input: OMRDatabaseSaveInput): Promise<OMRDatabaseSaveResult> => {
  const errors: string[] = [];
  let savedCount = 0;

  try {
    // 전화번호로 학생 찾기 (임시로 하드코딩된 전화번호 사용)
    const studentPhone = '01012341234';
    const studentResult = await findStudentByPhone(studentPhone);
    if (!studentResult.success || !studentResult.data) {
      return {
        success: false,
        savedCount: 0,
        errors: [`학생을 찾을 수 없습니다: ${studentPhone}`]
      };
    }

    const student = studentResult.data;

    // 성공한 OMR 결과만 필터링
    const successfulResults = input.gradingResults.filter(result => result.success);

    if (successfulResults.length === 0) {
      return {
        success: false,
        savedCount: 0,
        errors: ['처리할 수 있는 OMR 결과가 없습니다']
      };
    }

    // 배치 API를 사용하여 모든 결과를 한 번에 저장
    const batchData = {
      examId: input.examId,
      studentId: student.memberId,
      omrResults: successfulResults.map(result => ({
        totalScore: result.totalScore,
        grade: result.grade,
        results: result.results
      }))
    };

    console.log(`배치 저장 시작: ${successfulResults.length}개 파일, 학생 ID: ${student.memberId}`);

    const batchResponse = await fetch('/api/examResult/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batchData),
    });

    if (!batchResponse.ok) {
      const errorText = await batchResponse.text();
      let errorMessage = errorText;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
      } catch (parseError) {}

      return {
        success: false,
        savedCount: 0,
        errors: [`배치 저장 실패: ${errorMessage}`]
      };
    }

    const batchResult = await batchResponse.json();

    if (!batchResult.success) {
      return {
        success: false,
        savedCount: 0,
        errors: [batchResult.message || '배치 저장에 실패했습니다']
      };
    }

    savedCount = batchResult.data.savedCount;
    console.log(`배치 저장 완료: ${savedCount}개 파일 저장됨`);

    // 실패한 결과들에 대한 에러 메시지 추가
    const failedResults = input.gradingResults.filter(result => !result.success);
    failedResults.forEach(result => {
      errors.push(`파일 ${result.fileName}: 처리 실패 - ${result.error}`);
    });

    return {
      success: savedCount > 0,
      savedCount,
      errors
    };

  } catch (error) {
    console.error('OMR 결과 저장 중 오류:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    return {
      success: false,
      savedCount: 0,
      errors: [errorMessage]
    };
  }
};
