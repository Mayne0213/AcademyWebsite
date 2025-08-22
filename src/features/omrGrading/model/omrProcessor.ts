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

// OMR 채점 결과를 데이터베이스에 저장하는 함수 (배치 처리로 최적화)
export const saveOMRResultsToDatabase = async (input: OMRDatabaseSaveInput): Promise<OMRDatabaseSaveResult> => {
  const errors: string[] = [];
  let savedCount = 0;

  try {
    // 성공한 OMR 결과만 필터링
    const successfulResults = input.gradingResults.filter(result => result.success);

    if (successfulResults.length === 0) {
      return {
        success: false,
        savedCount: 0,
        errors: ['처리할 수 있는 OMR 결과가 없습니다']
      };
    }

    // 각 OMR 결과마다 개별적으로 처리 (각각 다른 학생일 수 있음)
    for (const result of successfulResults) {
      try {
        // 각 결과에서 전화번호 추출
        // const studentPhone = result.phoneNumber;
        const studentPhone = "01088705364";

        if (!studentPhone) {
          errors.push(`파일 ${result.fileName}: 전화번호를 찾을 수 없습니다`);
          continue;
        }

        // 전화번호로 학생 찾기
        const studentResult = await findStudentByPhone(studentPhone);
        if (!studentResult.success || !studentResult.data) {
          errors.push(`파일 ${result.fileName}: 학생을 찾을 수 없습니다 (전화번호: ${studentPhone})`);
          continue;
        }

        const student = studentResult.data;

        // 개별 결과를 데이터베이스에 저장
        const examResultData = {
          examId: input.examId,
          studentId: student.memberId,
          totalScore: result.totalScore,
          grade: result.grade,
          results: result.results
        };

        // ExamResult 생성
        const examResultResponse = await createExamResult(examResultData);
        if (!examResultResponse.success) {
          errors.push(`파일 ${result.fileName}: ExamResult 생성 실패 - ${examResultResponse.error}`);
          continue;
        }

        savedCount++;
        console.log(`파일 ${result.fileName} 처리 완료: 학생 ID ${student.memberId}, 점수 ${result.totalScore}`);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
        errors.push(`파일 ${result.fileName}: 처리 중 오류 발생 - ${errorMessage}`);
      }
    }

    console.log(`개별 처리 완료: ${savedCount}개 파일 저장됨`);

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
