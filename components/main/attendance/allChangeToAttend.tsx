"use client";

import React from "react";
import { Button } from "@/src/shared/ui/button";

interface AttendanceStatsPanelProps {
  selectedAcademyId: number | null;
  onAllChangeToAttend: () => void;
}

const AllChangeToAttend = ({ selectedAcademyId, onAllChangeToAttend }: AttendanceStatsPanelProps) => {
  const handleButtonClick = async () => {
    const confirmed = window.confirm(`정말 전체 출석체크 하시겠습니까? \n선택된 학원의 모든 원생이 전체 출석처리됩니다.`);
    if (confirmed) {
      onAllChangeToAttend();
    }
  };

  return (
    <Button variant="outline" disabled={selectedAcademyId === null} onClick={handleButtonClick}>
      전체 출석
    </Button>
  );
};

export default AllChangeToAttend;
