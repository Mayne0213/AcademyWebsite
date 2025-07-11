/* trunk-ignore-all(prettier) */
"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import useAcademy from "@/components/hooks/useAcademy";
import AddAcademy from "@/components/main/academy/addAcademy";
import AcademyList from "@/components/main/academy/academyList";

const AcademyBoard = () => {
  const [writeNewAcademy, setWriteNewAcademy] = useState<boolean>(false);
  const {
    loadInitialAcademy,
    addAcademy,
  } = useAcademy();

  useEffect(() => {
    loadInitialAcademy();
  }, []);

  return (
    <div className="min-h-screen bg-white rounded-xl p-6 shadow-md flex flex-col relative">
      <div className="flex justify-between">
        <h2 className="text-2xl font-sansKR-SemiBold mb-4">단과 관리</h2>
        <Plus
          className="cursor-pointer"
          onClick={() => {
            setWriteNewAcademy(!writeNewAcademy);
          }}
        />
      </div>

      {writeNewAcademy && (
        <AddAcademy
          onCancel={() => setWriteNewAcademy(false)}
          onAdd={(academy:any) => {
            addAcademy(academy);
            setWriteNewAcademy(false);
          }}
        />
      )}

      <AcademyList />
    </div>
  );
};

export default AcademyBoard;
