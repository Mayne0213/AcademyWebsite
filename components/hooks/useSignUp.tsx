import { create } from "zustand";
import { Student } from "../type/studentType";
import { toast } from "sonner";

interface StudentState {
  students: Student[];
  loadInitialStudents: () => void;
  addStudent: (newStudent: Omit<Student, "studentMemo">) => void;
  updateStudent: (updatedStudent: Student) => void;
  removeStudent: (memberId: number) => void;
}

export const useSignUp = create<StudentState>((set, get) => ({
  students: [],

  loadInitialStudents: async () => {
    try {
      const res = await fetch("/api/member/signUp2");
      const data: Student[] = await res.json();
      set({ students: data });
    } catch (error) {
      toast.error("학생 데이터를 불러오는 데 실패했습니다.");
    }
  },

  addStudent: async (newStudent) => {
    try {
      const res = await fetch("/api/member/signUp2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      const result = await res.json();

      if (!result.success) throw new Error(result.message);

      set((state) => ({
        students: [...state.students, result.student],
      }));
    } catch (err) {
      console.error("학생 추가 실패:", err);
    }
  },

  updateStudent: async (updatedStudent) => {
    try {
      const res = await fetch(
        `/api/member/signUp2/${updatedStudent.memberId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedStudent),
        },
      );
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
      await fetch(`/api/member/signUp2/${memberId}`, {
        method: "DELETE",
      });

      set((state) => ({
        students: state.students.filter((s) => s.memberId !== memberId),
      }));

      toast.success("학생이 삭제되었습니다.");
    } catch (error) {
      toast.error("학생 삭제에 실패했습니다.");
    }
  },
}));

export default useSignUp;
