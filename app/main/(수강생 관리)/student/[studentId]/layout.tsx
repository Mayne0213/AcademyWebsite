"use client";

import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import studentInformationBackground from "@/public/main/student/studentInformationBackground.jpg";
import {
  Smile,
  Settings,
  User,
  Smartphone,
  Hash,
  LampDesk,
  Menu,
  Brush,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useParams } from "next/navigation";
import useStudents from "@/components/hooks/useStudents";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { studentId } = useParams();
  const { students, loadInitialStudents } = useStudents();

  useEffect(() => {
    loadInitialStudents();
  }, []);

  const student = students.find(
    (s) => s.studentId.toString() === studentId
  );

  const age = student ? new Date().getFullYear() - student.studentBirthYear : null;
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState(student?.studentMemo || "");

  if (!student) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        해당 학생을 찾을 수 없습니다.
      </div>
    );
  }

  const handleDeleteClick = async () => {
    const confirmed = window.confirm("정말 학생을 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/students/${studentId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("삭제 실패");
      }

      alert("학생이 성공적으로 삭제되었습니다.");
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* left side */}
      <div className="mr-4">
        <div className="min-w-[400px] mb-4">
          <div className="rounded-t-xl bg-blue-200 w-full flex item-center justify-between p-4">
            <div className="flex items-center justify-between font-sansKR-SemiBold">
              <Smile className="mr-2" />
              <p>{student.studentName}</p>
            </div>
              <DropdownMenu>
                <DropdownMenuTrigger><Settings/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>정보 수정</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDeleteClick}>학생 삭제</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>

          {/* second box. includes (actual) face picture, phone number*/}
          <div>
            <div className="bg-transparent w-full h-[120px] p-16 flex items-center relative">
              <Image
                alt=""
                src={studentInformationBackground}
                layout="fill"
                objectFit="cover"
                className="z-0"
              />
              <div className="absolute inset-0 bg-black opacity-30 z-1"></div>
              <div className="z-10 flex text-white">
                <User size={50} className="mr-4" />
                <div className="font-sansKR-SemiBold">
                  <div className="flex mb-2">
                    <LampDesk className="mr-2" />
                    {student.academyId}
                  </div>
                  <div className="flex">
                    <Smartphone className="mr-2" />
                    {student.studentPhone}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* specific informations, detailed information or memos */}
          <div className="p-6 bg-white rounded-b-xl">
            {/* specific information */}
            <div className="flex ">
              <div className="mr-16">
                <div className="flex my-4">
                  <Hash className="mr-2" /> 출석 번호:
                </div>
                <div className="flex my-4">
                  <User className="mr-2" /> 재학 학교:
                </div>
                <div className="flex my-4">
                  <User className="mr-2" /> 학년:
                </div>
                <div className="flex my-4">
                  <User className="mr-2" /> 출석률:
                </div>
                <div className="flex my-4">
                  <User className="mr-2" /> 과제 달성률:
                </div>
              </div>
              <div className="font-sansKR-Light">
                <div className="my-4">{student.attendanceNumber}</div>
                <div className="my-4">{student.studentHighschool}</div>
                <div className="my-4">{age}세</div>
                {/* <div className="my-4">{student.studentAttendance}</div>
                <div className="my-4">{student.studentHomework}</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* MemoPad */}
        <div className="min-w-[300px] bg-yellow-100 min-h-[300px] rounded-xl p-6  justify-between"
        onClick={() => setIsEditing(true)}>
          <div className="flex justify-between mb-2">
            <p className="font-sansKR-SemiBold">메모</p>
            {/* <Paperclip /> */}
          </div>
           {/* 메모 영역 */}
            {isEditing ? (
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                onBlur={() => setIsEditing(false)}

                autoFocus
                className="w-full h-[200px] rounded-md bg-yellow-100 outline-none whitespace-pre-line"
              />
            ) : (
              <p className="whitespace-pre-line">{memo || "메모를 입력하세요..."}</p>
            )}
        </div>
      </div>

      {/* right side */}
      <div className="w-full bg-white h-screen rounded-xl">
        {/* Navbar */}
        <div className="border-b-2 flex justify-between items-center p-4">
          <div className="flex">
            {["상담", "결제", "출석", "성적", "리포트", "문자 발송"].map(
              (label, index) => (
                <button
                  key={index}
                  className={`${
                    currentMenuIndex === index ? "bg-blue-200" : ""
                  } px-4 py-2 rounded-lg flex transition-all duration-300`}
                  onClick={() => setCurrentMenuIndex(index)}
                >
                  <Brush className="pr-1" />
                  {label}
                </button>
              )
            )}
          </div>
          <button className="hover:bg-black hover:bg-opacity-30 transition-all duration-300 rounded-sm">
            <Menu />
          </button>
        </div>

        {/* Rendering actual informations depending on current index */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
