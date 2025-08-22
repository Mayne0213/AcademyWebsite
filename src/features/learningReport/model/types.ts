import { Student } from '@/src/entities/student/model/types';

// 학생별 학습 리포트 메인 타입
export interface StudentLearningReport {
  student: Student;
  examHistory: StudentExamHistory[];
  totalExams: number;
  averageScore: number;
  averageGrade: number;
  highestScore: number;
  lowestScore: number;
  improvementTrend: 'improving' | 'declining' | 'stable';
  lastExamDate?: Date;
  firstExamDate?: Date;
}

// 학생별 시험 이력
export interface StudentExamHistory {
  examId: number;
  examName: string;
  examDate: Date;
  totalScore: number;
  grade: number;
  ranking?: number;
  totalStudents?: number;
  examResultId: number;
}

// 학습 리포트 요약 통계
export interface LearningReportSummary {
  totalStudents: number;
  totalExams: number;
  averageScore: number;
  averageGrade: number;
  topPerformers: StudentSummary[];
  recentExams: RecentExamSummary[];
}

// 학생 요약 정보
export interface StudentSummary {
  studentId: number;
  studentName: string;
  averageScore: number;
  totalExams: number;
  lastExamDate?: Date;
}

// 최근 시험 요약
export interface RecentExamSummary {
  examId: number;
  examName: string;
  examDate: Date;
  totalParticipants: number;
  averageScore: number;
}

// 학습 리포트 필터 옵션
export interface LearningReportFilters {
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  gradeRange?: {
    minGrade: number;
    maxGrade: number;
  };
  scoreRange?: {
    minScore: number;
    maxScore: number;
  };
}
