/* trunk-ignore-all(prettier) */
"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import CreateAcademy from "@/src/features/academyCRUD/ui/CreateAcademy";
import ReadAcademy from "@/src/features/academyCRUD/ui/ReadAcademy";

const AcademyBoard = () => {
  const [writeNewAcademy, setWriteNewAcademy] = useState<boolean>(false);
  const { createAcademy, readAcademies } = useAcademyFeatureStore();

  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  return (
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-SemiBold">단과 관리</h2>
        <Plus
          className="cursor-pointer"
          onClick={() => {
            setWriteNewAcademy(!writeNewAcademy);
          }}
        />
      </div>

      {writeNewAcademy && (
        <div className="mb-4">
          <CreateAcademy
            onCancel={() => setWriteNewAcademy(false)}
            onAdd={(academy:any) => {
              createAcademy(academy);
              setWriteNewAcademy(false);
            }}
          />
        </div>
      )}

      <ReadAcademy />
    </main>
  );
};

export default AcademyBoard;
