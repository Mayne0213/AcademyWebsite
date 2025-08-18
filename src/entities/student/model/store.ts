import { create } from 'zustand';
import { Student, StudentState, StudentBasicActions } from './types';

// 순수한 학생 상태 관리 스토어
export const  useStudentStore = create<StudentState & StudentBasicActions>((set) => ({
  students: [],
  studentDetail: null,
  isLoading: true,

  // 순수한 상태 업데이트 메서드들
  readStudents: (students: Student[]) => set({ students }),
  readStudentById: (student: Student) => set({ studentDetail: student }),
  //학생을 추가하는 Create작업은 회원가입 페이지에서 처리
  
  updateStudent: (updatedStudent: Student) => set((state) => ({
    studentDetail: state.studentDetail?.memberId === updatedStudent.memberId
      ? updatedStudent
      : state.studentDetail
  })),
  
  //학생 삭제하는 Delete작업은 회원탈퇴 페이지에서 처리(User삭제시 Cascade로 삭제됨)
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
})); 