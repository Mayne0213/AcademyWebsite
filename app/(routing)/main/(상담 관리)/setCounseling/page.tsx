'use client';

import { ScheduleList } from '@/src/features/scheduleCRUD/ui';
import { ReservationRead } from '@/src/features/reservationCRUD/ui';

const CounselingAdminPage = () => {
  return (
    <main>
      <h1 className="font-bold text-2xl tablet:text-3xl mb-4 tablet:mb-6">
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