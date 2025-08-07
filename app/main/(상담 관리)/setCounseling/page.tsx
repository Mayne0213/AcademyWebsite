'use client';

import { SchedulePicker, ReservationRead } from '@/src/features/counselingSchedule/ui';

const CounselingAdminPage = () => {
  return (
    <main className="min-h-[calc(100vh-100px)] rounded-lg bg-white text-gray-800 p-4 tablet:p-6">
      <h1 className="font-bold text-2xl tablet:text-3xl mb-4 tablet:mb-6">
        📅 상담 관리
      </h1>
      <div className="grid grid-cols-1 gap-4 tablet:gap-6 lg:gap-8 lg:grid-cols-10">
        <SchedulePicker />
        <ReservationRead />
      </div>
    </main>
  );
};

export default CounselingAdminPage;