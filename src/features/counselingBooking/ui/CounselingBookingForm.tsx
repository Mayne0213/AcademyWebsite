'use client';

import { useState, useEffect } from 'react';
import { useCounselingBookingStore } from '../model';
import { AdminSelector } from './AdminSelector';

interface CounselingBookingFormData {
  adminId: number;
  date: Date | null;
  timeSlotId: number | null;
  scheduleId: number | null;
  consultationContent: string;
}

interface CounselingBookingFormProps {
  onSubmit: (data: CounselingBookingFormData) => void;
  loading?: boolean;
}

interface AvailableSchedule {
  scheduleId: number;
  adminId: number;
  date: string;
  timeSlotId: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  timeSlot: {
    timeSlotId: number;
    startTime: string;
    endTime: string;
    displayName: string;
  };
}

interface AdminWithSchedules {
  memberId: number;
  adminName: string;
  adminPosition: string;
  adminPhone: string;
  schedules: AvailableSchedule[];
}

export const CounselingBookingForm = ({ onSubmit, loading = false }: CounselingBookingFormProps) => {
  const { createReservation, isSubmitting, error } = useCounselingBookingStore();
  const [formData, setFormData] = useState<CounselingBookingFormData>({
    adminId: 0,
    date: null,
    timeSlotId: null,
    scheduleId: null,
    consultationContent: '',
  });

  const [availableAdmins, setAvailableAdmins] = useState<AdminWithSchedules[]>([]);
  const [availableSchedules, setAvailableSchedules] = useState<AvailableSchedule[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);

  // 상담사 목록과 스케줄 로드
  useEffect(() => {
    fetchAvailableAdmins();
  }, []);

  const fetchAvailableAdmins = async () => {
    try {
      setIsLoadingAdmins(true);
      const response = await fetch('/api/counseling/admins');
      if (response.ok) {
        const admins = await response.json();
        setAvailableAdmins(admins);
      }
    } catch (error) {
      console.error('상담사 목록 로드 실패:', error);
    } finally {
      setIsLoadingAdmins(false);
    }
  };

  const handleAdminSelect = (adminId: number) => {
    setFormData(prev => ({ 
      ...prev, 
      adminId,
      date: null,
      timeSlotId: null,
      scheduleId: null
    }));

    // 선택된 상담사의 스케줄 가져오기
    const selectedAdmin = availableAdmins.find(admin => admin.memberId === adminId);
    if (selectedAdmin) {
      setAvailableSchedules(selectedAdmin.schedules);
      
      // 가능한 날짜들 추출 (중복 제거) - ISO 날짜를 YYYY-MM-DD 형식으로 변환
      const dates = [...new Set(selectedAdmin.schedules.map(schedule => {
        const date = new Date(schedule.date);
        return date.toISOString().split('T')[0];
      }))];
      setAvailableDates(dates);
    }
  };

  const handleDateSelect = (date: string) => {
    console.log('Selected date:', date);
    const selectedDate = new Date(date);
    console.log('Parsed date:', selectedDate);
    setFormData(prev => ({ 
      ...prev, 
      date: selectedDate,
      timeSlotId: null,
      scheduleId: null
    }));
  };

  const handleTimeSlotSelect = (timeSlotId: number, scheduleId: number) => {
    setFormData(prev => ({ 
      ...prev, 
      timeSlotId,
      scheduleId
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.adminId && formData.date && formData.timeSlotId && formData.scheduleId && formData.consultationContent) {
      try {
        await createReservation({
          adminId: formData.adminId,
          date: formData.date.toISOString().split('T')[0],
          timeSlotId: formData.timeSlotId,
          scheduleId: formData.scheduleId,
          consultationContent: formData.consultationContent
        });
        onSubmit(formData);
      } catch (error) {
        console.error('예약 생성 실패:', error);
      }
    }
  };

  // 선택된 날짜의 가능한 시간대들
  const availableTimeSlots = formData.date 
    ? availableSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        const scheduleDateStr = scheduleDate.toISOString().split('T')[0];
        const selectedDateStr = formData.date!.toISOString().split('T')[0];
        console.log('Comparing dates:', { scheduleDateStr, selectedDateStr, match: scheduleDateStr === selectedDateStr });
        return scheduleDateStr === selectedDateStr;
      })
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold">상담 예약</h2>
      
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* 상담사 선택 */}
      <AdminSelector
        selectedAdminId={formData.adminId || null}
        onAdminSelect={handleAdminSelect}
        availableAdmins={availableAdmins.map(admin => ({
          memberId: admin.memberId,
          adminName: admin.adminName,
          adminPosition: admin.adminPosition,
          adminPhone: admin.adminPhone
        }))}
        isLoadingAdmins={isLoadingAdmins}
      />

      {/* 날짜 선택 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">날짜 선택</h3>
        {formData.adminId ? (
          <div>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={(e) => handleDateSelect(e.target.value)}
              value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
              required
            >
              <option value="">날짜를 선택해주세요</option>
              {availableDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
            상담사를 먼저 선택해주세요
          </div>
        )}
      </div>

      {/* 시간대 선택 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">시간대 선택</h3>
        {formData.date ? (
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e) => {
              const selectedSchedule = availableTimeSlots.find(schedule => schedule.timeSlotId === parseInt(e.target.value));
              if (selectedSchedule) {
                handleTimeSlotSelect(parseInt(e.target.value), selectedSchedule.scheduleId);
              }
            }}
            value={formData.timeSlotId || ''}
            required
          >
            <option value="">시간대를 선택해주세요</option>
            {availableTimeSlots.map(schedule => (
              <option key={schedule.scheduleId} value={schedule.timeSlotId}>
                {schedule.timeSlot.displayName}
              </option>
            ))}
          </select>
        ) : (
          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
            날짜를 먼저 선택해주세요
          </div>
        )}
      </div>

      {/* 상담 내용 */}
      <div>
        <h3 className="text-lg font-semibold mb-3">상담 내용</h3>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg h-32"
          placeholder="상담하고 싶은 내용을 입력해주세요..."
          value={formData.consultationContent}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            consultationContent: e.target.value 
          }))}
          required
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={loading || isSubmitting || !formData.adminId || !formData.date || !formData.timeSlotId || !formData.scheduleId || !formData.consultationContent}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading || isSubmitting ? '예약 중...' : '상담 예약하기'}
      </button>
    </form>
  );
}; 