"use client";
import { useEffect, useState } from "react";
import useAcademy from "@/components/hooks/useAcademy";
import useStudent from "@/components/hooks/useStudents";
import { Button } from "@/components/ui/button";
import useFilteredSortedPaginatedUsers from "@/components/hooks/useFilteredSortedPaginatedUsers";
import PaginationControls from "@/components/main/student/paginationControls";

const Message = () => {
  const { academys, loadInitialAcademy } = useAcademy();
  const { students, loadInitialStudents } = useStudent();

  const [selectedAcademyId, setSelectedAcademyId] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [message, setMessage] = useState("");

  const [newGroupName, setNewGroupName] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState<null | "name" | "school">("name");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAcademy, setSelectedAcademy] = useState<string>("전체");

  const { paginatedUsers, totalPages } = useFilteredSortedPaginatedUsers({
    students,
    academys,
    searchTerm,
    selectedAcademy,
    sortKey,
    currentPage,
  });

const sampleTemplates = [
  {
    templateTitle: "2주차 독해 숙제 안내",
    sections: [
      {
        title: "과제 안내",
        items: [
          { content: "이번 주 독해 교재", subItems: ["B1 교재 3강", "워크북 p.45~47"] },
          { content: "숙제 제출 방법", subItems: ["다음 수업 전까지 스캔 후 업로드"] },
        ],
      },
      {
        title: "주의 사항",
        items: [
          { content: "지각 제출 시", subItems: ["벌점 2점 부여"] },
          { content: "부정행위", subItems: ["AI 사용 금지", "친구와 공유 금지"] },
        ],
      },
    ],
  },
  {
    templateTitle: "1주차 문법 공지사항",
    sections: [
      {
        title: "수업 내용",
        items: [
          { content: "학습 범위", subItems: ["챕터 1~2", "핵심 문제 10개"] },
          { content: "필기 정리", subItems: ["노션 링크 참고"] },
        ],
      },
      {
        title: "주의 사항",
        items: [
          { content: "수업 지각", subItems: ["2번 이상 시 상담"] },
        ],
      },
    ],
  },
  {
    templateTitle: "3주차 단어 시험 안내",
    sections: [
      {
        title: "시험 범위",
        items: [
          { content: "단어 목록", subItems: ["Day 1~3 총 90개"] },
        ],
      },
      {
        title: "시험 방식",
        items: [
          { content: "시간", subItems: ["15분"] },
          { content: "형식", subItems: ["객관식 70%, 주관식 30%"] },
        ],
      },
    ],
  },
];


  // 상태 선언
const [sections, setSections] = useState<
  { title: string; items: { content: string; subItems: string[] }[] }[]
>([]);
const [newItem, setNewItem] = useState("");
const [newSubItem, setNewSubItem] = useState("");
const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
const [showTemplateModal, setShowTemplateModal] = useState(false);


// item 추가
const handleAddItem = (sectionIndex: number | null, itemText: string) => {
  if (sectionIndex === null || !itemText.trim()) return;
  const updated = [...sections];
  updated[sectionIndex].items.push({ content: itemText.trim(), subItems: [] });
  setSections(updated);
  setNewItem("");
};

const handleLoadTemplate = (index: number) => {
  const selectedTemplate = sampleTemplates[index];
  setSections(selectedTemplate.sections);
  setShowTemplateModal(false);
};


// subItem 추가
const handleAddSubItem = (sectionIndex: number | null, itemIndex: number | null, subItemText: string) => {
  if (sectionIndex === null || itemIndex === null || !subItemText.trim()) return;
  const updated = [...sections];
  updated[sectionIndex].items[itemIndex].subItems.push(subItemText.trim());
  setSections(updated);
  setNewSubItem("");
};


  useEffect(() => {
    loadInitialAcademy();
    loadInitialStudents();
  }, []);

  const handleAddGroup = () => {
    const trimmed = newGroupName.trim();
    if (trimmed === "") return;
    if (academys.some((g) => g.academyName === trimmed)) {
      alert("이미 존재하는 그룹 이름입니다.");
      return;
    }
    setNewGroupName("");
  };

  const handleAddTitle = () => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    setSections([...sections, { title: trimmed, items: [] }]);
    setNewTitle("");
  };

  useEffect(() => {
    const sectionMessages = sections.map(
      (sec) =>
        `🍏 ${sec.title}\n\n${sec.items
          .map((item) => {
            const subItemsText = item.subItems.map((s) => `  - ${s}`).join("\n");
            return `- ${item.content}${subItemsText ? "\n" + subItemsText : ""}`;
          })
          .join("\n")}\n\n`
    );

    const generatedMessage = `${sectionMessages.join("")}`;
    setMessage(generatedMessage);
  }, [selectedStudent, sections]);


  return (
    <div className="flex min-h-screen bg-gray-50 rounded-xl">
      {/* 좌측 사이드바 */}
      <div className="w-1/4 min-h-screen border-r bg-white p-6 rounded-l-xl flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-sansKR-SemiBold mb-4">수신 그룹 목록</h2>
          {academys.map((group) => (
            <div
              key={group.academyId}
              onClick={() => {
                setSelectedAcademyId(group.academyId);
                setSelectedAcademy(group.academyName);
                setCurrentPage(1);
                setSelectedStudent("");
              }}
              className={`p-3 mb-2 rounded cursor-pointer border ${
                selectedAcademyId === group.academyId
                  ? "bg-gray-200 border-gray-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="font-medium">{group.academyName}</div>
            </div>
          ))}
              <h3 className="font-semibold text-sm mt-8 mb-4 pb-2 border-b">학생 목록</h3>
              {selectedAcademyId && (
                <>
                {paginatedUsers.map((student) => (
                  <div
                    key={student.memberId}
                    onClick={() => setSelectedStudent(student.studentName)}
                    className={`p-2 mb-1 rounded cursor-pointer text-sm border ${
                      selectedStudent === student.studentName
                        ? "bg-blue-100 border-blue-400"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {student.studentName}
                  </div>
                ))}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
                </>
              )}
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="새 수신 그룹 이름"
            className="w-full border p-2 rounded text-sm mb-2"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Button onClick={handleAddGroup} className="w-full py-1.5 rounded text-sm">
            새 수신 그룹 생성
          </Button>
        </div>
      </div>

      {/* 우측 본문 */}
      <div className="flex flex-col w-3/4 p-6 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-sansKR-SemiBold">
            {selectedAcademy} {selectedStudent && `> ${selectedStudent}`}
          </h2>
          <div className="flex gap-2">
            <Button onClick={() => {}} className="bg-white text-gray-700 hover:bg-gray-100">기능 추가</Button>
            <Button onClick={() => setShowTemplateModal(true)} className="bg-white text-gray-700 hover:bg-gray-100">템플릿</Button>


          </div>
        </div>

        {/* 섹션 추가 */}
        <div className="border p-4 rounded bg-white space-y-2 ">
          {sections.map((section, sIdx) => (
            <div
              key={sIdx}
              onClick={() => setActiveSectionIndex(sIdx)}
              className={`rounded-xl p-5 mb-4 shadow-md cursor-pointer transition-all duration-200 ${
                activeSectionIndex === sIdx ? 'bg-blue-100 border border-blue-400' : 'bg-gray-50'
              }`}
            >
              <p className="text-xl font-sansKR-Bold">🍏 {section.title}</p>

              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  onClick={(e) => {
                    setActiveItemIndex(iIdx);
                  }}
                  className={`p-3 rounded-lg ${
                    activeSectionIndex === sIdx && activeItemIndex === iIdx ? 'bg-white border my-2 border-blue-300' : 'bg-white border my-2'
                  }`}
                >
                  <p className="text-base font-sansKR-SemiBold text-gray-800">{item.content}</p>
                  <ul className="ml-4 text-sm list-disc list-inside">
                    {item.subItems.map((subItem, siIdx) => (
                      <li key={siIdx} className="mt-4">{subItem}</li>
                    ))}
                  </ul>

                  {activeSectionIndex === sIdx && activeItemIndex === iIdx && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        value={newSubItem}
                        onChange={(e) => setNewSubItem(e.target.value)}
                        placeholder="하위 항목 입력"
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <Button
                        onClick={() => handleAddSubItem(sIdx, iIdx, newSubItem)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        추가
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              {activeSectionIndex === sIdx && (
                <div className="flex gap-2 mt-4">
                  <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="항목 입력"
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <Button
                    onClick={() => handleAddItem(sIdx, newItem)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  >
                    항목 추가
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="🍏 제목 입력"
              className="flex-1 border p-2 rounded text-sm"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Button onClick={handleAddTitle} className="text-sm">제목 추가</Button>
          </div>
        </div>

        {/* 메시지 본문 */}
        <div className="flex-1 overflow-y-auto border rounded p-2 bg-white whitespace-pre-wrap text-sm">
          {message}
        </div>

        {showTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-96">
              <h3 className="text-lg font-semibold mb-4">템플릿 선택</h3>
              <ul className="space-y-2">
                {sampleTemplates.map((template, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => handleLoadTemplate(idx)}
                      className="w-full text-left px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      {template.templateTitle}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <Button onClick={() => setShowTemplateModal(false)} className="text-sm text-gray-600">
                  닫기
                </Button>
              </div>
            </div>
          </div>
        )}


        <div className="text-right text-sm text-gray-500">
          {message.length} / 2000 bytes
        </div>
      </div>
    </div>
  );
};

export default Message;
