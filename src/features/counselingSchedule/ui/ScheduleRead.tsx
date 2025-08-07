import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { ScheduleItem } from '@/src/entities/counseling/ui/ScheduleItem';
import { useCounselingStore } from '@/src/entities/counseling/model/store';
import { useCounselingScheduleFeatureStore } from '@/src/features/counselingSchedule/model/store';
import { ScheduleCreate } from './ScheduleCreate';
import { toast } from 'sonner';

interface ScheduleReadProps {
  selectedDate: Date | null;
}

export const ScheduleRead = ({
  selectedDate,
}: ScheduleReadProps) => {
  const { schedules } = useCounselingStore();
  const { handleDeleteSchedule } = useCounselingScheduleFeatureStore();
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  
  const selectedDateSchedules = useMemo(() => {
    if (!selectedDate) return [];
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    return schedules.filter(schedule => {
      const scheduleDate = schedule.date.split('T')[0];
      return scheduleDate === dateString;
    });
  }, [selectedDate, schedules]);

  const handleDeleteScheduleWrapper = async (scheduleId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await handleDeleteSchedule(scheduleId);
      toast.success('스케줄이 삭제되었습니다.');
    } catch (error) {
    }
  };

  return (
    <div className="w-full tablet:w-1/2 p-3 tablet:p-4">
      <div className="flex justify-between items-center mb-3 tablet:mb-4">
        <h3 className="font-semibold text-base tablet:text-lg">
          {selectedDate ? format(selectedDate, 'MM월 dd일 (EEEE)', { locale: ko }) : '날짜를 선택해주세요.'}
        </h3>
        {selectedDate && (
          <button onClick={() => setShowAddSchedule(true)} className="bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors px-2 py-1 tablet:px-3 tablet:py-1.5 text-xs tablet:text-sm">
            스케줄 추가
          </button>
        )}
      </div>
      {selectedDateSchedules?.length > 0 ? (
        <div className="space-y-2">
          {selectedDateSchedules?.map((schedule) => (
            <ScheduleItem 
              key={schedule.scheduleId}
              schedule={schedule}
              onDelete={handleDeleteScheduleWrapper}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 h-full flex items-center justify-center">선택한 날짜에 스케줄이 없습니다.</p>
      )}
      
      {showAddSchedule && selectedDate && (
        <ScheduleCreate 
          selectedDate={format(selectedDate, 'yyyy-MM-dd')}
          onCancel={() => setShowAddSchedule(false)}
        />
      )}
    </div>
  );
}; 