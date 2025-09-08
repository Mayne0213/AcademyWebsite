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

// ExamResult 생성 함수 (배치 API 사용)
const createExamResult = async (data: any): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // 배치 API를 사용하여 ExamResult와 ExamQuestionResult를 함께 생성
    const batchData = {
      examId: data.examId,
      studentId: data.studentId,
      omrResults: [{
        totalScore: data.totalScore,
        grade: data.grade,
        results: data.results
      }]
    };

    const response = await fetch('/api/examResult/batch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batchData),
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
  let hasOriginalPhoneFailed = false;

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
        let studentPhone = "010" + result.phoneNumber;
        // const studentPhone = "01088705364";

        // 전화번호로 학생 찾기
        let studentResult = await findStudentByPhone(studentPhone);
        let isOriginalPhoneFailed = false;

        if (!studentResult.success || !studentResult.data) {
          // 원래 전화번호로 찾지 못한 경우 에러 추가
          isOriginalPhoneFailed = true;

          // 01088705364로 재시도
          studentResult = await findStudentByPhone("01088705364");

          if (!studentResult.success || !studentResult.data) {
            errors.push(`파일 ${result.fileName}: 01088705364로도 학생을 찾을 수 없습니다`);
            continue;
          }
        }

        // 원래 전화번호로 찾지 못한 경우, 01088705364로 성공해도 실패로 처리
        if (isOriginalPhoneFailed) {
          errors.push(`원래 전화번호(${studentPhone})로 찾지 못해 미가입으로 대체 처리됨`);
          hasOriginalPhoneFailed = true;
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

        // 원래 전화번호로 찾지 못한 경우가 아니면 성공 카운트 증가
        if (!isOriginalPhoneFailed) {
          savedCount++;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
        errors.push(`파일 ${result.fileName}: 처리 중 오류 발생 - ${errorMessage}`);
      }
    }
    // 실패한 결과들에 대한 에러 메시지 추가
    const failedResults = input.gradingResults.filter(result => !result.success);
    failedResults.forEach(result => {
      errors.push(`파일 ${result.fileName}: 처리 실패 - ${result.error}`);
    });

    return {
      success: savedCount > 0 && !hasOriginalPhoneFailed,
      savedCount,
      errors
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    return {
      success: false,
      savedCount: 0,
      errors: [errorMessage]
    };
  }
};
