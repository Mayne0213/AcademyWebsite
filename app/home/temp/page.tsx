"use client";

import React, { useEffect, useState } from "react";
import { useStudentFeatureStore } from "@/features/studentCRUD/model/store";
import { useStudentStore } from "@/entities/student/model/store";
import { Student } from "@/entities/student/model/types";

const StudentCRUDTestPage = () => {
  const { isLoading, readStudents, createStudent, updateStudent, deleteStudent } = useStudentFeatureStore();
  const { students, error } = useStudentStore();
  
  const [formData, setFormData] = useState({
    studentName: "",
    studentPhone: "",
    studentHighschool: "",
    studentBirthYear: 2000,
    studentMemo: "",
    academyId: 1,
  });

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  useEffect(() => {
    readStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.memberId, {
          ...editingStudent,
          ...formData,
        });
        setEditingStudent(null);
      } else {
        await createStudent(formData as Omit<Student, "memberId" | "createdAt" | "updatedAt">);
      }
      setFormData({
        studentName: "",
        studentPhone: "",
        studentHighschool: "",
        studentBirthYear: 2000,
        studentMemo: "",
        academyId: 1,
      });
    } catch (error) {
      console.error("학생 저장 실패:", error);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      studentName: student.studentName,
      studentPhone: student.studentPhone,
      studentHighschool: student.studentHighschool,
      studentBirthYear: student.studentBirthYear,
      studentMemo: student.studentMemo || "",
      academyId: student.academyId,
    });
  };

  const handleDelete = async (studentId: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteStudent(studentId);
      } catch (error) {
        console.error("학생 삭제 실패:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setFormData({
      studentName: "",
      studentPhone: "",
      studentHighschool: "",
      studentBirthYear: 2000,
      studentMemo: "",
      academyId: 1,
    });
  };

  return (
    <div className="p-8 mt-[150px]">
      <h1 className="text-2xl font-bold mb-6">학생 CRUD 테스트</h1>
      
      {/* 로딩 및 에러 상태 */}
      {isLoading && <div className="text-blue-600 mb-4">로딩 중...</div>}
      {error && <div className="text-red-600 mb-4">에러: {error}</div>}
      
      {/* 폼 */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
        <h2 className="text-xl mb-4">
          {editingStudent ? "학생 수정" : "새 학생 추가"}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">전화번호</label>
            <input
              type="text"
              value={formData.studentPhone}
              onChange={(e) => setFormData({...formData, studentPhone: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">고등학교</label>
            <input
              type="text"
              value={formData.studentHighschool}
              onChange={(e) => setFormData({...formData, studentHighschool: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">출생년도</label>
            <input
              type="number"
              value={formData.studentBirthYear}
              onChange={(e) => setFormData({...formData, studentBirthYear: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">메모</label>
            <textarea
              value={formData.studentMemo}
              onChange={(e) => setFormData({...formData, studentMemo: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingStudent ? "수정" : "추가"}
          </button>
          {editingStudent && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              취소
            </button>
          )}
        </div>
      </form>
      
      {/* 학생 목록 */}
      <div>
        <h2 className="text-xl mb-4">학생 목록 ({students.length}명)</h2>
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student.memberId} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{student.studentName}</h3>
                  <p className="text-sm text-gray-600">전화번호: {student.studentPhone}</p>
                  <p className="text-sm text-gray-600">고등학교: {student.studentHighschool}</p>
                  <p className="text-sm text-gray-600">출생년도: {student.studentBirthYear}</p>
                  {student.studentMemo && (
                    <p className="text-sm text-gray-600">메모: {student.studentMemo}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(student.memberId)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCRUDTestPage;
