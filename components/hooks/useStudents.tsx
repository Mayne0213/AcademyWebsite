import { create } from "zustand";
import { Student } from "../type/studentType";
import { toast } from "sonner";

interface StudentState {
  students: Student[];
  isLoading: boolean;
  loadInitialStudents: () => void;
  addStudent: (newStudent: Omit<Student, "studentMemo">) => void;
  updateStudent: (updatedStudent: Student) => void;
  removeStudent: (memberId: number) => void;
}

const useStudent = create<StudentState>((set) => ({
  students: [],
  isLoading: true,

  loadInitialStudents: async () => {
    try {
      const res = await fetch("/api/student");
      const data: Student[] = await res.json();
      set({ students: data });
    } catch (error) {
      toast.error("학생 데이터를 불러오는 데 실패했습니다.");
    } finally {
      set({ isLoading: false });
    }
  },

  addStudent: async (newStudent) => {
    try {
      const res = await fetch("/api/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const result = await res.json();

      if (!result.success) throw new Error(result.message);

      set((state) => ({
        students: [...state.students, result.student],
      }));

      toast.success("학생이 추가되었습니다.");
    } catch (err) {
      console.error("학생 추가 실패:", err);
      toast.error("학생 추가에 실패했습니다.");
    }
  },

  updateStudent: async (updatedStudent) => {
    try {
      const res = await fetch(`/api/student/${updatedStudent.memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });
      const updated = await res.json();

      set((state) => ({
        students: state.students.map((s) =>
          s.memberId === updated.memberId ? updated : s,
        ),
      }));

      toast.success("학생 정보가 수정되었습니다.");
    } catch (error) {
      toast.error("학생 정보 수정에 실패했습니다.");
    }
  },

  removeStudent: async (memberId) => {
    try {
      await fetch(`/api/student/${memberId}`, { method: "DELETE" });

      set((state) => ({
        students: state.students.filter((s) => s.memberId !== memberId),
      }));

      toast.success("학생이 삭제되었습니다.");
    } catch (error) {
      toast.error("학생 삭제에 실패했습니다.");
    }
  },
}));

export default useStudent;
