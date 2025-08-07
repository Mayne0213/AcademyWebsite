import { useEffect, useState } from 'react';
import { Calendar } from '@/src/shared/ui/calendar';
import { ScheduleRead } from './ScheduleRead';
import { useCounselingScheduleFeatureStore } from '@/src/features/counselingSchedule/model/store';
import { useCounselingStore } from '@/src/entities/counseling/model/store';

// 스켈레톤 컴포넌트 정의
const SchedulePickerSkeleton = () => (
  <section className="border rounded-lg shadow-sm lg:col-span-6 flex flex-col h-full">
    <div className="border-b bg-gray-50 p-3 tablet:p-4">
      <h2 className="font-semibold text-base tablet:text-lg">상담 스케줄</h2>
    </div>
    <div className="flex flex-col lg:flex-row flex-1">
      <div className="w-full lg:w-3/5 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r flex flex-col">
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl p-3">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
              <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-6 bg-gray-200 rounded animate-pulse text-center text-xs"></div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="aspect-square min-w-[--cell-size] bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5 p-4 lg:p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const SchedulePicker = () => {
  const { fetchSchedulesByMonth } = useCounselingScheduleFeatureStore();
  const { isLoading } = useCounselingStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 컴포넌트 마운트 시 현재 월의 스케줄을 불러옴
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    
    fetchSchedulesByMonth(currentYear, currentMonth);
  }, []);

  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) {
    return <SchedulePickerSkeleton />;
  }

  return (
    <section className="border rounded-lg shadow-sm lg:col-span-6 flex flex-col h-full">
      <div className="border-b bg-gray-50 p-3 tablet:p-4">
        <h2 className="font-semibold text-base tablet:text-lg">상담 스케줄</h2>
      </div>
      <div className="flex flex-col lg:flex-row flex-1">
        <div className="w-full lg:w-3/5 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r flex flex-col">
          <div className="flex-1 flex justify-center">
            <Calendar 
              mode="single"
              selected={selectedDate!}
              onSelect={(date) => setSelectedDate(date!)}
              onMonthChange={(date) => {
                fetchSchedulesByMonth(date.getFullYear(),  date.getMonth() + 1);
              }}
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
            />
          </div>
        </div>
        <ScheduleRead selectedDate={selectedDate}/>
      </div>
    </section>
  );
}; 