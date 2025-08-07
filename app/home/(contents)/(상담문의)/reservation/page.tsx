'use client';

import { CounselingBookingForm } from '@/src/features/counselingBooking/ui/CounselingBookingForm';

interface CounselingBookingFormData {
  adminId: number;
  date: Date | null;
  timeSlotId: number | null;
  scheduleId: number | null;
  consultationContent: string;
}

export default function CounselingBookingPage() {
  const handleSubmit = async (data: CounselingBookingFormData) => {
    console.log('상담 예약 데이터:', data);
    alert('STEP1 완료! Admin 선택이 정상적으로 작동합니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            상담 예약
          </h1>
          <p className="text-gray-600">
            상담사 선택부터 시작하여 예약을 완료해주세요.
          </p>
        </div>
        
        <CounselingBookingForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
