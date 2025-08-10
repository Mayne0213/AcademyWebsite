'use client';

import { ScheduleList } from '@/src/features/scheduleCRUD/ui';
import { ReservationRead } from '@/src/features/reservationCRUD/ui';

const CounselingAdminPage = () => {
  return (
    <main className="h-full flex flex-col p-4">
      <h1 className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-Bold mb-4">
        📅 상담 관리
      </h1>
      <div className="grid grid-cols-1 gap-4 tablet:gap-6 desktop:gap-8 desktop:grid-cols-10 desktop:h-[70vh]">
        <ScheduleList />
        <ReservationRead />
      </div>
    </main>
  );
};

export default CounselingAdminPage;