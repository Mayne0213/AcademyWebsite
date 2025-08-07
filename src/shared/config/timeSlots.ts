// 상담 가능 시간대 설정
export interface TimeSlot {
  timeSlotId: number;
  startTime: string;
  endTime: string;
  displayName: string;
}

// 30분 단위 시간대 목록 (00:00-23:30)
export const TIME_SLOTS: TimeSlot[] = [
  { timeSlotId: 1, startTime: "00:00", endTime: "00:30", displayName: "00:00-00:30" },
  { timeSlotId: 2, startTime: "00:30", endTime: "01:00", displayName: "00:30-01:00" },
  { timeSlotId: 3, startTime: "01:00", endTime: "01:30", displayName: "01:00-01:30" },
  { timeSlotId: 4, startTime: "01:30", endTime: "02:00", displayName: "01:30-02:00" },
  { timeSlotId: 5, startTime: "02:00", endTime: "02:30", displayName: "02:00-02:30" },
  { timeSlotId: 6, startTime: "02:30", endTime: "03:00", displayName: "02:30-03:00" },
  { timeSlotId: 7, startTime: "03:00", endTime: "03:30", displayName: "03:00-03:30" },
  { timeSlotId: 8, startTime: "03:30", endTime: "04:00", displayName: "03:30-04:00" },
  { timeSlotId: 9, startTime: "04:00", endTime: "04:30", displayName: "04:00-04:30" },
  { timeSlotId: 10, startTime: "04:30", endTime: "05:00", displayName: "04:30-05:00" },
  { timeSlotId: 11, startTime: "05:00", endTime: "05:30", displayName: "05:00-05:30" },
  { timeSlotId: 12, startTime: "05:30", endTime: "06:00", displayName: "05:30-06:00" },
  { timeSlotId: 13, startTime: "06:00", endTime: "06:30", displayName: "06:00-06:30" },
  { timeSlotId: 14, startTime: "06:30", endTime: "07:00", displayName: "06:30-07:00" },
  { timeSlotId: 15, startTime: "07:00", endTime: "07:30", displayName: "07:00-07:30" },
  { timeSlotId: 16, startTime: "07:30", endTime: "08:00", displayName: "07:30-08:00" },
  { timeSlotId: 17, startTime: "08:00", endTime: "08:30", displayName: "08:00-08:30" },
  { timeSlotId: 18, startTime: "08:30", endTime: "09:00", displayName: "08:30-09:00" },
  { timeSlotId: 19, startTime: "09:00", endTime: "09:30", displayName: "09:00-09:30" },
  { timeSlotId: 20, startTime: "09:30", endTime: "10:00", displayName: "09:30-10:00" },
  { timeSlotId: 21, startTime: "10:00", endTime: "10:30", displayName: "10:00-10:30" },
  { timeSlotId: 22, startTime: "10:30", endTime: "11:00", displayName: "10:30-11:00" },
  { timeSlotId: 23, startTime: "11:00", endTime: "11:30", displayName: "11:00-11:30" },
  { timeSlotId: 24, startTime: "11:30", endTime: "12:00", displayName: "11:30-12:00" },
  { timeSlotId: 25, startTime: "12:00", endTime: "12:30", displayName: "12:00-12:30" },
  { timeSlotId: 26, startTime: "12:30", endTime: "13:00", displayName: "12:30-13:00" },
  { timeSlotId: 27, startTime: "13:00", endTime: "13:30", displayName: "13:00-13:30" },
  { timeSlotId: 28, startTime: "13:30", endTime: "14:00", displayName: "13:30-14:00" },
  { timeSlotId: 29, startTime: "14:00", endTime: "14:30", displayName: "14:00-14:30" },
  { timeSlotId: 30, startTime: "14:30", endTime: "15:00", displayName: "14:30-15:00" },
  { timeSlotId: 31, startTime: "15:00", endTime: "15:30", displayName: "15:00-15:30" },
  { timeSlotId: 32, startTime: "15:30", endTime: "16:00", displayName: "15:30-16:00" },
  { timeSlotId: 33, startTime: "16:00", endTime: "16:30", displayName: "16:00-16:30" },
  { timeSlotId: 34, startTime: "16:30", endTime: "17:00", displayName: "16:30-17:00" },
  { timeSlotId: 35, startTime: "17:00", endTime: "17:30", displayName: "17:00-17:30" },
  { timeSlotId: 36, startTime: "17:30", endTime: "18:00", displayName: "17:30-18:00" },
  { timeSlotId: 37, startTime: "18:00", endTime: "18:30", displayName: "18:00-18:30" },
  { timeSlotId: 38, startTime: "18:30", endTime: "19:00", displayName: "18:30-19:00" },
  { timeSlotId: 39, startTime: "19:00", endTime: "19:30", displayName: "19:00-19:30" },
  { timeSlotId: 40, startTime: "19:30", endTime: "20:00", displayName: "19:30-20:00" },
  { timeSlotId: 41, startTime: "20:00", endTime: "20:30", displayName: "20:00-20:30" },
  { timeSlotId: 42, startTime: "20:30", endTime: "21:00", displayName: "20:30-21:00" },
  { timeSlotId: 43, startTime: "21:00", endTime: "21:30", displayName: "21:00-21:30" },
  { timeSlotId: 44, startTime: "21:30", endTime: "22:00", displayName: "21:30-22:00" },
  { timeSlotId: 45, startTime: "22:00", endTime: "22:30", displayName: "22:00-22:30" },
  { timeSlotId: 46, startTime: "22:30", endTime: "23:00", displayName: "22:30-23:00" },
  { timeSlotId: 47, startTime: "23:00", endTime: "23:30", displayName: "23:00-23:30" },
  { timeSlotId: 48, startTime: "23:30", endTime: "23:59", displayName: "23:30-23:59" }
]; 