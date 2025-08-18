"use client";

import React from "react";
import { ExamRead } from "@/src/features/examCRUD/ui";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function GradingPage() {
  return (
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl desktop:text-3xl font-sansKR-Bold">
          📊 성적 관리
        </div>
        <Link href="/main/grading/create">
          <Plus />
        </Link>
      </div>

      <ExamRead />
    </main>
  );
}
