import { 
  Admin, 
  CounselingReservation, 
  CreateCounselingReservationRequest,
  CounselingSchedule
} from '../model/types';
import { COUNSELING_VALIDATION } from '../model/validation';
import { apiGet, apiPost, apiDelete } from '@/src/shared/api';

// 상담 가능한 Admin 목록 조회
export const getAvailableAdmins = async (): Promise<Admin[]> => {
  try {
    const data = await apiGet<Admin[]>('/api/counseling/admins');
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 상담 예약 생성
export const createCounselingReservation = async (data: CreateCounselingReservationRequest): Promise<CounselingReservation> => {
  try {
    COUNSELING_VALIDATION.validateCreateReservation(data);
    const result = await apiPost<CounselingReservation>('/api/counseling/reservations', data);
       
    return result;
  } catch (error) {
    throw error;
  }
};

// 관리자용 예약 목록 조회
export const getAdminReservations = async (): Promise<CounselingReservation[]> => {
  try {
    const data = await apiGet<CounselingReservation[]>('/api/counseling/admin/reservations');
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 관리자용 스케줄 목록 조회
export const getAdminSchedules = async (): Promise<CounselingSchedule[]> => {
  try {
    const data = await apiGet<CounselingSchedule[]>('/api/counseling/admin/schedules');
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 특정 날짜의 스케줄 조회
export const getSchedulesByDate = async (date: string): Promise<CounselingSchedule[]> => {
  try {
    const data = await apiGet<CounselingSchedule[]>(`/api/counseling/admin/schedules?date=${date}`);
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 특정 월의 스케줄 조회
export const getSchedulesByMonth = async (year: number, month: number): Promise<CounselingSchedule[]> => {
  try {
    const data = await apiGet<CounselingSchedule[]>(`/api/counseling/admin/schedules?year=${year}&month=${month}`);
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 스케줄 추가
export const createCounselingSchedule = async (data: { date: string; timeSlotId: number }): Promise<CounselingSchedule> => {
  try {
    const result = await apiPost<CounselingSchedule>('/api/counseling/admin/schedules', data);
       
    return result;
  } catch (error) {
    throw error;
  }
};

// 스케줄 삭제
export const deleteCounselingSchedule = async (scheduleId: number): Promise<void> => {
  try {
    await apiDelete(`/api/counseling/admin/schedules?scheduleId=${scheduleId}`);
  } catch (error) {
    throw error;
  }
}; 