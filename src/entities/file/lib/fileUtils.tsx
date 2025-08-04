import React from "react";
import { FileImage, FileVideo, FileAudio, FileArchive, FileCode, FileText, Paperclip } from "lucide-react";

// 파일 타입에 따라 미리보기 가능한지 확인하는 함수
export const isPreviewable = (fileType: string) => {
  const previewableTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'text/plain', 'text/html', 'text/css', 'text/javascript',
    'video/mp4', 'video/webm', 'video/ogg',
    'audio/mpeg', 'audio/wav', 'audio/ogg'
  ];
  return previewableTypes.includes(fileType.toLowerCase());
};

// 파일 타입에 따라 아이콘을 반환하는 함수
export const getFileIcon = (fileType: string): React.ReactElement => {
  const type = fileType.toLowerCase();
  
  // 이미지 파일
  if (type.startsWith('image/')) {
    return <FileImage className="w-4 h-4 text-blue-500" />;
  }
  
  // 비디오 파일
  if (type.startsWith('video/')) {
    return <FileVideo className="w-4 h-4 text-purple-500" />;
  }
  
  // 오디오 파일
  if (type.startsWith('audio/')) {
    return <FileAudio className="w-4 h-4 text-green-500" />;
  }
  
  // 압축 파일
  if (type.includes('zip') || type.includes('rar') || type.includes('7z') || type.includes('tar') || type.includes('gz')) {
    return <FileArchive className="w-4 h-4 text-orange-500" />;
  }
  
  // 코드 파일
  if (type.includes('javascript') || type.includes('typescript') || type.includes('python') || 
      type.includes('java') || type.includes('cpp') || type.includes('c#') || type.includes('php') ||
      type.includes('html') || type.includes('css') || type.includes('json') || type.includes('xml')) {
    return <FileCode className="w-4 h-4 text-yellow-500" />;
  }
  
  // 문서 파일
  if (type.includes('pdf') || type.includes('word') || type.includes('excel') || type.includes('powerpoint') ||
      type.includes('text') || type.includes('document')) {
    return <FileText className="w-4 h-4 text-red-500" />;
  }
  
  // 기본 아이콘
  return <Paperclip className="w-4 h-4 text-gray-500" />;
};

// 파일 다운로드 URL을 가져오는 함수
export const getDownloadUrl = async (fileKey: string): Promise<string> => {
  try {
    const response = await fetch('/api/files/download-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileKey }),
    });

    if (!response.ok) {
      throw new Error('다운로드 URL 생성에 실패했습니다.');
    }

    const data = await response.json();
    return data.downloadUrl;
  } catch (error) {
    console.error('다운로드 URL 생성 오류:', error);
    throw error;
  }
}; 