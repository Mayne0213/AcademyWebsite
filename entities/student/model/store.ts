import { create } from 'zustand';
import { Student, StudentState, StudentBasicActions } from './index';

// 순수한 학생 상태 관리 스토어
export const  useStudentStore = create<StudentState & StudentBasicActions>((set) => ({
  students: [],
  isLoading: false,
  error: null,

  // 순수한 상태 업데이트 메서드들
  readStudents: (students: Student[]) => set({ students }),
  
  createStudent: (student: Student) => set((state) => ({
    students: [student, ...state.students]
  })),
  
  updateStudent: (updatedStudent: Student) => set((state) => ({
    students: state.students.map(student => 
      student.memberId === updatedStudent.memberId ? updatedStudent : student
    )
  })),
  
  deleteStudent: (studentId: number) => set((state) => ({
    students: state.students.filter(student => student.memberId !== studentId)
  })),
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
  
  setError: (error: string | null) => set({ error }),
  
  clearError: () => set({ error: null })
})); 