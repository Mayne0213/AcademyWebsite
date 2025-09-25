"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  BarChart3,
  Calendar,
  Target,
  AlertCircle,
  UserPlus,
  Megaphone,
  ChevronRight,
  AlertTriangle,
  XCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// 통계 데이터 타입 정의
interface DashboardStats {
  totalStudents: number;
  totalExams: number;
  averageScore: number;
  averageGrade: number;
  topPerformers: Array<{
    studentId: number;
    studentName: string;
    averageScore: number;
    totalExams: number;
  }>;
  recentExams: Array<{
    examId: number;
    examName: string;
    examDate: string;
    totalParticipants: number;
    averageScore: number;
  }>;
  gradeDistribution: Array<{
    grade: string;
    count: number;
    percentage: number;
  }>;
  pieGradeDistribution: Array<{
    grade: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: {
    recentStudents: Array<{
      studentId: number;
      studentName: string;
      joinedAt: string;
    }>;
    recentAnnouncements: Array<{
      announcementId: number;
      title: string;
      createdAt: string;
    }>;
  };
  strugglingStudents: Array<{
    studentId: number;
    studentName: string;
    averageScore: number;
    totalExams: number;
  }>;
  managedStudents: Array<{
    studentId: number;
    studentName: string;
    averageScore: number;
    averageGrade: number;
    totalExams: number;
  }>;
}


export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gradeDistribution, setGradeDistribution] = useState<Array<{
    grade: string;
    count: number;
    percentage: number;
  }>>([]);
  const [pieGradeDistribution, setPieGradeDistribution] = useState<Array<{
    grade: string;
    count: number;
    percentage: number;
  }>>([]);

  // 통계 데이터 가져오기
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 학습 리포트 요약 API 호출
        const response = await fetch('/api/learning-report/summary');
        const result = await response.json();

        if (result.success) {
          setStats(result.data);
          setGradeDistribution(result.data.gradeDistribution || []);
          setPieGradeDistribution(result.data.pieGradeDistribution || []);
        } else {
          setError(result.message || '통계 데이터를 불러올 수 없습니다.');
        }
      } catch (err: any) {
        console.error('통계 데이터 로딩 오류:', err);
        setError('통계 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen p-4 smalltablet:p-6 tablet:p-8">
        <div className="">
          <div className="animate-pulse">
            {/* 헤더 스켈레톤 */}
            <div className="mb-8">
              <div className="h-8 smalltablet:h-10 tablet:h-12 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* 통계 카드 스켈레톤 */}
            <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-4 gap-4 smalltablet:gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-6 smalltablet:h-8 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* 차트 섹션 스켈레톤 */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* 최근 활동 피드 스켈레톤 */}
            <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 상위 성과자 & 관리 대상 학생 스켈레톤 */}
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="max-h-96 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-5 bg-gray-200 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-8"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="max-h-96 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-5 bg-gray-200 rounded w-12 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-8"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-h-screen p-4 smalltablet:p-6 tablet:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-sansKR-SemiBold text-gray-900 mb-2">오류가 발생했습니다</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 통계 카드 데이터
  const statCards = [
    {
      title: "전체 학생 수",
      value: stats?.totalStudents || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "총 시험 수",
      value: stats?.totalExams || 0,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "평균 점수",
      value: stats?.averageScore ? Math.round(stats.averageScore * 10) / 10 : 0,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      unit: "점"
    },
    {
      title: "평균 등급",
      value: stats?.averageGrade ? Math.round(stats.averageGrade * 10) / 10 : 0,
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      unit: "등급"
    }
  ];

  // 등급별 분포 차트 색상 (막대그래프용 - 9등급까지)
  const BAR_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#ec4899'];
  // 파이차트용 색상 (5개 카테고리)
  const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen p-4 smalltablet:p-6 tablet:p-8">
      <div className="">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl smalltablet:text-3xl tablet:text-4xl font-sansKR-Bold text-gray-900 mb-2">
            학원 대시보드
          </h1>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-4 gap-4 smalltablet:gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-sansKR-Medium text-gray-600 mb-1">{card.title}</p>
                  <p className="text-2xl smalltablet:text-3xl font-sansKR-Bold text-gray-900">
                    {card.value}{card.unit}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-8">
          {/* 등급별 학생 분포 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              등급별 학생 분포
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}개`]}
                    // labelFormatter={(label) => label}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`bar-cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 등급별 비율 파이 차트 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5" />
              등급별 비율
            </h3>
            <div className="relative h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieGradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {pieGradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* 등급별 통계 표시 */}
              <div className="absolute bottom-2 left-2 space-y-1">
                {pieGradeDistribution.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                    />
                    <span className="font-sansKR-SemiBold text-gray-700">
                      {entry.grade}: {entry.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* 최근 활동 피드 */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6 mb-6">
          {/* 최근 시험 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              최근 시험
            </h3>
            <div className="space-y-3">
              {stats?.recentExams.slice(0, 5).map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-sansKR-Medium text-gray-900 text-sm">{exam.examName}</h4>
                    <p className="text-xs text-gray-600">
                      {exam.totalParticipants}명 참여 • {new Date(exam.examDate).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-sansKR-Bold text-blue-600 text-sm">{exam.averageScore.toFixed(1)}점</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 새로운 학생 등록 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              신규 학생
            </h3>
            <div className="space-y-3">
              {stats?.recentActivity?.recentStudents && stats.recentActivity.recentStudents.length > 0 ? (
                stats.recentActivity.recentStudents.map((student, index) => (
                  <a
                    key={index}
                    href={`main/student/${student.studentId}`}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-sansKR-Medium text-gray-900 text-sm">{student.studentName}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(student.joinedAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </a>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <UserPlus className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">최근 등록된 학생이 없습니다</p>
                </div>
              )}
            </div>
          </div>

          {/* 최근 공지사항 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <Megaphone className="h-5 w-5" />
              공지사항
            </h3>
            <div className="space-y-3">
              {stats?.recentActivity?.recentAnnouncements && stats.recentActivity.recentAnnouncements.length > 0 ? (
                stats.recentActivity.recentAnnouncements.map((announcement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-sansKR-Medium text-gray-900 text-sm truncate">{announcement.title}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(announcement.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Megaphone className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">등록된 공지사항이 없습니다</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 상위 학생 & 관리 대상 학생 */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-6">
          {/* 상위 학생 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" />
              상위 학생
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {stats?.topPerformers.map((student, index) => (
                <a
                  key={student.studentId}
                  href={`main/student/${student.studentId}`}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-sansKR-Bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-sansKR-Medium text-gray-900">{student.studentName}</h4>
                      <p className="text-sm text-gray-600">{student.totalExams}회 응시</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-sansKR-Bold text-blue-600">{student.averageScore.toFixed(1)}점</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 상담 대상자 */}
          <div className="bg-white rounded-lg shadow-sm border p-4 smalltablet:p-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              상담 대상자
            </h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {stats?.managedStudents.map((student, index) => (
                <a
                  key={student.studentId}
                  href={`main/student/${student.studentId}`}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-sansKR-Bold text-red-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-sansKR-Medium text-gray-900">{student.studentName}</h4>
                      <p className="text-sm text-gray-600">{student.totalExams}회 응시</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-sansKR-Bold text-red-600">{student.averageScore.toFixed(1)}점</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>


        {/* 부진 학생 알림 */}
        {stats?.strugglingStudents && stats.strugglingStudents.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 smalltablet:p-6 mb-6">
            <h3 className="text-lg smalltablet:text-xl font-sansKR-SemiBold text-red-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              부진 학생 알림
            </h3>
            <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
              {stats.strugglingStudents.map((student, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-sansKR-Medium text-gray-900">{student.studentName}</h4>
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <p className="text-sm text-red-600 mb-1">
                    평균 점수: {student.averageScore.toFixed(1)}점
                  </p>
                  <p className="text-xs text-gray-600">
                    전체 평균 대비 {((student.averageScore / stats.averageScore) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
