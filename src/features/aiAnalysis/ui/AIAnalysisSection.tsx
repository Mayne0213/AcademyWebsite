"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Sparkles, Save, RefreshCw, Users, AlertCircle, X, CheckCircle2 } from "lucide-react";
import {
  getExamCommentary,
  generateExamCommentary,
  updateExamCommentary,
  generateStudentFeedback,
  updateStudentFeedback,
  getAllFeedbacksForExam,
} from "../api/aiAnalysisApi";
import type {
  ExamAIAnalysis,
  FeedbackListResponse,
  ExamResultSummary,
} from "../model/types";
import { ChevronDown } from "lucide-react";

type StudentProgressStatus = "pending" | "generating" | "done" | "error";
interface StudentProgress {
  examResultId: number;
  studentName: string;
  status: StudentProgressStatus;
  error?: string;
}

interface AIAnalysisSectionProps {
  examId: number;
}

export default function AIAnalysisSection({ examId }: AIAnalysisSectionProps) {
  // 총평 상태
  const [commentary, setCommentary] = useState<ExamAIAnalysis | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [isCommentaryLoading, setIsCommentaryLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 피드백 상태
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackListResponse | null>(null);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [generatingStudents, setGeneratingStudents] = useState<Set<number>>(new Set());
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);
  const [editingFeedback, setEditingFeedback] = useState<{ examResultId: number; content: string } | null>(null);
  const [isSavingFeedback, setIsSavingFeedback] = useState(false);

  // 일괄 생성 모달
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchProgress, setBatchProgress] = useState<StudentProgress[]>([]);
  const [batchDone, setBatchDone] = useState(false);
  const cancelRef = useRef(false);

  // 총평 조회
  const loadCommentary = useCallback(async () => {
    setIsCommentaryLoading(true);
    try {
      const data = await getExamCommentary(examId);
      setCommentary(data);
      if (data) {
        setEditedContent(data.content);
      }
    } catch {
      // apiGet already shows toast
    } finally {
      setIsCommentaryLoading(false);
    }
  }, [examId]);

  // 피드백 현황 조회
  const loadFeedbackStatus = useCallback(async () => {
    setIsFeedbackLoading(true);
    try {
      const data = await getAllFeedbacksForExam(examId);
      setFeedbackStatus(data);
    } catch {
      // apiGet already shows toast
    } finally {
      setIsFeedbackLoading(false);
    }
  }, [examId]);

  useEffect(() => {
    loadCommentary();
    loadFeedbackStatus();
  }, [loadCommentary, loadFeedbackStatus]);

  // 총평 생성
  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = await generateExamCommentary(examId);
      setCommentary(data);
      setEditedContent(data.content);
      setHasUnsavedChanges(false);
    } catch {
      // error already toasted
    } finally {
      setIsGenerating(false);
    }
  };

  // 총평 저장
  const handleSave = async () => {
    if (!editedContent.trim()) return;
    setIsSaving(true);
    try {
      const data = await updateExamCommentary(examId, editedContent);
      setCommentary(data);
      setHasUnsavedChanges(false);
    } catch {
      // error already toasted
    } finally {
      setIsSaving(false);
    }
  };

  // 일괄 피드백 생성 (모달 + 프론트 순차 호출)
  const handleBatchGenerate = async (overwrite: boolean) => {
    if (!feedbackStatus) return;
    const generatedIds = new Set(feedbackStatus.feedbacks.map((f) => f.examResult.examResultId));
    const targets: ExamResultSummary[] = overwrite
      ? feedbackStatus.allExamResults
      : feedbackStatus.allExamResults.filter((er) => !generatedIds.has(er.examResultId));

    if (targets.length === 0) return;

    cancelRef.current = false;
    setIsBatchGenerating(true);
    setBatchDone(false);
    setBatchProgress(
      targets.map((er) => ({
        examResultId: er.examResultId,
        studentName: er.student.studentName,
        status: "pending" as StudentProgressStatus,
      }))
    );
    setShowBatchModal(true);

    for (let i = 0; i < targets.length; i++) {
      if (cancelRef.current) break;
      const er = targets[i];

      setBatchProgress((prev) =>
        prev.map((p) =>
          p.examResultId === er.examResultId ? { ...p, status: "generating" } : p
        )
      );

      try {
        await generateStudentFeedback(er.examResultId);
        setBatchProgress((prev) =>
          prev.map((p) =>
            p.examResultId === er.examResultId ? { ...p, status: "done" } : p
          )
        );
      } catch {
        setBatchProgress((prev) =>
          prev.map((p) =>
            p.examResultId === er.examResultId
              ? { ...p, status: "error", error: "생성 실패" }
              : p
          )
        );
      }
    }

    setBatchDone(true);
    setIsBatchGenerating(false);
    await loadFeedbackStatus();
  };

  const handleCancelBatch = () => {
    cancelRef.current = true;
  };

  const closeBatchModal = () => {
    setShowBatchModal(false);
    setBatchProgress([]);
  };

  // 개별 학생 피드백 생성
  const handleGenerateStudent = async (examResultId: number) => {
    setGeneratingStudents((prev) => new Set(prev).add(examResultId));
    try {
      await generateStudentFeedback(examResultId);
      await loadFeedbackStatus();
    } catch {
      // error already toasted
    } finally {
      setGeneratingStudents((prev) => {
        const next = new Set(prev);
        next.delete(examResultId);
        return next;
      });
    }
  };

  // 개별 피드백 저장
  const handleSaveFeedback = async () => {
    if (!editingFeedback || !editingFeedback.content.trim()) return;
    setIsSavingFeedback(true);
    try {
      await updateStudentFeedback(editingFeedback.examResultId, editingFeedback.content);
      setEditingFeedback(null);
      await loadFeedbackStatus();
    } catch {
      // error already toasted
    } finally {
      setIsSavingFeedback(false);
    }
  };

  // textarea 변경 감지
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
    setHasUnsavedChanges(e.target.value !== commentary?.content);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 smalltablet:p-6">
      <h3 className="text-base smalltablet:text-lg font-sansKR-SemiBold text-gray-900 mb-4 flex items-center gap-2">
        <Sparkles className="h-4 smalltablet:h-5 w-4 smalltablet:w-5 text-purple-600" />
        AI 분석
      </h3>

      {/* 모의고사 총평 */}
      <div className="mb-6">
        <h4 className="text-sm smalltablet:text-base font-sansKR-SemiBold text-gray-800 mb-3">
          모의고사 총평
        </h4>

        {isCommentaryLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600" />
            <span className="ml-2 text-sm text-gray-500">불러오는 중...</span>
          </div>
        ) : (
          <>
            <textarea
              value={editedContent}
              onChange={handleContentChange}
              placeholder="아직 생성된 총평이 없습니다. '총평 생성' 버튼을 클릭해주세요."
              className="w-full h-40 smalltablet:h-48 p-3 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sansKR-Regular"
              disabled={isGenerating}
            />

            {/* 메타 정보 */}
            {commentary && (
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                <span>
                  생성일:{" "}
                  {new Date(commentary.generatedAt).toLocaleDateString("ko-KR")}
                </span>
                <span>|</span>
                <span
                  className={
                    commentary.isEdited ? "text-orange-600" : "text-green-600"
                  }
                >
                  {commentary.isEdited ? "수정됨" : "AI 원본"}
                </span>
                {hasUnsavedChanges && (
                  <>
                    <span>|</span>
                    <span className="text-red-500 font-sansKR-Medium">
                      저장하지 않은 변경사항이 있습니다
                    </span>
                  </>
                )}
              </div>
            )}

            {/* 버튼 */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1.5 px-3 py-2 text-xs smalltablet:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-sansKR-Medium"
              >
                {isGenerating ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5" />
                )}
                {commentary ? "재생성" : "총평 생성"}
              </button>

              {hasUnsavedChanges && (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs smalltablet:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-sansKR-Medium"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  수정 저장
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* 구분선 */}
      <hr className="border-gray-200 mb-6" />

      {/* 개인별 피드백 일괄 생성 */}
      <div>
        <h4 className="text-sm smalltablet:text-base font-sansKR-SemiBold text-gray-800 mb-3 flex items-center gap-2">
          <Users className="h-4 w-4" />
          개인별 피드백 일괄 생성
        </h4>

        {/* 생성 현황 */}
        {isFeedbackLoading ? (
          <div className="flex items-center py-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" />
            <span className="ml-2 text-sm text-gray-500">현황 조회 중...</span>
          </div>
        ) : feedbackStatus ? (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-purple-500 transition-all duration-300"
                  style={{
                    width: `${
                      feedbackStatus.totalExamResults > 0
                        ? (feedbackStatus.generatedCount /
                            feedbackStatus.totalExamResults) *
                          100
                        : 0
                    }%`,
                  }}
                />
              </div>
              <span className="text-sm font-sansKR-Medium text-gray-700 whitespace-nowrap">
                {feedbackStatus.generatedCount}/{feedbackStatus.totalExamResults}명
              </span>
            </div>
          </div>
        ) : null}

        {/* 버튼 */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleBatchGenerate(false)}
            disabled={isBatchGenerating}
            className="flex items-center gap-1.5 px-3 py-2 text-xs smalltablet:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-sansKR-Medium"
          >
            <Sparkles className="h-3.5 w-3.5" />
            미생성 학생 피드백 생성
          </button>

          <button
            onClick={() => handleBatchGenerate(true)}
            disabled={isBatchGenerating}
            className="flex items-center gap-1.5 px-3 py-2 text-xs smalltablet:text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-sansKR-Medium"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            기존 포함 전체 재생성
          </button>
        </div>

        {/* 일괄 생성 모달 */}
        {showBatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <h3 className="text-sm smalltablet:text-base font-sansKR-SemiBold text-gray-900">
                  피드백 일괄 생성
                </h3>
                {batchDone ? (
                  <button onClick={closeBatchModal} className="p-1 hover:bg-gray-100 rounded">
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                ) : (
                  <button
                    onClick={handleCancelBatch}
                    className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 font-sansKR-Medium"
                  >
                    중단
                  </button>
                )}
              </div>

              {/* 진행률 */}
              <div className="px-5 py-3 border-b border-gray-100">
                {(() => {
                  const done = batchProgress.filter((p) => p.status === "done").length;
                  const errors = batchProgress.filter((p) => p.status === "error").length;
                  const total = batchProgress.length;
                  const completed = done + errors;
                  return (
                    <>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full bg-purple-500 transition-all duration-300"
                            style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                          />
                        </div>
                        <span className="text-xs font-sansKR-Medium text-gray-600 whitespace-nowrap">
                          {completed}/{total}
                        </span>
                      </div>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span><span className="text-green-600 font-sansKR-Bold">{done}</span> 완료</span>
                        {errors > 0 && <span><span className="text-red-600 font-sansKR-Bold">{errors}</span> 오류</span>}
                        {!batchDone && <span className="text-purple-600">생성 중...</span>}
                        {batchDone && <span className="text-gray-800 font-sansKR-Medium">완료</span>}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* 학생 목록 */}
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <div className="space-y-1">
                  {batchProgress.map((p) => (
                    <div
                      key={p.examResultId}
                      className="flex items-center justify-between py-1.5 text-xs"
                    >
                      <span className="font-sansKR-Regular text-gray-800">{p.studentName}</span>
                      {p.status === "pending" && (
                        <span className="text-gray-400">대기</span>
                      )}
                      {p.status === "generating" && (
                        <div className="flex items-center gap-1 text-purple-600">
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600" />
                          <span>생성 중</span>
                        </div>
                      )}
                      {p.status === "done" && (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>완료</span>
                        </div>
                      )}
                      {p.status === "error" && (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{p.error}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 모달 하단 */}
              {batchDone && (
                <div className="px-5 py-3 border-t border-gray-200">
                  <button
                    onClick={closeBatchModal}
                    className="w-full py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-sansKR-Medium"
                  >
                    닫기
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 학생별 피드백 목록 */}
        {feedbackStatus && feedbackStatus.allExamResults.length > 0 && (
          <div className="mt-4">
            <h5 className="text-xs smalltablet:text-sm font-sansKR-SemiBold text-gray-700 mb-2">
              학생별 피드백 현황
            </h5>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs smalltablet:text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-sansKR-Medium text-gray-600">이름</th>
                    <th className="text-center px-3 py-2 font-sansKR-Medium text-gray-600">점수</th>
                    <th className="text-center px-3 py-2 font-sansKR-Medium text-gray-600">등급</th>
                    <th className="text-center px-3 py-2 font-sansKR-Medium text-gray-600">상태</th>
                    <th className="text-center px-3 py-2 font-sansKR-Medium text-gray-600">생성</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {feedbackStatus.allExamResults.map((er) => {
                    const feedback = feedbackStatus.feedbacks.find(
                      (f) => f.examResult.examResultId === er.examResultId
                    );
                    const isGeneratingThis = generatingStudents.has(er.examResultId);
                    const isExpanded = expandedStudent === er.examResultId;
                    const isEditingThis = editingFeedback?.examResultId === er.examResultId;
                    return (
                      <React.Fragment key={er.examResultId}>
                        <tr
                          className={`hover:bg-gray-50 ${feedback ? "cursor-pointer" : ""} ${isExpanded ? "bg-purple-50" : ""}`}
                          onClick={() => {
                            if (!feedback) return;
                            setExpandedStudent(isExpanded ? null : er.examResultId);
                            setEditingFeedback(null);
                          }}
                        >
                          <td className="px-3 py-2 font-sansKR-Regular text-gray-800 flex items-center gap-1">
                            {feedback && (
                              <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            )}
                            {er.student.studentName}
                          </td>
                          <td className="px-3 py-2 text-center text-gray-700">
                            {er.totalScore}점
                          </td>
                          <td className="px-3 py-2 text-center text-gray-700">
                            {er.grade}등급
                          </td>
                          <td className="px-3 py-2 text-center">
                            {feedback ? (
                              <span className="inline-block px-1.5 py-0.5 text-xs rounded bg-green-100 text-green-700">
                                {feedback.isEdited ? "수정됨" : "생성됨"}
                              </span>
                            ) : (
                              <span className="inline-block px-1.5 py-0.5 text-xs rounded bg-gray-100 text-gray-500">
                                미생성
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleGenerateStudent(er.examResultId)}
                              disabled={isGeneratingThis || isBatchGenerating}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-sansKR-Medium"
                            >
                              {isGeneratingThis ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                              ) : (
                                <Sparkles className="h-3 w-3" />
                              )}
                              {feedback ? "재생성" : "생성"}
                            </button>
                          </td>
                        </tr>
                        {isExpanded && feedback && (
                          <tr>
                            <td colSpan={5} className="px-3 py-3 bg-gray-50">
                              {isEditingThis ? (
                                <div>
                                  <textarea
                                    value={editingFeedback.content}
                                    onChange={(e) =>
                                      setEditingFeedback({ ...editingFeedback, content: e.target.value })
                                    }
                                    className="w-full h-32 p-2 text-xs border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 font-sansKR-Regular"
                                  />
                                  <div className="flex gap-2 mt-2">
                                    <button
                                      onClick={handleSaveFeedback}
                                      disabled={isSavingFeedback}
                                      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 font-sansKR-Medium"
                                    >
                                      <Save className="h-3 w-3" />
                                      {isSavingFeedback ? "저장 중..." : "저장"}
                                    </button>
                                    <button
                                      onClick={() => setEditingFeedback(null)}
                                      className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-sansKR-Medium"
                                    >
                                      취소
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-xs text-gray-700 whitespace-pre-wrap font-sansKR-Regular leading-relaxed">
                                    {feedback.content}
                                  </p>
                                  <div className="flex items-center gap-3 mt-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingFeedback({ examResultId: er.examResultId, content: feedback.content });
                                      }}
                                      className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-sansKR-Medium"
                                    >
                                      <Save className="h-3 w-3" />
                                      수정
                                    </button>
                                    <span className="text-xs text-gray-400">
                                      {new Date(feedback.generatedAt).toLocaleDateString("ko-KR")} 생성
                                      {feedback.isEdited && " (수정됨)"}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
