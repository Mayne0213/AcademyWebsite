"use client";

import React, { useEffect, useState } from "react";
import { useExamFeatureStore } from "../model";
import { useExamStore } from "@/src/entities/exam/model/store";
import { ExamCategory, EXAM_CATEGORY_LABELS } from "@/src/entities/exam/model/types";
import ExamItem from "./ExamItem";
import { Pagination } from "@/src/shared/ui/pagination";
import { FilterDropdown, FilterOption } from "@/src/shared/ui/FilterDropdown";

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
              <div className="h-12 bg-gray-200 rounded-md" />
              <div className="h-12 bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 카테고리 필터 옵션 (전체 포함)
type CategoryFilterValue = ExamCategory | "ALL";
const CATEGORY_FILTER_OPTIONS: FilterOption<CategoryFilterValue>[] = [
  { value: "ALL", label: "전체" },
  { value: "GRADED", label: EXAM_CATEGORY_LABELS["GRADED"] },
  { value: "PASS_FAIL", label: EXAM_CATEGORY_LABELS["PASS_FAIL"] },
];

export default function ExamRead() {
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilterValue>("ALL");
  const { readExamSummaries } = useExamFeatureStore();
  const { exams, isLoading, totalCount } = useExamStore();

  const itemsPerPage = 9;

  useEffect(() => {
    const category = categoryFilter === "ALL" ? undefined : categoryFilter;
    readExamSummaries(currentPage, itemsPerPage, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, categoryFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (value: CategoryFilterValue) => {
    setCategoryFilter(value);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
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

  return (
    <div className="space-y-6">
      {/* 카테고리 필터 */}
      <div className="flex items-center justify-between">
        <FilterDropdown
          value={categoryFilter}
          onChange={handleCategoryChange}
          options={CATEGORY_FILTER_OPTIONS}
          label="시험 유형"
          minWidth="130px"
        />

        <span className="text-sm text-gray-500">
          총 {totalCount}개
        </span>
      </div>

      {/* 시험 목록 */}
      {exams.length === 0 ? (
        <div className="flex-1 w-full font-sansKR-SemiBold text-2xl flex items-center justify-center py-20">
          {categoryFilter !== "ALL" ? `${EXAM_CATEGORY_LABELS[categoryFilter]} 시험이 없습니다.` : "등록된 시험이 없습니다."}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
