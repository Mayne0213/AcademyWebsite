import { Button } from "@/src/shared/ui/button";
import { Modal } from "@/src/shared/ui/Modal";
import { ExamSummary } from "@/src/entities/exam/model/types";
import { Calendar, Pencil, BarChart3, FileText, CheckSquare } from "lucide-react";
import { useState } from "react";
import { useExamFeatureStore } from "../model";
import { useExamStore } from "@/src/entities/exam/model/store";
import { FORMATS } from "@/src/shared/lib/formats";
import ExamAnswers from "./ExamAnswers";

export default function ExamItem({ 
  exam
}: {exam: ExamSummary}) {
  const { deleteExam, readExamDetail } = useExamFeatureStore();
  const { examDetail } = useExamStore(); 
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState<boolean>(false);

  // 삭제 확인 및 실행 함수
  const handleDelete = () => {
    if (window.confirm(`"${exam.examName}" 시험을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없으며, 관련된 모든 데이터가 삭제됩니다.`)) {
      deleteExam(exam.examId);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-300">
        <div className="p-4 flex justify-between items-start gap-2">
          <div className="flex-1">
            <h4 className="font-sansKR-SemiBold text-lg text-gray-900 mb-2 truncate">
              {exam.examName}
            </h4>
            <div className="space-y-1 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Pencil className="w-4 h-4" /> {exam.totalQuestions}문제
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {FORMATS.formatDate(exam.createdAt.toString())}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
          >
            삭제
          </Button>
        </div>

        <div className="border-t border-gray-200 rounded-b-xl p-4 bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 justify-center p-3 h-auto"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">시험 통계</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 justify-center p-3 h-auto"
              onClick={() => {
                readExamDetail(exam.examId);
                setIsAnswerModalOpen(true);
              }}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">답안 보기</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 justify-center p-3 h-auto"
            >
              <CheckSquare className="w-4 h-4" />
              <span className="text-sm">채점하기</span>
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAnswerModalOpen}
        onClose={() => setIsAnswerModalOpen(false)}
        title={`${exam.examName} - 답안 및 배점 정보`}
        size="lg"
      >
        {examDetail && <ExamAnswers examDetail={examDetail} />}
      </Modal>
    </>
  );
}
