"use client";

import React, { useEffect, useState } from "react";
import { useExamFeatureStore } from "../model";
import { useExamStore } from "@/src/entities/exam/model/store";
import ExamItem from "./ExamItem";
import { Pagination } from "@/src/shared/ui/pagination";

const ExamSkeleton = () => {
  return (
    <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-300 overflow-hidden animate-pulse">
          <div className="p-4 flex justify-between items-start gap-2">
            <div className="flex-1">
              {/* Title skeleton */}
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-2" />
              
              {/* Meta info skeleton */}
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded-lg w-16" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded-lg" />
                  <div className="h-4 bg-gray-200 rounded-lg w-20" />
                </div>
              </div>
            </div>

            {/* Delete button skeleton */}
            <div className="w-16 h-8 bg-gray-200 rounded-lg" />
          </div>

          {/* Expanded content skeleton */}
          <div className="border-t border-gray-200 rounded-b-xl p-4 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="h-12 bg-gray-200 rounded-lg" />
              <div className="h-12 bg-gray-200 rounded-lg" />
              <div className="h-12 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ExamRead() {
  const [currentPage, setCurrentPage] = useState(1);
  const { readExamSummaries } = useExamFeatureStore();
  const { exams, isLoading, totalCount } = useExamStore();

  const itemsPerPage = 9;

  useEffect(() => {
    readExamSummaries(currentPage, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 relative">
        <ul className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ExamSkeleton key={index} />
          ))}
        </ul>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="flex-1 w-full font-sansKR-SemiBold text-2xl flex items-center justify-center">
        등록된 시험이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 시험 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exams.map((exam) => (
          <ExamItem
            key={exam.examId}
            exam={exam}
          />
        ))}
      </div>

      {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
    </div>
  );
}
