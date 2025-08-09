import { create } from "zustand";
import AttendanceData from "@/app/(routing)/main/(출석 관리)/attendance/studentAttendance.json";

interface Attendance {
  attendanceId: number;
  studentId: number;
  academyId: string;
  attendanceDate: string;
  attendanceStatus: string;
}

interface AttendanceState {
  attendances: Attendance[];
  attendanceStatusMap: { [studentId: number]: string };
  addAttendance: (newAttendance: Attendance) => void;
  removeAttendance: (newAttendance: Attendance) => void;
  loadInitialAttendances: () => void;
}

export const useAttendance = create<AttendanceState>((set) => ({
  attendances: [],
  attendanceStatusMap: {},

  loadInitialAttendances: () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    const filteredStatusMap = AttendanceData.StudentAttendance.reduce(
      (acc, user) => {
        if (user.attendanceDate === today) {
          acc[user.studentId] = user.attendanceStatus;
        }
        return acc;
      },
      {} as { [studentId: number]: string },
    );

    set({
      attendances: AttendanceData.StudentAttendance,
      attendanceStatusMap: filteredStatusMap,
    });
  },

  addAttendance: (newAttendance: Attendance) => {
    set((state) => {
      const updatedMap = {
        ...state.attendanceStatusMap,
        [newAttendance.studentId]: newAttendance.attendanceStatus,
      };

      return {
        attendances: [...state.attendances, newAttendance],
        attendanceStatusMap: updatedMap,
      };
    });
  },

  removeAttendance: (target: Attendance) => {
    set((state) => {
      const updatedAttendances = state.attendances.filter(
        (attendance) => attendance.attendanceId !== target.attendanceId,
      );

      const updatedMap = { ...state.attendanceStatusMap };
      delete updatedMap[target.studentId];

      return {
        attendances: updatedAttendances,
        attendanceStatusMap: updatedMap,
      };
    });
  },
}));

export default useAttendance;
