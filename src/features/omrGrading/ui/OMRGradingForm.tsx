'use client';

import React, { useState } from 'react';
import { processOMR } from '../model/omrProcessor';
import { OMRGradingInput, OMRGradingResult } from '../model/types';

interface OMRGradingFormProps {
  onGradingComplete?: (result: OMRGradingResult) => void;
}

export const OMRGradingForm: React.FC<OMRGradingFormProps> = ({
  onGradingComplete
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<OMRGradingInput>({
    imageFile: null as any,
    correctAnswers: {},
    questionScores: {},
    questionTypes: {}
  });
  const [questionCount, setQuestionCount] = useState(45);

  // 기본값 설정 함수
  const setDefaultValues = (count: number) => {
    const defaultData: OMRGradingInput = {
      imageFile: null as any,
      correctAnswers: {},
      questionScores: {},
      questionTypes: {}
    };

    for (let i = 1; i <= count; i++) {
      defaultData.correctAnswers[i] = "1"; // 모든 문제 정답을 1번으로
      defaultData.questionScores[i] = i > count - 10 ? 3 : 2; // 뒤에 10문제는 3점, 나머지는 2점
      defaultData.questionTypes[i] = "듣기"; // 모든 문제 유형을 듣기로
    }

    setFormData(defaultData);
  };

  // 컴포넌트 마운트 시 기본값 설정
  React.useEffect(() => {
    setDefaultValues(questionCount);
  }, []);

  // 문제 수 변경 시 기본값 재설정
  React.useEffect(() => {
    setDefaultValues(questionCount);
  }, [questionCount]);

  // 문제 수가 변경될 때 기존 데이터 초기화
  const handleQuestionCountChange = (newCount: number) => {
    if (newCount < 1 || newCount > 100) return;
    
    setQuestionCount(newCount);
    setError(null);
    setSuccess(null);
    // 기본값으로 재설정
    setDefaultValues(newCount);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
    }
  };

  const handleInputChange = (
    field: keyof OMRGradingInput,
    questionNumber: number,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [questionNumber]: value
      }
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // 필수 입력 검증
      if (!formData.imageFile) {
        throw new Error('이미지 파일을 업로드해주세요.');
      }

      // 문제별 설정 검증
      const questionNumbers = Array.from({ length: questionCount }, (_, i) => i + 1);
      for (const qNum of questionNumbers) {
        if (!formData.correctAnswers[qNum]) {
          throw new Error(`${qNum}번 문제의 정답을 설정해주세요.`);
        }
        if (!formData.questionScores[qNum] || formData.questionScores[qNum] <= 0) {
          throw new Error(`${qNum}번 문제의 배점을 설정해주세요.`);
        }
        if (!formData.questionTypes[qNum]) {
          throw new Error(`${qNum}번 문제의 유형을 설정해주세요.`);
        }
      }
      
      const result = await processOMR(formData);
      
      console.log('OMR 채점 결과:', result);
      
      if (!result.success || !result.data) {
        throw new Error(result.error || '채점 실패');
      }

      console.log('채점 성공 - 데이터:', result.data);
      console.log('결과 배열 길이:', result.data.results?.length);

      // 채점 완료 - 부모 컴포넌트에 결과 전달
      
      setSuccess('OMR 채점이 완료되었습니다!');
      
      // 부모 컴포넌트에 결과 전달
      if (onGradingComplete) {
        onGradingComplete(result.data);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuestionInputs = () => {
    const inputs = [];
    for (let i = 1; i <= questionCount; i++) {
      inputs.push(
        <div key={i} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
          <span className="w-8 text-sm font-medium text-gray-700">{i}번</span>
          
          <select
            value={formData.correctAnswers[i] || ''}
            onChange={(e) => handleInputChange('correctAnswers', i, e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">정답</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input
            type="number"
            placeholder="배점"
            value={formData.questionScores[i] || ''}
            onChange={(e) => handleInputChange('questionScores', i, parseInt(e.target.value) || 0)}
            className="border rounded px-2 py-1 text-sm w-16 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
            max="10"
            required
          />

          <select
            value={formData.questionTypes[i] || ''}
            onChange={(e) => handleInputChange('questionTypes', i, e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">유형</option>
            <option value="듣기">듣기</option>
            <option value="빈칸추론">빈칸추론</option>
            <option value="글의통일성">글의통일성</option>
            <option value="독해">독해</option>
            <option value="어법">어법</option>
            <option value="어휘">어휘</option>
            <option value="기타">기타</option>
          </select>
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">OMR 채점</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이미지 업로드 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            OMR 이미지 업로드
          </label>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
        </div>

        {/* 문제 수 설정 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            문제 수 설정
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={questionCount}
            onChange={(e) => handleQuestionCountChange(parseInt(e.target.value) || 1)}
            className="border rounded px-3 py-2 w-32"
            placeholder="45"
          />
        </div>

        {/* 문제별 설정 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">문제별 정답 및 배점 설정</h3>
            <button
              type="button"
              onClick={() => setDefaultValues(questionCount)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors duration-200"
            >
              기본값으로 재설정
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-4 border rounded bg-white">
              {generateQuestionInputs()}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              총 {questionCount}문제 설정 완료 (기본값: 정답 1번, 배점 2점/3점, 유형 듣기)
            </p>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>OMR 채점 처리 중...</span>
              </div>
            ) : (
              'OMR 채점 시작'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
