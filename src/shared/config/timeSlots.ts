// 상담 가능 시간대 설정
export interface TimeSlot {
  timeSlotId: number;
  startTime: string;
  endTime: string;
  displayName: string;
}

// 20분 단위 시간대 목록 (09:00-24:00)
export const TIME_SLOTS: TimeSlot[] = [
  { timeSlotId: 1, startTime: "09:00", endTime: "09:20", displayName: "09:00-09:20" },
  { timeSlotId: 2, startTime: "09:20", endTime: "09:40", displayName: "09:20-09:40" },
  { timeSlotId: 3, startTime: "09:40", endTime: "10:00", displayName: "09:40-10:00" },
  { timeSlotId: 4, startTime: "10:00", endTime: "10:20", displayName: "10:00-10:20" },
  { timeSlotId: 5, startTime: "10:20", endTime: "10:40", displayName: "10:20-10:40" },
  { timeSlotId: 6, startTime: "10:40", endTime: "11:00", displayName: "10:40-11:00" },
  { timeSlotId: 7, startTime: "11:00", endTime: "11:20", displayName: "11:00-11:20" },
  { timeSlotId: 8, startTime: "11:20", endTime: "11:40", displayName: "11:20-11:40" },
  { timeSlotId: 9, startTime: "11:40", endTime: "12:00", displayName: "11:40-12:00" },
  { timeSlotId: 10, startTime: "12:00", endTime: "12:20", displayName: "12:00-12:20" },
  { timeSlotId: 11, startTime: "12:20", endTime: "12:40", displayName: "12:20-12:40" },
  { timeSlotId: 12, startTime: "12:40", endTime: "13:00", displayName: "12:40-13:00" },
  { timeSlotId: 13, startTime: "13:00", endTime: "13:20", displayName: "13:00-13:20" },
  { timeSlotId: 14, startTime: "13:20", endTime: "13:40", displayName: "13:20-13:40" },
  { timeSlotId: 15, startTime: "13:40", endTime: "14:00", displayName: "13:40-14:00" },
  { timeSlotId: 16, startTime: "14:00", endTime: "14:20", displayName: "14:00-14:20" },
  { timeSlotId: 17, startTime: "14:20", endTime: "14:40", displayName: "14:20-14:40" },
  { timeSlotId: 18, startTime: "14:40", endTime: "15:00", displayName: "14:40-15:00" },
  { timeSlotId: 19, startTime: "15:00", endTime: "15:20", displayName: "15:00-15:20" },
  { timeSlotId: 20, startTime: "15:20", endTime: "15:40", displayName: "15:20-15:40" },
  { timeSlotId: 21, startTime: "15:40", endTime: "16:00", displayName: "15:40-16:00" },
  { timeSlotId: 22, startTime: "16:00", endTime: "16:20", displayName: "16:00-16:20" },
  { timeSlotId: 23, startTime: "16:20", endTime: "16:40", displayName: "16:20-16:40" },
  { timeSlotId: 24, startTime: "16:40", endTime: "17:00", displayName: "16:40-17:00" },
  { timeSlotId: 25, startTime: "17:00", endTime: "17:20", displayName: "17:00-17:20" },
  { timeSlotId: 26, startTime: "17:20", endTime: "17:40", displayName: "17:20-17:40" },
  { timeSlotId: 27, startTime: "17:40", endTime: "18:00", displayName: "17:40-18:00" },
  { timeSlotId: 28, startTime: "18:00", endTime: "18:20", displayName: "18:00-18:20" },
  { timeSlotId: 29, startTime: "18:20", endTime: "18:40", displayName: "18:20-18:40" },
  { timeSlotId: 30, startTime: "18:40", endTime: "19:00", displayName: "18:40-19:00" },
  { timeSlotId: 31, startTime: "19:00", endTime: "19:20", displayName: "19:00-19:20" },
  { timeSlotId: 32, startTime: "19:20", endTime: "19:40", displayName: "19:20-19:40" },
  { timeSlotId: 33, startTime: "19:40", endTime: "20:00", displayName: "19:40-20:00" },
  { timeSlotId: 34, startTime: "20:00", endTime: "20:20", displayName: "20:00-20:20" },
  { timeSlotId: 35, startTime: "20:20", endTime: "20:40", displayName: "20:20-20:40" },
  { timeSlotId: 36, startTime: "20:40", endTime: "21:00", displayName: "20:40-21:00" },
  { timeSlotId: 37, startTime: "21:00", endTime: "21:20", displayName: "21:00-21:20" },
  { timeSlotId: 38, startTime: "21:20", endTime: "21:40", displayName: "21:20-21:40" },
  { timeSlotId: 39, startTime: "21:40", endTime: "22:00", displayName: "21:40-22:00" },
  { timeSlotId: 40, startTime: "22:00", endTime: "22:20", displayName: "22:00-22:20" },
  { timeSlotId: 41, startTime: "22:20", endTime: "22:40", displayName: "22:20-22:40" },
  { timeSlotId: 42, startTime: "22:40", endTime: "23:00", displayName: "22:40-23:00" },
]; 