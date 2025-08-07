import { useCallback } from 'react';
import { 
  getAdminReservations, 
  getAdminSchedules, 
  getSchedulesByDate,
  getSchedulesByMonth,
  createCounselingSchedule, 
  deleteCounselingSchedule 
} from '@/src/entities/counseling/api';
import { useCounselingStore } from '@/src/entities/counseling/model/store';

// API 호출과 전역 상태 관리를 통합하는 훅
export const useCounselingScheduleFeatureStore = () => {
  const entityStore = useCounselingStore.getState();

  const fetchReservations = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      // 예약 목록 조회
      const reservationsData = await getAdminReservations();
      entityStore.readReservations(reservationsData || []);
    } catch (error) {
      console.error('예약 데이터 로드 실패:', error);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const fetchAllSchedules = useCallback(async () => {
    entityStore.setLoading(true);
    try {
      // 전체 스케줄 목록 조회
      const schedulesData = await getAdminSchedules();
      entityStore.readSchedules(schedulesData || []);
    } catch (error) {
      console.error('스케줄 데이터 로드 실패:', error);
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const handleAddSchedule = useCallback(async (data: { date: string; timeSlotId: number }) => {
    entityStore.setLoading(true);
    try {
      const newSchedule = await createCounselingSchedule(data);
      
      // 전체 스케줄 목록에 추가
      entityStore.createSchedule(newSchedule);
      
      return newSchedule;
    } catch (error) {
      console.error('스케줄 추가 실패:', error);
      throw error;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const handleDeleteSchedule = useCallback(async (scheduleId: number) => {
    entityStore.setLoading(true);
    try {
      await deleteCounselingSchedule(scheduleId);
      
      // 전체 스케줄에서 제거
      entityStore.deleteSchedule(scheduleId);
      
    } catch (error) {
      console.error('스케줄 삭제 실패:', error);
      throw error;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  const fetchSchedulesByDate = useCallback(async (date: string) => {
    try {
      const schedulesData = await getSchedulesByDate(date);
      
      // 기존 스케줄에서 해당 날짜의 스케줄을 제거하고 새로운 데이터로 교체
      const currentSchedules = entityStore.schedules;
      
      const filteredSchedules = currentSchedules.filter(schedule => schedule.date !== date);
      const updatedSchedules = [...filteredSchedules, ...(schedulesData || [])];
      
      entityStore.readSchedules(updatedSchedules);
      
      return schedulesData;
    } catch (error) {
      console.error('날짜별 스케줄 로드 실패:', error);
      throw error;
    }
  }, [entityStore]);

  const fetchSchedulesByMonth = useCallback(async (year: number, month: number) => {
    entityStore.setLoading(true);
    try {
      const schedulesData = await getSchedulesByMonth(year, month);
      
      // 해당 월의 스케줄로 전역 상태 업데이트
      entityStore.readSchedules(schedulesData || []);
      
      return schedulesData;
    } catch (error) {
      console.error('월별 스케줄 로드 실패:', error);
      throw error;
    } finally {
      entityStore.setLoading(false);
    }
  }, [entityStore]);

  return {
    fetchReservations,
    fetchAllSchedules,
    fetchSchedulesByDate,
    fetchSchedulesByMonth,
    handleAddSchedule,
    handleDeleteSchedule,
  };
}; 