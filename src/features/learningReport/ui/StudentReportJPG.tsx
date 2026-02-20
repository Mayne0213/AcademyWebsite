import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import html2canvas from 'html2canvas';
import { ExamQuestionResult } from '@/src/entities/examResult/model/types';
import { calculateTopIncorrectQuestions } from '@/src/features/examCRUD/ui/ExamStatistics';

interface StudentReportJPGProps {
  selectedExamId: number | null;
  selectedExamName: string;
  selectedExamData: {
    examId: number;
    examName: string;
    totalScore: number;
    grade: number;
    examDate: Date;
    examResultId: number;
  };
  recentExamHistory: Array<{
    examId: number;
    examName: string;
    totalScore: number;
    grade: number;
    examDate: Date;
    examResultId: number;
  }>;
  examCorrectAnswers: Record<number, string> | null;
  examStatistics: any;
  questionResults: ExamQuestionResult[];
  questionTypeStatistics: Array<{
    type: string;
    correctRate: number;
    count: number;
  }>;
  questionTypes: Record<number, string> | null;
  studentName: string;
  examCommentary?: string;
  studentFeedback?: string;
}

// 확장된 문제 결과 타입
interface ExtendedExamQuestionResult extends ExamQuestionResult {
  globalCorrectRate: number;
  globalIncorrectRate: number;
}

// 문제별 결과 테이블 컴포넌트 (HTML 버전)
const QuestionTableHTML = React.memo(({ 
  questionResults, 
  examCorrectAnswers, 
  questionTypeMapping 
}: {
  questionResults: ExamQuestionResult[];
  examCorrectAnswers: Record<number, string>;
  questionTypeMapping: Record<number, string>;
}) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>문제별 결과</div>
    <div style={{ width: '100%', border: '1px solid #d1d5db', marginBottom: 8 }}>
      {/* 테이블 헤더 */}
      <div style={{ display: 'flex', borderBottom: '1px solid #d1d5db', minHeight: 20, alignItems: 'center' }}>
        <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4, backgroundColor: '#f3f4f6' }}>
          <div style={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>문항</div>
        </div>
        <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4, backgroundColor: '#f3f4f6' }}>
          <div style={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>문제 유형</div>
        </div>
        <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4, backgroundColor: '#f3f4f6' }}>
          <div style={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>선택한 답</div>
        </div>
        <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4, backgroundColor: '#f3f4f6' }}>
          <div style={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>정답</div>
        </div>
        <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4, backgroundColor: '#f3f4f6' }}>
          <div style={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>배점</div>
        </div>
        <div style={{ width: '16.67%', padding: 4, backgroundColor: '#f3f4f6' }}>
          <div style={{ fontSize: 6, fontWeight: 'bold', textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>득점</div>
        </div>
      </div>

      {/* 1-45번 문제 데이터 */}
      {questionResults.slice(0, 45).map((item, index) => (
        <div key={index} style={{ display: 'flex', borderBottom: '1px solid #d1d5db', minHeight: 20, alignItems: 'center' }}>
          <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4 }}>
            <div style={{ fontSize: 6, fontFamily: 'NotoSansKR-Semibold, sans-serif', fontWeight: '600', textAlign: 'center' }}>{item.questionNumber}</div>
          </div>
          <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4 }}>
            <div style={{ fontSize: 6, fontFamily: 'NotoSansKR-Semibold, sans-serif', fontWeight: '600', textAlign: 'center' }}>
              {questionTypeMapping[item.questionNumber] || '기타'}
            </div>
          </div>
          <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4 }}>
            <div style={{ fontSize: 6, fontFamily: 'NotoSansKR-Semibold, sans-serif', fontWeight: '600', textAlign: 'center' }}>{item.selectedChoice || '-'}</div>
          </div>
          <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4 }}>
            <div style={{ fontSize: 6, fontFamily: 'NotoSansKR-Semibold, sans-serif', fontWeight: '600', textAlign: 'center' }}>{examCorrectAnswers[item.questionNumber] || '-'}</div>
          </div>
          <div style={{ width: '16.67%', borderRight: '1px solid #d1d5db', padding: 4 }}>
            <div style={{ fontSize: 6, fontFamily: 'NotoSansKR-Semibold, sans-serif', fontWeight: '600', textAlign: 'center' }}>{item.score}점</div>
          </div>
          <div style={{ width: '16.67%', padding: 4 }}>
            <div style={{ fontSize: 6, fontFamily: 'NotoSansKR-Semibold, sans-serif', fontWeight: '600', textAlign: 'center' }}>{item.isCorrect ? item.score : 0}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
));

QuestionTableHTML.displayName = 'QuestionTableHTML';

// 성취도 분석 컴포넌트 (HTML 버전)
const AchievementAnalysisHTML = React.memo(({ 
  selectedExam, 
  examStatistics 
}: {
  selectedExam: any;
  examStatistics: any;
}) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>성취도 분석</div>
    {/* 첫 번째 줄 - 시험 점수와 등급 */}
    <div style={{ display: 'flex', marginBottom: 8 }}>
      <div style={{ width: '50%', backgroundColor: '#f9fafb', padding: 8, borderRadius: 4, marginRight: 4 }}>
        <div style={{ fontSize: 6, color: '#4b5563', marginBottom: 4, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>시험 점수</div>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{selectedExam.totalScore}점</div>
      </div>
      <div style={{ width: '50%', backgroundColor: '#f9fafb', padding: 8, borderRadius: 4 }}>
        <div style={{ fontSize: 6, color: '#4b5563', marginBottom: 4, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>등급</div>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{selectedExam.grade}등급</div>
      </div>
    </div>
    {/* 두 번째 줄 - 평균 점수와 평균 대비 */}
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%', backgroundColor: '#f9fafb', padding: 8, borderRadius: 4, marginRight: 4 }}>
        <div style={{ fontSize: 6, color: '#4b5563', marginBottom: 4, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>평균 점수</div>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{examStatistics.averageScore.toFixed(1)}점</div>
      </div>
      <div style={{ width: '50%', backgroundColor: '#f9fafb', padding: 8, borderRadius: 4 }}>
        <div style={{ fontSize: 6, color: '#4b5563', marginBottom: 4, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>평균 대비</div>
        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>
          {(() => {
            const difference = selectedExam.totalScore - examStatistics.averageScore;
            if (difference > 0) return `+${difference.toFixed(1)}점`;
            if (difference < 0) return `${difference.toFixed(1)}점`;
            return '동일';
          })()}
        </div>
      </div>
    </div>
  </div>
));

AchievementAnalysisHTML.displayName = 'AchievementAnalysisHTML';

// 문제 유형별 분석 컴포넌트 (HTML 버전)
const QuestionTypeAnalysisHTML = React.memo(({ 
  questionTypeStatistics,
  questionResults
}: {
  questionTypeStatistics: Array<{
    type: string;
    correctRate: number;
    count: number;
  }>;
  questionResults: ExamQuestionResult[];
}) => {
  // 각 문제 번호 범위별로 실제 통계 계산
  const calculateStatsForQuestions = (questionNumbers: number[]) => {
    const relevantQuestions = questionResults.filter(q => questionNumbers.includes(q.questionNumber));
    const totalQuestions = relevantQuestions.length;
    const correctQuestions = relevantQuestions.filter(q => q.isCorrect).length;
    const totalPoints = totalQuestions * 2;
    const earnedPoints = relevantQuestions.reduce((sum, q) => sum + (q.isCorrect ? q.score : 0), 0);
    const correctRate = totalQuestions > 0 ? (correctQuestions / totalQuestions) * 100 : 0;
    
    return {
      totalQuestions,
      correctQuestions,
      totalPoints,
      earnedPoints,
      correctRate
    };
  };

  // 각 영역별 문제 번호 정의 (배점 하드코딩)
  const questionRanges = [
    { title: '듣기 - [1~17]', numbers: Array.from({length: 17}, (_, i) => i + 1), totalPoints: 37 },
    { title: '내용파악 - [20~24,35,40~45]', numbers: [...Array.from({length: 5}, (_, i) => i + 20), 35, ...Array.from({length: 6}, (_, i) => i + 40)], totalPoints: 26 },
    { title: '빈칸 - [31~34]', numbers: Array.from({length: 4}, (_, i) => i + 31), totalPoints: 10 },
    { title: '순서삽입 - [36~39]', numbers: Array.from({length: 4}, (_, i) => i + 36), totalPoints: 10 }
  ];

  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>문제 유형별 배점</div>
      {/* 첫 번째 줄 - 1-2번 유형 */}
      <div style={{ display: 'flex', marginBottom: 8 }}>
        {questionRanges.slice(0, 2).map((range, index) => {
          const stats = calculateStatsForQuestions(range.numbers);

          return (
            <div key={index} style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, paddingBottom: 12, border: '1px solid #e5e7eb', borderRadius: 8, backgroundColor: '#f9fafb', marginRight: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937', marginBottom: 12, textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>
                {range.title}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 32, backgroundColor: '#10b981', borderTopLeftRadius: 4, borderTopRightRadius: 4, height: 80 }} />
                  <div style={{ fontSize: 6, color: '#374151', marginTop: 8, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>배점</div>
                  <div style={{ fontSize: 6, fontWeight: 'bold', color: '#111827', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{range.totalPoints}점</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: 32,
                      backgroundColor: '#3b82f6',
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      height: Math.max(range.totalPoints > 0 ? (stats.earnedPoints / range.totalPoints) * 80 : 2, 2)
                    }}
                  />
                  <div style={{ fontSize: 6, color: '#374151', marginTop: 8, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>득점</div>
                  <div style={{ fontSize: 6, fontWeight: 'bold', color: '#111827', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{stats.earnedPoints}점</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* 두 번째 줄 - 3-4번 유형 */}
      {questionRanges.length > 2 && (
        <div style={{ display: 'flex' }}>
          {questionRanges.slice(2, 4).map((range, index) => {
            const stats = calculateStatsForQuestions(range.numbers);

            return (
              <div key={index + 2} style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: 12, paddingRight: 12, paddingTop: 12, paddingBottom: 12, border: '1px solid #e5e7eb', borderRadius: 8, backgroundColor: '#f9fafb', marginRight: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 'bold', color: '#1f2937', marginBottom: 12, textAlign: 'center', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>
                  {range.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 32, backgroundColor: '#10b981', borderTopLeftRadius: 4, borderTopRightRadius: 4, height: 80 }} />
                    <div style={{ fontSize: 6, color: '#374151', marginTop: 8, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>배점</div>
                    <div style={{ fontSize: 6, fontWeight: 'bold', color: '#111827', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{range.totalPoints}점</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div
                      style={{
                        width: 32,
                        backgroundColor: '#3b82f6',
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        height: Math.max(range.totalPoints > 0 ? (stats.earnedPoints / range.totalPoints) * 80 : 2, 2)
                      }}
                    />
                    <div style={{ fontSize: 6, color: '#374151', marginTop: 8, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>득점</div>
                    <div style={{ fontSize: 6, fontWeight: 'bold', color: '#111827', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{stats.earnedPoints}점</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

QuestionTypeAnalysisHTML.displayName = 'QuestionTypeAnalysisHTML';

// 오답률 TOP10 컴포넌트 (HTML 버전)
const IncorrectQuestionsTop10HTML = React.memo(({ 
  incorrectQuestions, 
  examCorrectAnswers 
}: {
  incorrectQuestions: ExtendedExamQuestionResult[];
  examCorrectAnswers: Record<number, string>;
}) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>오답률 TOP10</div>
    {/* 첫 번째 줄 - 1-5번 */}
    <div style={{ display: 'flex', marginBottom: 4 }}>
      {incorrectQuestions.slice(0, 5).map((item, index) => (
        <div
          key={item.questionNumber}
          style={{ width: 64, height: 68, border: '1px solid #e5e7eb', borderRadius: 4, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginRight: 4 }}
        >
          <div style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: index === 0
              ? '#991b1b'
              : index === 1
              ? '#ea580c'
              : index === 2
              ? '#a16207'
              : index < 5
              ? '#374151'
              : '#4b5563',
            fontFamily: 'NotoSansKR-Bold, sans-serif'
          }}>
            {item.questionNumber}번
          </div>
          <div style={{ fontSize: 6, color: '#6b7280', marginTop: 2, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>
            정답: {examCorrectAnswers[item.questionNumber] || 'N/A'}
          </div>
          <div style={{ fontSize: 6, color: '#dc2626', marginTop: 2, fontWeight: '500', fontFamily: 'NotoSansKR-Medium, sans-serif' }}>
            선택: {item.selectedChoice || '-'}
          </div>
          <div style={{ fontSize: 5, color: '#9ca3af', marginTop: 1, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>
            정답률: {item.globalCorrectRate.toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
    {/* 두 번째 줄 - 6-10번 */}
    <div style={{ display: 'flex' }}>
      {incorrectQuestions.slice(5, 10).map((item, index) => (
        <div
          key={item.questionNumber}
          style={{ width: 64, height: 68, border: '1px solid #e5e7eb', borderRadius: 4, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginRight: 4 }}
        >
          <div style={{
            fontSize: 11,
            fontWeight: 'bold',
            color: index + 5 === 0
              ? '#991b1b'
              : index + 5 === 1
              ? '#ea580c'
              : index + 5 === 2
              ? '#a16207'
              : index + 5 < 5
              ? '#374151'
              : '#4b5563',
            fontFamily: 'NotoSansKR-Bold, sans-serif'
          }}>
            {item.questionNumber}번
          </div>
          <div style={{ fontSize: 6, color: '#6b7280', marginTop: 2, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>
            정답: {examCorrectAnswers[item.questionNumber] || 'N/A'}
          </div>
          <div style={{ fontSize: 6, color: '#dc2626', marginTop: 2, fontWeight: '500', fontFamily: 'NotoSansKR-Medium, sans-serif' }}>
            선택: {item.selectedChoice || '-'}
          </div>
          <div style={{ fontSize: 5, color: '#9ca3af', marginTop: 1, fontFamily: 'NotoSansKR-Regular, sans-serif' }}>
            정답률: {item.globalCorrectRate.toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  </div>
));

IncorrectQuestionsTop10HTML.displayName = 'IncorrectQuestionsTop10HTML';

// 학습 추이 컴포넌트 (HTML 버전) - 최근 4개 시험 표시
const LearningProgressHTML = React.memo(({ 
  examHistory 
}: {
  examHistory: any[];
}) => {
  // 최근 4개 시험을 최신순으로 정렬 (가장 최근 시험이 위에 오도록)
  const recentExams = examHistory.slice(0, 4);
  
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 16, marginBottom: 8, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>학습 추이</div>
      <div>
        {recentExams.length > 0 ? recentExams.map((exam, index) => {
          return (
            <div key={exam.examResultId || `${exam.examId}_${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ flex: 1, backgroundColor: 'white', padding: 8, borderRadius: 4, border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 10, fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>
                    {exam.examName.length > 15 ? `${exam.examName.substring(0, 15)}...` : exam.examName}
                  </div>
                  <div style={{ fontSize: 8, color: '#6b7280', fontFamily: 'NotoSansKR-Regular, sans-serif' }}>
                    {exam.totalScore}점 ({exam.grade}등급)
                  </div>
                </div>
                <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: 8, height: 6, marginTop: 4 }}>
                  <div 
                    style={{
                      backgroundColor: index === 0 ? '#3b82f6' : '#10b981', // 최근 시험은 파란색, 나머지는 초록색
                      height: 6,
                      borderRadius: 8,
                      width: `${Math.max((exam.totalScore / 100) * 100, 2)}%`, // 최소 2% 너비 보장
                      transition: 'width 0.3s ease'
                    }} 
                  />
                </div>
              </div>
            </div>
          );
        }) : (
          <div style={{ textAlign: 'center', color: '#6b7280', fontSize: 10, fontFamily: 'NotoSansKR-Regular, sans-serif', padding: 16 }}>
            아직 시험 기록이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
});

LearningProgressHTML.displayName = 'LearningProgressHTML';

// AI 피드백 페이지 컴포넌트 (Page 2)
const AIFeedbackPageHTML = React.memo(({
  examName,
  studentName,
  examCommentary,
  studentFeedback,
}: {
  examName: string;
  studentName: string;
  examCommentary?: string;
  studentFeedback?: string;
}) => {
  if (!examCommentary && !studentFeedback) return null;

  return (
    <div
      id="student-report-jpg-page2"
      style={{
        width: '794px',
        height: '1123px',
        backgroundColor: 'white',
        padding: 32,
        fontSize: 8,
        fontFamily: 'NotoSansKR-Regular, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <div style={{ fontSize: 24, marginBottom: 8, textAlign: 'center', fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>
        {examName}
      </div>
      <div style={{ fontSize: 14, marginBottom: 32, textAlign: 'center', fontWeight: 'bold', color: '#1f2937', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>
        {studentName} 학생 - AI 분석 리포트
      </div>

      {/* 모의고사 총평 */}
      {examCommentary && (
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 12,
            paddingBottom: 8,
            borderBottom: '2px solid #7c3aed',
            fontFamily: 'NotoSansKR-Bold, sans-serif',
          }}>
            모의고사 총평
          </div>
          <div style={{
            fontSize: 11,
            lineHeight: '1.8',
            color: '#374151',
            fontFamily: 'NotoSansKR-Regular, sans-serif',
            whiteSpace: 'pre-wrap',
            padding: 16,
            backgroundColor: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
          }}>
            {examCommentary}
          </div>
        </div>
      )}

      {/* 개인별 피드백 */}
      {studentFeedback && (
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: 12,
            paddingBottom: 8,
            borderBottom: '2px solid #3b82f6',
            fontFamily: 'NotoSansKR-Bold, sans-serif',
          }}>
            개인별 피드백
          </div>
          <div style={{
            fontSize: 11,
            lineHeight: '1.8',
            color: '#374151',
            fontFamily: 'NotoSansKR-Regular, sans-serif',
            whiteSpace: 'pre-wrap',
            padding: 16,
            backgroundColor: '#f0f9ff',
            borderRadius: 8,
            border: '1px solid #bfdbfe',
          }}>
            {studentFeedback}
          </div>
        </div>
      )}
    </div>
  );
});

AIFeedbackPageHTML.displayName = 'AIFeedbackPageHTML';

// JPG 캡처용 HTML 리포트 컴포넌트
const StudentReportHTML = React.memo(({
  selectedExamId,
  selectedExamName,
  selectedExamData,
  recentExamHistory,
  examCorrectAnswers,
  examStatistics,
  questionResults,
  questionTypeStatistics,
  questionTypes,
  studentName,
  examCommentary,
  studentFeedback
}: StudentReportJPGProps) => {
  // 데이터 전처리 - 렌더링 전에 모든 계산 완료
  const processedData = useMemo(() => {
    // 전체 오답률 기준 TOP10 계산 (ExamStatistics와 동일한 로직)
    const topIncorrectQuestionsFromStats = calculateTopIncorrectQuestions(
      examStatistics,
      examCorrectAnswers || {}
    );

    // 개별 학생의 오답 문제 중에서 전체 오답률 TOP10에 해당하는 것들만 필터링
    const incorrectQuestions: ExtendedExamQuestionResult[] = topIncorrectQuestionsFromStats
      .map(statQuestion => {
        const studentQuestion = questionResults.find(q => q.questionNumber === statQuestion.questionNumber);
        if (!studentQuestion) return null;
        
        return {
          ...studentQuestion,
          // 전체 통계 정보도 포함
          globalCorrectRate: statQuestion.correctRate,
          globalIncorrectRate: statQuestion.incorrectRate
        } as ExtendedExamQuestionResult;
      })
      .filter((item): item is ExtendedExamQuestionResult => item !== null)
      .slice(0, 10);

    // 문제 번호별 문제 유형 매핑 생성
    // questionTypes가 있으면 사용하고, 없으면 하드코딩된 분포 사용
    const questionTypeMapping: Record<number, string> = {};
    
    if (questionTypes && Object.keys(questionTypes).length > 0) {
      // API에서 가져온 문제 유형 정보 사용
      Object.entries(questionTypes).forEach(([questionNumber, type]) => {
        questionTypeMapping[parseInt(questionNumber)] = type;
      });
    } else {
      // 하드코딩된 문제 유형 분포 (1-45번 문제)
      const questionTypeDistribution = [
        { type: '듣기', start: 1, end: 17 },
        { type: '문법', start: 18, end: 19 },
        { type: '내용파악', start: 20, end: 24 },
        { type: '어휘', start: 25, end: 30 },
        { type: '빈칸', start: 31, end: 34 },
        { type: '내용파악', start: 35, end: 35 },
        { type: '순서삽입', start: 36, end: 39 },
        { type: '내용파악', start: 40, end: 45 }
      ];
      
      questionTypeDistribution.forEach(({ type, start, end }) => {
        for (let i = start; i <= end; i++) {
          questionTypeMapping[i] = type;
        }
      });
    }

    return {
      incorrectQuestions,
      questionTypeMapping
    };
  }, [questionResults, examStatistics, examCorrectAnswers, questionTypes]);

  if (!selectedExamId || !selectedExamData || !examCorrectAnswers || !examStatistics) {
    return null;
  }

  return (
    <>
    <div
      id="student-report-jpg"
      style={{
        width: '794px',  // A4 너비 (210mm * 3.78)
        height: '1123px', // A4 높이 (297mm * 3.78)
        backgroundColor: 'white',
        padding: 16,
        fontSize: 8,
        fontFamily: 'NotoSansKR-Regular, sans-serif',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* 헤더 - 맨 위 가운데 */}
      <div style={{ fontSize: 32, marginBottom: 8, textAlign: 'center', fontWeight: 'bold', color: '#1f2937', width: '100%', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{selectedExamData.examName}</div>
      <div style={{ fontSize: 16, marginBottom: 32, textAlign: 'center', fontWeight: 'bold', color: '#1f2937', width: '100%', fontFamily: 'NotoSansKR-Bold, sans-serif' }}>{studentName} 학생</div>

      {/* 내용 섹션 - 2컬럼 배치, 가운데 정렬 */}
      <div style={{ display: 'flex', marginBottom: 12, justifyContent: 'center' }}>
        {/* 왼쪽 컬럼 - 1-45번 문제 */}
        <div style={{ width: '40%', paddingRight: 8 }}>
          <QuestionTableHTML 
            questionResults={questionResults}
            examCorrectAnswers={examCorrectAnswers}
            questionTypeMapping={processedData.questionTypeMapping}
          />
        </div>

        {/* 오른쪽 컬럼 - 분석 내용, 왼쪽과 같은 높이로 조정 */}
        <div style={{ width: '40%', paddingLeft: 8 }}>
          <AchievementAnalysisHTML 
            selectedExam={selectedExamData}
            examStatistics={examStatistics}
          />

          <QuestionTypeAnalysisHTML 
            questionTypeStatistics={questionTypeStatistics}
            questionResults={questionResults}
          />

          <IncorrectQuestionsTop10HTML 
            incorrectQuestions={processedData.incorrectQuestions}
            examCorrectAnswers={examCorrectAnswers}
          />

          <LearningProgressHTML
            examHistory={recentExamHistory}
          />
        </div>
      </div>
    </div>

    {/* Page 2: AI 분석 (총평/피드백이 있을 때만) */}
    {(examCommentary || studentFeedback) && (
      <AIFeedbackPageHTML
        examName={selectedExamData.examName}
        studentName={studentName}
        examCommentary={examCommentary}
        studentFeedback={studentFeedback}
      />
    )}
    </>
  );
});

StudentReportHTML.displayName = 'StudentReportHTML';

// 공통 JPG 캡처 헬퍼 함수
const captureReportPages = async (
  reportContainer: HTMLElement,
  studentName: string
) => {
  const dateStr = new Date().toISOString().split('T')[0];

  // Page 1 캡처
  const page1Element = reportContainer.querySelector('#student-report-jpg');
  if (page1Element) {
    const canvas1 = await html2canvas(page1Element as HTMLElement, {
      scale: 4,
      width: 794,
      height: 1123,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true,
    });

    canvas1.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `학습리포트_${studentName || 'Unknown'}_${dateStr}.jpg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg', 1.0);
  }

  // Page 2 캡처 (AI 분석 페이지가 있을 때만)
  const page2Element = reportContainer.querySelector('#student-report-jpg-page2');
  if (page2Element) {
    // Page 1 다운로드 완료 대기
    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas2 = await html2canvas(page2Element as HTMLElement, {
      scale: 4,
      width: 794,
      height: 1123,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      removeContainer: true,
    });

    canvas2.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `학습리포트_${studentName || 'Unknown'}_${dateStr}_AI분석.jpg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg', 1.0);
  }
};

// JPG 다운로드 버튼 컴포넌트
const StudentReportJPG: React.FC<StudentReportJPGProps> = ({
  selectedExamId,
  selectedExamName,
  selectedExamData,
  recentExamHistory,
  examCorrectAnswers,
  examStatistics,
  questionResults,
  questionTypeStatistics,
  questionTypes,
  studentName,
  examCommentary,
  studentFeedback
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateJPG = async () => {
    if (!selectedExamId || !selectedExamData || !examCorrectAnswers || !examStatistics) {
      return;
    }

    setIsGenerating(true);

    try {
      const style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

      const reportContainer = document.createElement('div');
      reportContainer.style.cssText = `
        position: fixed;
        left: -9999px;
        top: -9999px;
        z-index: -9999;
      `;
      document.body.appendChild(reportContainer);

      const root = ReactDOM.createRoot(reportContainer);
      root.render(
        <StudentReportHTML
          selectedExamId={selectedExamId}
          selectedExamName={selectedExamName}
          selectedExamData={selectedExamData}
          recentExamHistory={recentExamHistory}
          examCorrectAnswers={examCorrectAnswers}
          examStatistics={examStatistics}
          questionResults={questionResults}
          questionTypeStatistics={questionTypeStatistics}
          questionTypes={questionTypes}
          studentName={studentName}
          examCommentary={examCommentary}
          studentFeedback={studentFeedback}
        />
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      await captureReportPages(reportContainer, studentName);

      root.unmount();
      document.body.removeChild(reportContainer);
    } catch (error) {
      console.error('JPG 생성 오류:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!selectedExamId || !selectedExamData || !examCorrectAnswers || !examStatistics) {
    return (
      <button
        className="flex items-center space-x-2 px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
        disabled
      >
        <span>📄</span>
        <span>JPG 생성 준비 중...</span>
      </button>
    );
  }

  return (
    <button
      onClick={generateJPG}
      disabled={isGenerating}
      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      <span>{isGenerating ? '⏳' : '📷'}</span>
      <span>{isGenerating ? 'JPG 생성 중...' : 'JPG 다운로드'}</span>
    </button>
  );
};

// JPG 생성 함수를 별도로 export
export const generateStudentReportJPG = async (
  selectedExamData: {
    examId: number;
    examName: string;
    totalScore: number;
    grade: number;
    examDate: Date;
    examResultId: number;
  },
  recentExamHistory: Array<{
    examId: number;
    examName: string;
    totalScore: number;
    grade: number;
    examDate: Date;
    examResultId: number;
  }>,
  examCorrectAnswers: Record<number, string>,
  examStatistics: any,
  questionResults: ExamQuestionResult[],
  questionTypeStatistics: Array<{
    type: string;
    correctRate: number;
    count: number;
  }>,
  questionTypes: Record<number, string> | null,
  studentName: string,
  examCommentary?: string,
  studentFeedback?: string
): Promise<void> => {
  try {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

    const reportContainer = document.createElement('div');
    reportContainer.style.cssText = `
      position: fixed;
      left: -9999px;
      top: -9999px;
      z-index: -9999;
    `;
    document.body.appendChild(reportContainer);

    const root = ReactDOM.createRoot(reportContainer);
    root.render(
      <StudentReportHTML
        selectedExamId={selectedExamData.examId}
        selectedExamName={selectedExamData.examName}
        selectedExamData={selectedExamData}
        recentExamHistory={recentExamHistory}
        examCorrectAnswers={examCorrectAnswers}
        examStatistics={examStatistics}
        questionResults={questionResults}
        questionTypeStatistics={questionTypeStatistics}
        questionTypes={questionTypes}
        studentName={studentName}
        examCommentary={examCommentary}
        studentFeedback={studentFeedback}
      />
    );

    await new Promise(resolve => setTimeout(resolve, 100));

    await captureReportPages(reportContainer, studentName);

    root.unmount();
    document.body.removeChild(reportContainer);
  } catch (error) {
    console.error('JPG 생성 오류:', error);
    throw error;
  }
};

export default StudentReportJPG;
