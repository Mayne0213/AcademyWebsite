import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useScheduleCRUDFeatureStore } from '@/src/features/scheduleCRUD/model/store';
import { ScheduleCreate } from './ScheduleCreate';
import { ScheduleItem } from '@/src/entities/schedule/ui/ScheduleItem';
import { useScheduleStore } from '@/src/entities/schedule/model/store';

export const ScheduleRead = ({ selectedDate }: { selectedDate: Date | null }) => {
  const { schedules } = useScheduleStore();
  const { deleteSchedule } = useScheduleCRUDFeatureStore();
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);
  
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
      await deleteSchedule(scheduleId);
    } catch (error) {
    }
  };

  return (
    <div className="w-full tablet:w-2/5 p-3 smalltablet:p-4 tablet:p-6 overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-3 smalltablet:mb-4 tablet:mb-6">
        <h3 className="font-semibold text-sm smalltablet:text-base tablet:text-lg">
          {selectedDate ? format(selectedDate, 'MM월 dd일 (EEEE)', { locale: ko }) : '날짜를 선택해주세요.'}
        </h3>
        {selectedDate && (
          <button onClick={() => setShowCreateSchedule(true)} className="bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors px-2 py-1 smalltablet:px-3 smalltablet:py-1.5 tablet:px-4 tablet:py-2 text-xs smalltablet:text-sm tablet:text-base">
            스케줄 추가
          </button>
        )}
      </div>
      {selectedDateSchedules?.length > 0 ? (
        <div className="space-y-2 smalltablet:max-h-[25vh] tablet:max-h-[53vh] overflow-y-auto">
          {selectedDateSchedules?.map((schedule) => (
            <ScheduleItem 
              key={schedule.scheduleId}
              schedule={schedule}
              onDelete={handleDeleteScheduleWrapper}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 h-[20vh] smalltablet:h-[25vh] tablet:h-[30vh] desktop:h-[53vh] flex items-center justify-center text-sm smalltablet:text-base">선택한 날짜에 스케줄이 없습니다.</p>
      )}
      
      {showCreateSchedule && selectedDate && (
        <ScheduleCreate 
          selectedDate={format(selectedDate, 'yyyy-MM-dd')}
          onCancel={() => setShowCreateSchedule(false)}
        />
      )}
    </div>
  );
};