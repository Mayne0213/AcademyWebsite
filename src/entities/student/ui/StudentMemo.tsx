"use client";

import { useState } from "react";
import { useStudentStore } from "@/src/entities/student/model/store";
import { 
  StickyNote,
  Edit3,
  Save,
  X,
} from "lucide-react";

interface StudentMemoProps {
  onUpdateMemo: (memoText: string) => Promise<void>;
  isUpdating?: boolean;
}

interface MemoEditorProps {
  initialValue: string;
  onSave: (text: string) => void;
  onCancel: () => void;
  disabled: boolean;
}

function MemoEditor({ initialValue, onSave, onCancel, disabled }: MemoEditorProps) {
  const [text, setText] = useState(initialValue);

  const handleSave = () => {
    onSave(text);
  };

  const handleCancel = () => {
    setText(initialValue);
    onCancel();
  };

  return (
    <>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="학생에 대한 메모를 입력하세요..."
        className="w-full h-24 p-2 bg-transparent border-none outline-none resize-none text-yellow-900 text-sm leading-relaxed placeholder-yellow-500"
        disabled={disabled}
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={handleSave}
          disabled={disabled}
          className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
        >
          <Save className="w-3 h-3" />
          {disabled ? "저장중..." : "저장"}
        </button>
        <button
          onClick={handleCancel}
          disabled={disabled}
          className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50 text-sm"
        >
          <X className="w-3 h-3" />
          취소
        </button>
      </div>
    </>
  );
}

export function StudentMemo({ onUpdateMemo, isUpdating = false }: StudentMemoProps) {
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const { studentDetail } = useStudentStore();
  const handleSaveMemo = async (memoText: string) => {
    try {
      await onUpdateMemo(memoText.trim() || "");
      setIsEditingMemo(false);
    } catch (error) {
      console.error("메모 저장 실패:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingMemo(false);
  };

  return (
    <div className="bg-yellow-100 border-l-4 w-full border-yellow-400 rounded-xl shadow-lg p-4 overflow-y-scroll">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StickyNote className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-800">학생 메모</h3>
        </div>
        {!isEditingMemo && (
          <button
            onClick={() => setIsEditingMemo(true)}
            className="flex items-center gap-1 px-3 py-1 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
          >
            <Edit3 className="w-3 h-3" />
            편집
          </button>
        )}
      </div>
      <div className="p-4">
        {isEditingMemo ? (
          <MemoEditor
            initialValue={studentDetail?.studentMemo || ""}
            onSave={handleSaveMemo}
            onCancel={handleCancelEdit}
            disabled={isUpdating}
          />
        ) : (
          <>
            {studentDetail?.studentMemo ? (
              <p className="text-yellow-900 whitespace-pre-wrap text-sm leading-relaxed">
                {studentDetail?.studentMemo}
              </p>
            ) : (
              <p className="text-yellow-600 text-lg italic">
                등록된 메모가 없습니다.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
