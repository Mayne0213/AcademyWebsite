import { create } from 'zustand';
import { 
  CounselingSchedule, 
  ScheduleState, 
  ScheduleBasicActions 
} from './types';

// 순수한 스케줄 상태 관리 스토어
export const useScheduleStore = create<ScheduleState & ScheduleBasicActions>((set) => ({
  schedules: [],
  isLoading: true,

  readSchedules: (schedules: CounselingSchedule[]) => set({ schedules }),

  createSchedule: (newSchedule: CounselingSchedule) => set((state) => ({
    schedules: [newSchedule, ...state.schedules]
  })),

  updateSchedule: (updatedSchedule: CounselingSchedule) => set((state) => ({
    schedules: state.schedules.map(schedule =>
      schedule.scheduleId === updatedSchedule.scheduleId ? updatedSchedule : schedule
    )
  })),

  deleteSchedule: (scheduleId: number) => set((state) => ({
    schedules: state.schedules.filter(schedule => schedule.scheduleId !== scheduleId)
  })),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
