'use client';

import { useState, useEffect } from 'react';
import { useReservationCRUDStore } from '../model';
import { AdminSelector } from './AdminSelector';
import { AdminWithSchedules, AvailableSchedule, CreateReservationFormData, CounselingBookingFormData } from '@/src/entities/reservation/model/types';

// Step 1: 상담사 선택 컴포넌트
interface Step1AdminSelectionProps {
  formData: CounselingBookingFormData;
  availableAdmins: AdminWithSchedules[];
  isLoadingAdmins: boolean;
  onAdminSelect: (adminId: number) => void;
}

const Step1AdminSelection = ({ 
  formData, 
  availableAdmins, 
  isLoadingAdmins, 
  onAdminSelect 
}: Step1AdminSelectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">선생님 선택</h3>
      <AdminSelector
        selectedAdminId={formData.adminId || null}
        onAdminSelect={onAdminSelect}
        availableAdmins={availableAdmins}
        isLoadingAdmins={isLoadingAdmins}
      />
    </div>
  );
};

// Step 2: 날짜 선택 컴포넌트
interface Step2DateSelectionProps {
  formData: CounselingBookingFormData;
  availableDates: string[];
  onDateSelect: (date: string) => void;
}

const Step2DateSelection = ({ 
  formData, 
  availableDates, 
  onDateSelect 
}: Step2DateSelectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">날짜 선택</h3>
      {formData.adminId ? (
        <div>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={(e) => onDateSelect(e.target.value)}
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
          선생님을 먼저 선택해주세요
        </div>
      )}
    </div>
  );
};

// Step 3: 시간대 선택 컴포넌트
interface Step3TimeSlotSelectionProps {
  formData: CounselingBookingFormData;
  availableTimeSlots: AvailableSchedule[];
  onTimeSlotSelect: (timeSlotId: number, scheduleId: number) => void;
}

const Step3TimeSlotSelection = ({ 
  formData, 
  availableTimeSlots, 
  onTimeSlotSelect 
}: Step3TimeSlotSelectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">시간대 선택</h3>
      {formData.date ? (
        <select
          className="w-full p-3 border border-gray-300 rounded-lg"
          onChange={(e) => {
            const selectedSchedule = availableTimeSlots.find(schedule => schedule.timeSlotId === parseInt(e.target.value));
            if (selectedSchedule) {
              onTimeSlotSelect(parseInt(e.target.value), selectedSchedule.scheduleId);
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
  );
};

// Step 4: 상담 내용 입력 컴포넌트
interface Step4ConsultationContentProps {
  formData: CounselingBookingFormData;
  onContentChange: (content: string) => void;
}

const Step4ConsultationContent = ({ 
  formData, 
  onContentChange 
}: Step4ConsultationContentProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">상담 내용</h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg h-32"
        placeholder="상담하고 싶은 내용을 입력해주세요..."
        value={formData.consultationContent}
        onChange={(e) => onContentChange(e.target.value)}
        required
      />
    </div>
  );
};

export const ReservationCreate = () => {
  const { 
    createReservation, 
    isSubmitting, 
    isLoading: storeLoading,
    readAdmins,
    admins
  } = useReservationCRUDStore();
  
  const [formData, setFormData] = useState<CounselingBookingFormData>({
    adminId: 0,
    date: null,
    timeSlotId: null,
    scheduleId: null,
    consultationContent: '',
  });

  const [availableSchedules, setAvailableSchedules] = useState<AvailableSchedule[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // 상담사 목록과 스케줄 로드
  useEffect(() => {
    readAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdminSelect = (adminId: number) => {
    setFormData(prev => ({ 
      ...prev, 
      adminId,
      date: null,
      timeSlotId: null,
      scheduleId: null
    }));

    // 선택된 상담사의 스케줄 가져오기
    const selectedAdmin = admins.find(admin => admin.memberId === adminId);
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
    const selectedDate = new Date(date);
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

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ 
      ...prev, 
      consultationContent: content 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.adminId && formData.date && formData.timeSlotId && formData.scheduleId && formData.consultationContent) {
      try {
        const reservationData: CreateReservationFormData = {
          adminId: formData.adminId,
          date: formData.date.toISOString().split('T')[0],
          timeSlotId: formData.timeSlotId!,
          scheduleId: formData.scheduleId!,
          consultationContent: formData.consultationContent
        };
        await createReservation(reservationData);
        
        // 성공 시 알림 및 페이지 이동
        window.alert('상담 예약이 성공적으로 완료되었습니다! 예약 내역은 대시보드에서 확인하실 수 있습니다.');
        window.location.href = '/dashboard';
      } catch (error) {
        window.alert('상담 예약에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  // 선택된 날짜의 가능한 시간대들
  const availableTimeSlots = formData.date 
    ? availableSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        const scheduleDateStr = scheduleDate.toISOString().split('T')[0];
        const selectedDateStr = formData.date!.toISOString().split('T')[0];
        return scheduleDateStr === selectedDateStr;
      })
    : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: 상담사 선택 */}
      <Step1AdminSelection
        formData={formData}
        availableAdmins={admins}
        isLoadingAdmins={storeLoading}
        onAdminSelect={handleAdminSelect}
      />

      {/* Step 2: 날짜 선택 */}
      <Step2DateSelection
        formData={formData}
        availableDates={availableDates}
        onDateSelect={handleDateSelect}
      />

      {/* Step 3: 시간대 선택 */}
      <Step3TimeSlotSelection
        formData={formData}
        availableTimeSlots={availableTimeSlots}
        onTimeSlotSelect={handleTimeSlotSelect}
      />

      {/* Step 4: 상담 내용 */}
      <Step4ConsultationContent
        formData={formData}
        onContentChange={handleContentChange}
      />

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting || !formData.adminId || !formData.date || !formData.timeSlotId || !formData.scheduleId || !formData.consultationContent}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '예약 중...' : '상담 예약하기'}
      </button>
    </form>
  );
};