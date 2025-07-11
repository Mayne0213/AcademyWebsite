// "use client";
// import React, { useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import useStudents from "@/components/hooks/useStudents";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Student } from "@/components/type/studentType";
// interface InputFieldProps {
//   label: string;
//   id: string;
//   inputRef: React.RefObject<HTMLInputElement>;
// }
// const InputField: React.FC<InputFieldProps> = ({ label, id, inputRef }) => (
//   <div className="grid grid-cols-3 items-center gap-4">
//     <Label htmlFor={id}>{label}</Label>
//     <Input id={id} className="col-span-2 h-8" ref={inputRef} required />
//   </div>
// );
// const StudentRegister: React.FC<{ destinationAcademy: string }> = ({ destinationAcademy }) => {
//   const { students, addStudent } = useStudents();
//   const studentNameRef = useRef<HTMLInputElement>(null);
//   const studentPhoneRef = useRef<HTMLInputElement>(null);
//   const studentHighschoolRef = useRef<HTMLInputElement>(null);
//   const studentBirthYearRef = useRef<HTMLInputElement>(null);
//   const attendanceNumberRef = useRef<HTMLInputElement>(null);
//   const handleAddStudent = () => {
//     let phone = studentPhoneRef.current?.value.trim().replace(/-/g, "") || "";
//     const name = studentNameRef.current?.value.trim() || "";
//     const highschool = studentHighschoolRef.current?.value.trim() || "";
//     const birthYear = Number(studentBirthYearRef.current?.value.trim()) || -1;
//     const attendance = Number(attendanceNumberRef.current?.value.trim()) || -1;
//     if (!name || !phone || !highschool || !birthYear || !attendance) {
//       toast.error("모든 필드를 입력해주세요.");
//       return;
//     }
//     if (!/^010\d{3,4}\d{4}$/.test(phone)) {
//       toast.error("전화번호를 올바른 형식으로 입력해주세요");
//       return;
//     }
//     else if (phone.length === 11) {
//       phone = phone.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3");
//     } else if (phone.length === 10) {
//       phone = phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1-$2-$3");
//     }
//     if (birthYear <= 1900) {
//       toast.error("생년을 올바른 형식으로 입력해주세요.");
//       return;
//     }
//     if (attendance <= -1){
//       toast.error("출석번호를 올바른 형식으로 입력해주세요");
//     }
//     const newStudent: Student = {
//       studentId: Math.max(0, ...students.map((s) => s.memberId)) + 1,
//       academyId: destinationAcademy,
//       studentName: name,
//       studentPhone: phone,
//       // 여기 parentphone 확인해보기
//       parentPhone: phone,
//       studentHighschool: highschool,
//       studentBirthYear: birthYear,
//       studentMemo: "",
//       attendanceNumber: attendance,
//     };
//     addStudent(newStudent);
//     toast("처리 완료", {
//       description: `${newStudent.studentName} 학생이 추가되었습니다.`,
//     });
//     // 입력값 초기화
//     [studentNameRef, studentPhoneRef, studentHighschoolRef, studentBirthYearRef, attendanceNumberRef].forEach(ref => {
//       if (ref.current) ref.current.value = "";
//     });
//   };
//   return (
//     <div className="flex justify-between gap-2">
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="outline" disabled={destinationAcademy === "전체"}>
//             학생 추가
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-80">
//           <div className="grid gap-4">
//             <div className="space-y-2">
//               <h4 className="font-medium leading-none">학생 추가</h4>
//               <p className="text-sm text-muted-foreground">
//                 신규 학생을 추가합니다.
//               </p>
//             </div>
//             <div className="grid gap-2">
//               <InputField label="이름" id="studentName" inputRef={studentNameRef} />
//               <InputField label="전화번호" id="studentPhone" inputRef={studentPhoneRef} />
//               <InputField label="고등학교" id="studentHighschool" inputRef={studentHighschoolRef} />
//               <InputField label="생년" id="studentBirthYear" inputRef={studentBirthYearRef} />
//               <InputField label="출석번호" id="attendanceNumber" inputRef={attendanceNumberRef} />
//             </div>
//             <Button onClick={handleAddStudent}>추가하기</Button>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };
// export default StudentRegister;

// 아래는 임시 더미 컴포넌트입니다.
export default function Dummy() {
  return <div>준비 중인 학생 등록 페이지입니다.</div>;
}
