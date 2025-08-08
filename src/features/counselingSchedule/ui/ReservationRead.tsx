
import { useEffect } from 'react';
import { ReservationItem } from '@/src/entities/counseling/ui/ReservationItem';
import { useCounselingStore } from '@/src/entities/counseling/model/store';
import { useCounselingScheduleFeatureStore } from '@/src/features/counselingSchedule/model/store';
import { CounselingReservation } from '@/src/entities/counseling/model/types';

// 스켈레톤 컴포넌트 정의
const ReservationReadSkeleton = () => (
  <section className="border rounded-lg shadow-sm lg:col-span-4 flex flex-col">
    <div className="border-b bg-gray-50 p-3 tablet:p-4">
      <h2 className="font-semibold text-base tablet:text-lg">상담 예약 목록</h2>
    </div>
    <div className="flex-1">
      <ul>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="border-b p-3 tablet:p-4">
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
  const { fetchReservations } = useCounselingScheduleFeatureStore();
  const { reservations, isLoading } = useCounselingStore();

  useEffect(() => {
    fetchReservations();
  }, []);

  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) {
    return <ReservationReadSkeleton />;
  }

  return (
  <section className="border rounded-lg shadow-sm lg:col-span-4 flex flex-col">
    <div className="border-b bg-gray-50 p-3 tablet:p-4">
      <h2 className="font-semibold text-base tablet:text-lg">상담 예약 목록</h2>
    </div>
    <div className="flex-1">
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