// 파일 업로드 관련 유틸리티 함수들
export const FILE_UTILS = {
  
  // 파일 확장자 추출
  getFileExtension: (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  },
  
  // 파일명에서 확장자 제거
  removeFileExtension: (filename: string): string => {
    return filename.replace(/\.[^/.]+$/, '');
  },
  
  // 고유 파일명 생성
  generateUniqueFileName: (originalName: string, folder?: string): string => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1e6);
    const extension = FILE_UTILS.getFileExtension(originalName);
    const baseName = FILE_UTILS.removeFileExtension(originalName);
    
    const fileName = `${timestamp}-${random}-${baseName}.${extension}`;
    return folder ? `${folder}/${fileName}` : fileName;
  },

  // 파일 크기 포맷팅
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // 파일 타입에 따른 아이콘 반환
  getFileIcon: (fileType: string): string => {
    if (fileType.startsWith('image/')) {
      return '🖼️';
    } else if (fileType.includes('pdf')) {
      return '📄';
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return '📝';
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return '📊';
    } else if (fileType.includes('text')) {
      return '📄';
    } else {
      return '📎';
    }
  },

  // 파일이 이미지인지 확인
  isImageFile: (fileType: string): boolean => {
    return fileType.startsWith('image/');
  },

  // 파일이 문서인지 확인
  isDocumentFile: (fileType: string): boolean => {
    return fileType.includes('pdf') || 
           fileType.includes('word') || 
           fileType.includes('document') ||
           fileType.includes('excel') ||
           fileType.includes('spreadsheet') ||
           fileType.includes('text');
  },
} as const; 