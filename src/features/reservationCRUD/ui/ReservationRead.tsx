"use client";

import { useEffect } from 'react';
import { ReservationItem } from '@/src/entities/reservation/ui/ReservationItem';
import { useReservationStore } from '@/src/entities/reservation/model/store';
import { useScheduleCRUDFeatureStore } from '@/src/features/scheduleCRUD/model/store';
import { CounselingReservation } from '@/src/entities/reservation/model/types';

// 스켈레톤 컴포넌트 정의
const ReservationReadSkeleton = () => (
  <section className="border rounded-lg shadow-sm tablet:col-span-4 flex flex-col">
    <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
      <h2 className="font-semibold text-sm smalltablet:text-base tablet:text-lg">상담 예약 목록</h2>
    </div>
    <div className="flex-1 max-h-[60vh] overflow-y-auto">
      <ul>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="border-b p-3 smalltablet:p-4 tablet:p-5">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export const ReservationRead = () => {
  const { fetchReservations } = useScheduleCRUDFeatureStore();
  const { reservations, isLoading } = useReservationStore();

  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) {
    return <ReservationReadSkeleton />;
  }

  return (
  <section className="border rounded-lg shadow-sm tablet:col-span-4 flex flex-col w-full">
    <div className="border-b bg-gray-50 p-3 smalltablet:p-4 tablet:p-6">
      <h2 className="font-semibold text-sm smalltablet:text-base tablet:text-lg">상담 예약 목록</h2>
    </div>
    <div className="flex-1 max-h-[40vh] smalltablet:max-h-[45vh] tablet:max-h-[50vh] desktop:max-h-[60vh] overflow-y-auto">
      <ul>
        {reservations?.map((reservation: CounselingReservation) => (
          <ReservationItem 
            key={reservation.reservationId}
            reservation={reservation}
          />
        ))}
      </ul>
    </div>
  </section>
  );
};