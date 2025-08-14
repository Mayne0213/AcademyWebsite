import { Exam } from "@/src/entities/exam/model/types";
import { useExamStore } from "@/src/entities/exam/model/store";
import { Loader2 } from "lucide-react";

interface ExamAnswersProps {
  examDetail: Exam;
}

export default function ExamAnswers({ examDetail }: ExamAnswersProps) {
  const { isDetailLoading } = useExamStore();

  const renderQuestionData = () => {
    if (!examDetail) return null;

    try {
      const correctAnswers = typeof examDetail.correctAnswers === 'string' 
        ? JSON.parse(examDetail.correctAnswers) 
        : examDetail.correctAnswers;
      const questionScores = typeof examDetail.questionScores === 'string' 
        ? JSON.parse(examDetail.questionScores) 
        : examDetail.questionScores;
      const questionTypes = typeof examDetail.questionTypes === 'string' 
        ? JSON.parse(examDetail.questionTypes) 
        : examDetail.questionTypes;

      return (
        <div className="space-y-0">
          {/* 헤더 */}
          <div className="bg-gray-100 border-b-2 border-gray-300 py-3 px-4 rounded-t-lg">
            <div className="grid grid-cols-12 gap-4 text-center">
              <div className="col-span-2 font-sansKR-SemiBold text-gray-900 text-xs smalltablet:text-sm tablet:text-base">번호</div>
              <div className="col-span-2 font-sansKR-SemiBold text-gray-900 text-xs smalltablet:text-sm tablet:text-base">답안</div>
              <div className="col-span-2 font-sansKR-SemiBold text-gray-900 text-xs smalltablet:text-sm tablet:text-base">배점</div>
              <div className="col-span-6 font-sansKR-SemiBold text-gray-900 text-xs smalltablet:text-sm tablet:text-base">유형</div>
            </div>
          </div>
          
          {/* 데이터 행들 */}
          {Array.from({ length: examDetail.totalQuestions }, (_, i) => {
            const questionNumber = (i + 1).toString();
            const answer = correctAnswers[questionNumber] || 'N/A';
            const score = questionScores[questionNumber] || 0;
            const type = questionTypes[questionNumber] || 'N/A';

            return (
              <div key={i + 1} className="border-b border-gray-200 py-3 px-4 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-center items-center">
                  <div className="col-span-2 font-sansKR-SemiBold text-gray-900 text-xs smalltablet:text-sm tablet:text-base">
                    {i + 1}번
                  </div>
                  <div className="col-span-2 bg-blue-100 px-3 py-1 rounded font-sansKR-Medium text-gray-900 text-xs smalltablet:text-sm tablet:text-base">
                    {answer}
                  </div>
                  <div className="col-span-2 bg-green-100 px-3 py-1 rounded font-sansKR-Medium text-gray-900 text-xs smalltablet:text-sm tablet:text-base">
                    {score}점
                  </div>
                  <div className="col-span-6 text-center bg-purple-100 px-3 py-1 rounded font-sansKR-Medium text-gray-900 text-xs smalltablet:text-sm tablet:text-base">
                    {type}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      console.error('답안 데이터 파싱 오류:', error);
      return (
        <div className="text-red-600 text-center py-4">
          답안 데이터를 불러오는 중 오류가 발생했습니다.
        </div>
      );
    }
  };

  return (
    <div className="max-h-96 overflow-y-auto">
      {isDetailLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>시험 정보를 불러오는 중...</span>
        </div>
      ) : (
        renderQuestionData()
      )}
    </div>
  );
}
