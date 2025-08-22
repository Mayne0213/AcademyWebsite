'use client';

import React, { useState } from 'react';
import { saveOMRResultsToDatabase } from '../model/omrProcessor';
import { OMRDatabaseSaveInput } from '../model/types';

interface OmrResultUploaderProps {
  examId: number;
  onUploadComplete?: () => void;
}

export const OmrResultUploader: React.FC<OmrResultUploaderProps> = ({
  examId,
  onUploadComplete
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/json') {
      setSelectedFile(file);
      setUploadStatus('idle');
      setUploadMessage('');
    } else if (file) {
      setUploadMessage('JSON 파일만 업로드 가능합니다.');
      setUploadStatus('error');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('파일을 선택해주세요.');
      setUploadStatus('error');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setUploadMessage('');

    try {
      // JSON 파일 읽기
      const text = await selectedFile.text();
      const jsonData = JSON.parse(text);

      // 데이터 검증
      if (!Array.isArray(jsonData)) {
        throw new Error('JSON 파일이 배열 형태가 아닙니다.');
      }

      if (jsonData.length === 0) {
        throw new Error('채점 결과가 없습니다.');
      }

      // 첫 번째 결과에서 examId 확인 (선택사항)
      const firstResult = jsonData[0];
      if (!firstResult || typeof firstResult !== 'object') {
        throw new Error('잘못된 JSON 형식입니다.');
      }

      // DB 저장을 위한 데이터 준비
      const uploadData: OMRDatabaseSaveInput = {
        examId,
        gradingResults: jsonData
      };

      // DB에 저장
      const result = await saveOMRResultsToDatabase(uploadData);

      if (result.success) {
        setUploadStatus('success');
        setUploadMessage(`성공적으로 ${result.savedCount}개의 결과를 저장했습니다.`);
        
        // 성공 시 파일 선택 초기화
        setSelectedFile(null);
        
        // 부모 컴포넌트에 완료 알림
        if (onUploadComplete) {
          onUploadComplete();
        }
      } else {
        setUploadStatus('error');
        setUploadMessage(`저장 실패: ${result.errors.join(', ')}`);
      }

    } catch (error) {
      setUploadStatus('error');
      if (error instanceof Error) {
        setUploadMessage(`파일 처리 오류: ${error.message}`);
      } else {
        setUploadMessage('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setUploadMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full">
      <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
        <h2 className="font-semibold text-base smalltablet:text-lg tablet:text-xl">📤 OMR 결과 업로드</h2>
        <p className="text-sm text-gray-600 mt-1">로컬에서 생성된 채점 결과 JSON을 업로드하여 DB에 저장합니다.</p>
      </div>

      <div className="p-4 smalltablet:p-6 space-y-4">
        {/* 파일 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            채점 결과 JSON 파일 선택
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="w-full border p-2 smalltablet:p-3 text-sm smalltablet:text-base file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={isUploading}
          />
        </div>

        {/* 선택된 파일 정보 */}
        {selectedFile && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 text-lg">📄</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">{selectedFile.name}</p>
                <p className="text-xs text-blue-600">
                  크기: {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 업로드 상태 메시지 */}
        {uploadMessage && (
          <div className={`p-3 rounded-md border ${
            uploadStatus === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="text-lg">
                {uploadStatus === 'success' ? '✅' : '❌'}
              </span>
              <span className="text-sm">{uploadMessage}</span>
            </div>
          </div>
        )}

        {/* 주의사항 */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 text-lg">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">주의사항:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>로컬 OMR 채점 스크립트로 생성된 JSON 파일만 업로드 가능</li>
                <li>파일 형식: omr_grading_results.json</li>
                <li>업로드 후 자동으로 데이터베이스에 저장됩니다</li>
                <li>기존 데이터와 중복되지 않도록 주의하세요</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`px-4 py-2 smalltablet:px-6 smalltablet:py-3 rounded-md transition-all duration-200 text-sm smalltablet:text-base font-medium ${
              !selectedFile || isUploading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                업로드 중...
              </>
            ) : (
              '결과 업로드'
            )}
          </button>

          <button
            onClick={handleReset}
            disabled={isUploading}
            className="px-4 py-2 smalltablet:px-6 smalltablet:py-3 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm smalltablet:text-base font-medium disabled:opacity-50"
          >
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};
