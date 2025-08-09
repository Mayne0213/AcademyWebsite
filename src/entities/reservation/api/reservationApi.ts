import { 
  CounselingReservation, 
  CreateCounselingReservationRequest,
  AdminWithSchedules
} from '../model/types';
import { RESERVATION_VALIDATION } from '../model/validation';
import { apiGet, apiPost } from '@/src/shared/api';
import { API_ENDPOINTS } from '@/src/shared/config';

// 상담 가능한 Admin 목록 조회
export const getAvailableAdmins = async (): Promise<AdminWithSchedules[]> => {
  try {
    const data = await apiGet<AdminWithSchedules[]>(API_ENDPOINTS.SCHEDULE.ADMINS);
    
    return data;
  } catch (error) {
    throw error;
  }
};

// 상담 예약 생성
export const createCounselingReservation = async (data: CreateCounselingReservationRequest): Promise<CounselingReservation> => {
  try {
    RESERVATION_VALIDATION.validateCreateReservation(data);
    const result = await apiPost<CounselingReservation>(API_ENDPOINTS.RESERVATION.BASE, data);
       
    return result;
  } catch (error) {
    throw error;
  }
};

// 관리자용 예약 목록 조회
export const getAdminReservations = async (): Promise<CounselingReservation[]> => {
  try {
    const data = await apiGet<CounselingReservation[]>(API_ENDPOINTS.RESERVATION.ADMIN);
    
    return data;
  } catch (error) {
    throw error;
  }
};
