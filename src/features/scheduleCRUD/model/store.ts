import { useCallback } from 'react';
import { getAdminReservations } from '@/src/entities/reservation/api';
import { 
  getAdminSchedules, 
  getSchedulesByDate,
  getSchedulesByMonth,
  createCounselingSchedule, 
  deleteCounselingSchedule 
} from '@/src/entities/schedule/api';
import { useReservationStore } from '@/src/entities/reservation/model/store';
import { useScheduleStore } from '@/src/entities/schedule/model/store';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useScheduleCRUDFeatureStore = () => {
  const reservationStore = useReservationStore.getState();
  const scheduleStore = useScheduleStore.getState();

  const fetchReservations = useCallback(async () => {
    reservationStore.setLoading(true);
    try {
      // 예약 목록 조회
      const reservationsData = await getAdminReservations();
      reservationStore.readReservations(reservationsData || []);
    } catch (error) {
      console.error('예약 데이터 로드 실패:', error);
    } finally {
      reservationStore.setLoading(false);
    }
  }, [reservationStore]);

  const fetchAllSchedules = useCallback(async () => {
    scheduleStore.setLoading(true);
    try {
      // 전체 스케줄 목록 조회
      const schedulesData = await getAdminSchedules();
      scheduleStore.readSchedules(schedulesData || []);
    } catch (error) {
      console.error('스케줄 데이터 로드 실패:', error);
    } finally {
      scheduleStore.setLoading(false);
    }
  }, [scheduleStore]);

  const handleAddSchedule = useCallback(async (data: { date: string; timeSlotId: number }) => {
    scheduleStore.setLoading(true);
    try {
      const newSchedule = await createCounselingSchedule(data);
      
      // 전체 스케줄 목록에 추가
      scheduleStore.createSchedule(newSchedule);
      
      return newSchedule;
    } catch (error) {
      console.error('스케줄 추가 실패:', error);
      throw error;
    } finally {
      scheduleStore.setLoading(false);
    }
  }, [scheduleStore]);

  const handleDeleteSchedule = useCallback(async (scheduleId: number) => {
    scheduleStore.setLoading(true);
    try {
      await deleteCounselingSchedule(scheduleId);
      
      // 전체 스케줄에서 제거
      scheduleStore.deleteSchedule(scheduleId);
      
    } catch (error) {
      console.error('스케줄 삭제 실패:', error);
      throw error;
    } finally {
      scheduleStore.setLoading(false);
    }
  }, [scheduleStore]);

  const fetchSchedulesByDate = useCallback(async (date: string) => {
    try {
      const schedulesData = await getSchedulesByDate(date);
      
      // 기존 스케줄에서 해당 날짜의 스케줄을 제거하고 새로운 데이터로 교체
      const currentSchedules = scheduleStore.schedules;
      
      const filteredSchedules = currentSchedules.filter(schedule => schedule.date !== date);
      const updatedSchedules = [...filteredSchedules, ...(schedulesData || [])];
      
      scheduleStore.readSchedules(updatedSchedules);
      
      return schedulesData;
    } catch (error) {
      console.error('날짜별 스케줄 로드 실패:', error);
      throw error;
    }
  }, [scheduleStore]);

  const fetchSchedulesByMonth = useCallback(async (year: number, month: number) => {
    scheduleStore.setLoading(true);
    try {
      const schedulesData = await getSchedulesByMonth(year, month);
      
      // 해당 월의 스케줄로 전역 상태 업데이트
      scheduleStore.readSchedules(schedulesData || []);
      
      return schedulesData;
    } catch (error) {
      console.error('월별 스케줄 로드 실패:', error);
      throw error;
    } finally {
      scheduleStore.setLoading(false);
    }
  }, [scheduleStore]);

  return {
    fetchReservations,
    fetchAllSchedules,
    fetchSchedulesByDate,
    fetchSchedulesByMonth,
    handleAddSchedule,
    handleDeleteSchedule,
  };
}; 