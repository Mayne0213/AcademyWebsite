'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useReservationCRUDStore } from '../model';
import { AdminSelector } from './AdminSelector';
import { AdminWithSchedules, AvailableSchedule, CreateReservationFormData } from '@/src/entities/reservation/model/types';

// 폼 데이터 타입 정의
interface ReservationFormData {
  adminId: number;
  date: string;
  timeSlotId: number;
  scheduleId: number;
  consultationContent: string;
}

// Step 1: 상담사 선택 컴포넌트
interface Step1AdminSelectionProps {
  control: any;
  watch: any;
  setValue: any;
  availableAdmins: AdminWithSchedules[];
  isLoadingAdmins: boolean;
  errors: any;
}

const Step1AdminSelection = ({
  control,
  watch,
  setValue,
  availableAdmins,
  isLoadingAdmins,
  errors
}: Step1AdminSelectionProps) => {
  const selectedAdminId = watch('adminId');

  const handleAdminSelect = (adminId: number) => {
    setValue('adminId', adminId);
    // 다른 필드들 초기화
    setValue('date', '');
    setValue('timeSlotId', '');
    setValue('scheduleId', '');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">선생님 선택</h3>
      <Controller
        name="adminId"
        control={control}
        rules={{ required: '선생님을 선택해주세요' }}
        render={() => (
          <AdminSelector
            selectedAdminId={selectedAdminId || null}
            onAdminSelect={handleAdminSelect}
            availableAdmins={availableAdmins}
            isLoadingAdmins={isLoadingAdmins}
          />
        )}
      />
    </div>
  );
};

// Step 2: 날짜 선택 컴포넌트
interface Step2DateSelectionProps {
  control: any;
  watch: any;
  setValue: any;
  availableDates: string[];
  errors: any;
}

const Step2DateSelection = ({
  control,
  watch,
  setValue,
  availableDates,
  errors
}: Step2DateSelectionProps) => {
  const selectedAdminId = watch('adminId');
  const selectedDate = watch('date');

  const handleDateSelect = (date: string) => {
    setValue('date', date);
    // 시간대 관련 필드들 초기화
    setValue('timeSlotId', '');
    setValue('scheduleId', '');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">날짜 선택</h3>
      {selectedAdminId ? (
        <Controller
          name="date"
          control={control}
          rules={{ required: '날짜를 선택해주세요' }}
          render={({ field }) => (
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => handleDateSelect(e.target.value)}
                value={selectedDate || ''}
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
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>
          )}
        />
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
  control: any;
  watch: any;
  setValue: any;
  availableTimeSlots: AvailableSchedule[];
  errors: any;
}

const Step3TimeSlotSelection = ({
  control,
  watch,
  setValue,
  availableTimeSlots,
  errors
}: Step3TimeSlotSelectionProps) => {
  const selectedDate = watch('date');
  const selectedTimeSlot = watch('timeSlotId');

  const handleTimeSlotSelect = (timeSlotId: number, scheduleId: number) => {
    setValue('timeSlotId', timeSlotId);
    setValue('scheduleId', scheduleId);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">시간대 선택</h3>
      {selectedDate ? (
        <Controller
          name="timeSlotId"
          control={control}
          rules={{ required: '시간대를 선택해주세요' }}
          render={({ field }) => (
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => {
                  const selectedSchedule = availableTimeSlots.find(schedule => schedule.timeSlotId === parseInt(e.target.value));
                  if (selectedSchedule) {
                    handleTimeSlotSelect(selectedSchedule.timeSlotId, selectedSchedule.scheduleId);
                  }
                }}
                value={selectedTimeSlot || ''}
              >
                <option value="">시간대 선택</option>
                {availableTimeSlots.map(schedule => (
                  <option key={schedule.scheduleId} value={schedule.timeSlotId}>
                    {schedule.timeSlot.displayName}
                  </option>
                ))}
              </select>
              {errors.timeSlotId && (
                <p className="text-red-500 text-sm mt-1">{errors.timeSlotId.message}</p>
              )}
            </div>
          )}
        />
      ) : (
        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
          날짜를 먼저 선택해주세요
        </div>
      )}
    </div>
  );
};

// Step 4: 상담 내용 컴포넌트
interface Step4ConsultationContentProps {
  control: any;
  errors: any;
}

const Step4ConsultationContent = ({ 
  control,
  errors
}: Step4ConsultationContentProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">상담 내용</h3>
      <Controller
        name="consultationContent"
        control={control}
        rules={{
          required: '상담 내용을 입력해주세요',
          minLength: { value: 10, message: '상담 내용은 최소 10자 이상 입력해주세요' }
        }}
        render={({ field }) => (
          <div>
            <textarea
              {...field}
              className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none"
              placeholder="상담하고 싶은 내용을 자세히 작성해주세요"
            />
            {errors.consultationContent && (
              <p className="text-red-500 text-sm mt-1">{errors.consultationContent.message}</p>
            )}
          </div>
        )}
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
  
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<ReservationFormData>({
    defaultValues: {
      adminId: 0,
      date: '',
      timeSlotId: 0,
      scheduleId: 0,
      consultationContent: '',
    },
    mode: 'onChange'
  });

  const [availableSchedules, setAvailableSchedules] = useState<AvailableSchedule[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  // 상담사 목록과 스케줄 로드
  useEffect(() => {
    readAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 선택된 상담사가 변경될 때 스케줄 업데이트
  const selectedAdminId = watch('adminId');

  useEffect(() => {
    if (selectedAdminId) {
      const selectedAdmin = admins.find(admin => admin.memberId === selectedAdminId);
      if (selectedAdmin) {
        setAvailableSchedules(selectedAdmin.schedules);
        
        // 가능한 날짜들 추출 (중복 제거)
        const dates = [...new Set(selectedAdmin.schedules.map(schedule => {
          const date = new Date(schedule.date);
          return date.toISOString().split('T')[0];
        }))];
        setAvailableDates(dates);
      }
    }
  }, [selectedAdminId, admins]);

  // 선택된 날짜의 가능한 시간대들
  const selectedDate = watch('date');
  const availableTimeSlots = selectedDate
    ? availableSchedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        const scheduleDateStr = scheduleDate.toISOString().split('T')[0];
        return scheduleDateStr === selectedDate;
      })
    : [];

  const onSubmit = async (data: ReservationFormData) => {
    try {
      const reservationData: CreateReservationFormData = {
        adminId: data.adminId,
        date: data.date,
        timeSlotId: data.timeSlotId,
        scheduleId: data.scheduleId,
        consultationContent: data.consultationContent
      };

      await createReservation(reservationData);

      // 성공 시 알림 및 페이지 이동
      window.alert('상담 예약이 성공적으로 완료되었습니다! 예약 내역은 대시보드에서 확인하실 수 있습니다.');
      window.location.href = '/dashboard';
    } catch (error) {
      window.alert('상담 예약에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Step 1: 상담사 선택 */}
      <Step1AdminSelection
        control={control}
        watch={watch}
        setValue={setValue}
        availableAdmins={admins}
        isLoadingAdmins={storeLoading}
        errors={errors}
      />

      {/* Step 2: 날짜 선택 */}
      <Step2DateSelection
        control={control}
        watch={watch}
        setValue={setValue}
        availableDates={availableDates}
        errors={errors}
      />

      {/* Step 3: 시간대 선택 */}
      <Step3TimeSlotSelection
        control={control}
        watch={watch}
        setValue={setValue}
        availableTimeSlots={availableTimeSlots}
        errors={errors}
      />

      {/* Step 4: 상담 내용 */}
      <Step4ConsultationContent
        control={control}
        errors={errors}
      />

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '예약 중...' : '상담 예약하기'}
      </button>
    </form>
  );
};