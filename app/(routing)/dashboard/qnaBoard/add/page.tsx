"use client";

import Header from "@/src/widgets/header/DashboardHeader";
import { QnaCreate } from "@/src/features/qnaCRUD/ui";

const AddQnAPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="질문 작성" description="궁금한 점을 등록하세요" />
      <div className="max-w-3xl mx-auto px-4 mt-6">
        <QnaCreate />
      </div>
    </div>
  );
};

export default AddQnAPage;