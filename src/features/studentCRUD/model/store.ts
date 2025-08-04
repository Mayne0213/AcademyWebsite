import { useCallback } from 'react';
import { Student } from "@/src/entities/student/model/types";
import { studentApi } from '@/src/entities/student/api';
import { useStudentStore } from "@/src/entities/student/model/store";

// API 호출과 전역 상태 관리를 통합하는 훅
export const useStudentFeatureStore = () => {
  const entityStore = useStudentStore.getState();

  const readStudents = useCallback(async () => {
    entityStore.setLoading(true);
    entityStore.readStudents(await studentApi.getStudents());
    entityStore.setLoading(false);
  }, [entityStore]);

  const updateStudent = useCallback(async (updatedStudent: Student) => {
    entityStore.setLoading(true);
    entityStore.updateStudent(await studentApi.updateStudent(updatedStudent.memberId, updatedStudent));
    entityStore.setLoading(false);
  }, [entityStore]);

  return {
    readStudents,
    updateStudent,
  };
};