import { Student } from "@/entities/student/model/types";
import { studentApi } from '@/entities/student/api';
import { useStudentStore } from "@/entities/student/model/store";
import { useState } from 'react';

// 단순한 함수들과 로딩 상태 관리
export const useStudentFeatureStore = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return {
    isLoading,

    // 모든 학생 조회
    readStudents: async () => {
      setIsLoading(true);
      
      try {
        const students = await studentApi.getStudents();
        useStudentStore.getState().readStudents(students);
        useStudentStore.getState().setError(null);
      } catch (error) {
        useStudentStore.getState().setError(error instanceof Error ? error.message : '학생 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    },

    // 학생 생성
    createStudent: async (newStudent: Omit<Student, "memberId" | "createdAt" | "updatedAt">) => {
      setIsLoading(true);
      
      try {
        const student = await studentApi.createStudent(newStudent);
        useStudentStore.getState().createStudent(student);
        useStudentStore.getState().setError(null);
        return student;
      } catch (error) {
        useStudentStore.getState().setError(error instanceof Error ? error.message : '학생 생성에 실패했습니다.');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },

    // 학생 수정
    updateStudent: async (studentId: number, updatedStudent: Student) => {
      setIsLoading(true);
      
      try {
        const student = await studentApi.updateStudent(studentId, updatedStudent);
        useStudentStore.getState().updateStudent(student);
        useStudentStore.getState().setError(null);
        return student;
      } catch (error) {
        useStudentStore.getState().setError(error instanceof Error ? error.message : '학생 수정에 실패했습니다.');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },

    // 학생 삭제
    deleteStudent: async (studentId: number) => {
      setIsLoading(true);
      
      try {
        await studentApi.deleteStudent(studentId);
        useStudentStore.getState().deleteStudent(studentId);
        useStudentStore.getState().setError(null);
      } catch (error) {
        useStudentStore.getState().setError(error instanceof Error ? error.message : '학생 삭제에 실패했습니다.');
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
  };
};