import { toast } from "sonner";
import { create } from "zustand";
import { Academy } from "../type/academyType";

interface AcademyState {
  academys: Academy[];
  isLoading: boolean;
  loadInitialAcademy: () => void;
  addAcademy: (newAcademy: Omit<Academy, "academyId" | "createdAt">) => void;
  updateAcademy: (updatedAcademy: Academy) => void;
  removeAcademy: (targetAcademy: Academy) => void;
}

export const useAcademy = create<AcademyState>((set) => ({
  academys: [],
  isLoading: true,

  loadInitialAcademy: async () => {
    try {
      const res = await fetch("/api/academy");
      if (!res.ok) throw new Error("Failed to Fetch");
      const data: Academy[] = await res.json();
      set({ academys: data });
    } catch (error) {
      toast.error("학원 로딩 중 오류가 발생했습니다.");
    } finally {
      set({ isLoading: false });
    }
  },

  addAcademy: async (newAcademy) => {
    try {
      const res = await fetch("/api/academy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcademy),
      });

      if (!res.ok) throw new Error("Failed to Fetch");
      const created = await res.json();
      set((state) => ({
        academys: [created, ...state.academys],
      }));
      toast("처리 완료", {
        description: `새로운 학원이 추가되었습니다.`,
      });
    } catch (error) {
      toast.error("학원 추가 중 오류가 발생했습니다.");
    }
  },

  updateAcademy: async (updatedAcademy) => {
    try {
      const res = await fetch(`/api/academy/${updatedAcademy.academyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAcademy),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();

      set((state) => ({
        academys: state.academys.map((academy) =>
          academy.academyId === updated.academyId ? updated : academy,
        ),
      }));

      toast("처리 완료", {
        description: `학원이 수정되었습니다.`,
      });
    } catch (error) {
      toast.error("학원 수정 중 오류가 발생했습니다.");
    }
  },

  removeAcademy: async (targetAcademy) => {
    try {
      const res = await fetch(`/api/academy/${targetAcademy.academyId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      set((state) => ({
        academys: state.academys.filter(
          (academy) => academy.academyId !== targetAcademy.academyId,
        ),
      }));

      toast("처리 완료", {
        description: `학원이 삭제되었습니다.`,
      });
    } catch (error) {
      toast.error("학원 삭제 중 오류가 발생했습니다.");
    }
  },
}));

export default useAcademy;
