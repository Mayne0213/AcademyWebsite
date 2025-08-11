import { CounselingSchedule } from '../model/types';
import { apiGet, apiPost, apiDelete } from '@/src/shared/api';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/src/shared/config';

// 관리자용 스케줄 목록 조회
export const getAdminSchedules = async (): Promise<CounselingSchedule[]> => {
  try {
    const data = await apiGet<CounselingSchedule[]>(API_ENDPOINTS.SCHEDULE.ADMIN);
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 특정 날짜의 스케줄 조회
export const getSchedulesByDate = async (date: string): Promise<CounselingSchedule[]> => {
  try {
    const data = await apiGet<CounselingSchedule[]>(`${API_ENDPOINTS.SCHEDULE.ADMIN}?date=${date}`);
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 특정 월의 스케줄 조회
export const getSchedulesByMonth = async (year: number, month: number): Promise<CounselingSchedule[]> => {
  try {
    const data = await apiGet<CounselingSchedule[]>(`${API_ENDPOINTS.SCHEDULE.ADMIN}?year=${year}&month=${month}`);
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 스케줄 추가
export const createCounselingSchedule = async (data: { date: string; timeSlotId: number }): Promise<CounselingSchedule> => {
  try {
    const result = await apiPost<CounselingSchedule>(API_ENDPOINTS.SCHEDULE.ADMIN, data);
    toast.success('상담 스케줄이 성공적으로 생성되었습니다.');
       
    return result;
  } catch (error) {
    throw error;
  }
};

// 스케줄 삭제
export const deleteCounselingSchedule = async (scheduleId: number): Promise<void> => {
  try {
    await apiDelete(`${API_ENDPOINTS.SCHEDULE.ADMIN}?scheduleId=${scheduleId}`);
    toast.success('상담 스케줄이 성공적으로 삭제되었습니다.');
  } catch (error) {
    throw error;
  }
};
