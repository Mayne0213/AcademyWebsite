'use client';

import { useState } from 'react';
import { CounselingBookingForm } from '@/src/features/counselingBooking/ui/CounselingBookingForm';

interface CounselingBookingFormData {
  adminId: number;
  date: Date | null;
  timeSlotId: number | null;
  scheduleId: number | null;
  consultationContent: string;
}

export default function CounselingBookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (data: CounselingBookingFormData) => {
    try {
      setIsSubmitting(true);
      setMessage(null);
      
      console.log('상담 예약 데이터:', data);
      
      // 실제 API 호출은 CounselingReservationForm에서 처리됨
      // 여기서는 성공 메시지만 표시
      setMessage({
        type: 'success',
        text: '상담 예약이 성공적으로 완료되었습니다! 예약 내역은 대시보드에서 확인하실 수 있습니다.'
      });
      
      // 3초 후 메시지 제거
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      
    } catch (error) {
      console.error('상담 예약 실패:', error);
      setMessage({
        type: 'error',
        text: '상담 예약에 실패했습니다. 다시 시도해주세요.'
      });
    } finally {
      setIsSubmitting(false);
    }
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

        {/* 메시지 표시 */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {message.type === 'success' ? (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}
        
        <CounselingBookingForm 
          onSubmit={handleSubmit} 
          loading={isSubmitting}
        />
      </div>
    </div>
  );
}
