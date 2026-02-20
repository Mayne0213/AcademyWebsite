import { apiGet, apiPost, apiPut } from "@/src/shared/api/http";
import type {
  ExamAIAnalysis,
  StudentAIFeedback,
  BatchGenerationResult,
  FeedbackListResponse,
} from "../model/types";

// 총평 API
export const getExamCommentary = (examId: number) =>
  apiGet<ExamAIAnalysis | null>(`/api/ai-analysis/exam/${examId}`);

export const generateExamCommentary = (examId: number) =>
  apiPost<ExamAIAnalysis>(`/api/ai-analysis/exam/${examId}`, {});

export const updateExamCommentary = (examId: number, content: string) =>
  apiPut<ExamAIAnalysis>(`/api/ai-analysis/exam/${examId}`, { content });

// 개인별 피드백 API
export const getStudentFeedback = (examResultId: number) =>
  apiGet<StudentAIFeedback | null>(`/api/ai-analysis/student/${examResultId}`);

export const generateStudentFeedback = (examResultId: number) =>
  apiPost<StudentAIFeedback>(`/api/ai-analysis/student/${examResultId}`, {});

export const updateStudentFeedback = (examResultId: number, content: string) =>
  apiPut<StudentAIFeedback>(`/api/ai-analysis/student/${examResultId}`, {
    content,
  });

// 일괄 API
export const batchGenerateFeedbacks = (
  examId: number,
  overwrite: boolean = false
) =>
  apiPost<BatchGenerationResult>(`/api/ai-analysis/exam/${examId}/batch`, {
    overwrite,
  });

export const getAllFeedbacksForExam = (examId: number) =>
  apiGet<FeedbackListResponse>(`/api/ai-analysis/exam/${examId}/feedbacks`);
