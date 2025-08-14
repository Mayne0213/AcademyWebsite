// 포맷팅 함수들
export const FORMATS = {
  // 전화번호 포맷팅
  formatPhoneNumber: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  },
  
  // 날짜 포맷팅 (YYYY-MM-DD)
  formatDate: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  },
  
  // 시간 포맷팅
  formatDateTime: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
  
  // 파일 크기 포맷팅
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // 통화 포맷팅
  formatCurrency: (amount: number, currency: string = 'KRW'): string => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },
  
  // 숫자 포맷팅
  formatNumber: (num: number): string => {
    return new Intl.NumberFormat('ko-KR').format(num);
  },
  
  // 백분율 포맷팅
  formatPercentage: (value: number, decimals: number = 1): string => {
    return `${(value * 100).toFixed(decimals)}%`;
  },
  
  // 시간 간격 포맷팅
  formatTimeAgo: (date: Date | string): string => {
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return '방금 전';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}분 전`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}시간 전`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}일 전`;
    } else {
      return FORMATS.formatDate(target);
    }
  },
   
  // 상태 포맷팅
  formatStatus: (status: string): string => {
    const statusMap: Record<string, string> = {
      'ACTIVE': '활성',
      'INACTIVE': '비활성',
      'PENDING': '대기중',
      'APPROVED': '승인됨',
      'REJECTED': '거부됨',
      'COMPLETED': '완료',
      'CANCELLED': '취소됨',
    };
    return statusMap[status] || status;
  },

    // 사용자 이름을 가져오는 유틸리티 함수
  formatUserDisplayName: (user: any): string => {
    if (!user) return '';

    // API에서 제공하는 name 필드를 우선 사용
    if (user.name && user.name !== '' && user.name !== 'null') {
      return user.name;
    }

    // name 필드가 없거나 빈 경우 기존 로직 사용
    if (user.role === 'STUDENT' && user.student?.studentName) {
      return user.student.studentName;
    }

    if (user.role === 'ADMIN' && user.admin?.adminName) {
      return user.admin.adminName;
    }

    // 기본값으로 userId 사용
    return user.userId;
  },
} as const; 