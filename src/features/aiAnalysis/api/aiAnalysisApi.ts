import { apiGet, apiPost, apiPut } from "@/src/shared/api/http";
import type {
  ExamAIAnalysis,
  StudentAIFeedback,
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

// 일괄 API (SSE 스트리밍)
export const batchGenerateFeedbacks = (
  examId: number,
  overwrite: boolean,
  onEvent: (event: string, data: any) => void,
  signal?: AbortSignal
): Promise<void> => {
  return fetch(`/api/ai-analysis/exam/${examId}/batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overwrite }),
    signal,
  }).then(async (response) => {
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "일괄 생성 요청 실패");
    }
    const reader = response.body?.getReader();
    if (!reader) throw new Error("스트림을 읽을 수 없습니다.");
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      let currentEvent = "";
      for (const line of lines) {
        if (line.startsWith("event: ")) {
          currentEvent = line.slice(7);
        } else if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            onEvent(currentEvent, data);
          } catch {}
        }
      }
    }
  });
};

export const getAllFeedbacksForExam = (examId: number) =>
  apiGet<FeedbackListResponse>(`/api/ai-analysis/exam/${examId}/feedbacks`);
