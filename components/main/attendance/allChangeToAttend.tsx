"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface AttendanceStatsPanelProps {
  selectedAcademy: string;
  onAllChangeToAttend: () => void;
}


const AllChangeToAttend = ({ selectedAcademy,onAllChangeToAttend }: AttendanceStatsPanelProps) => {
    const handleButtonClick = async () => {
        const confirmed = window.confirm(`정말 전체 출석체크 하시겠습니까? \n${selectedAcademy}의 모든 원생이 전체 출석처리됩니다.`);
        if (confirmed){
            onAllChangeToAttend();
        }
    }
    return (
      <Button variant="outline" disabled={selectedAcademy === "전체"} onClick={handleButtonClick}>전체 출석</Button>
  );
};

export default AllChangeToAttend;
