// 공지사항 관련 validation 유틸리티
export const ANNOUNCEMENT_VALIDATION = {
  // 공지사항 데이터 유효성 검증
  validateAnnouncementData: (data: {
    title: string;
    content: string;
  }): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!data.title || data.title.trim().length < 2) {
      errors.push('제목은 2자 이상 입력해주세요.');
    }
    
    if (!data.content || data.content.trim().length < 10) {
      errors.push('내용은 10자 이상 입력해주세요.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}; 