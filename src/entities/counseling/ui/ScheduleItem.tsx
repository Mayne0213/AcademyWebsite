import { TIME_SLOTS } from '@/src/shared/config';
import { CounselingSchedule } from '../model/types';

interface ScheduleItemProps {
  schedule: CounselingSchedule;
  onDelete: (scheduleId: number) => void;
}

export const ScheduleItem = ({
  schedule,
  onDelete,
}: ScheduleItemProps) => (
  <div className={`border rounded-lg p-2 tablet:p-3`} >
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h5 className="font-medium text-sm tablet:text-base">
          {TIME_SLOTS.find(slot => slot.timeSlotId === schedule.timeSlotId)?.displayName || `${schedule.timeSlotId}번 시간대`}
        </h5>
        <p className="text-gray-500 text-xs tablet:text-sm">
          {schedule.reservations?.student?.studentName ?
            `예약: ${schedule.reservations.student.studentName}` :
            '예약 없음'
          }
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`font-medium px-2 py-1 rounded text-xs tablet:text-sm ${schedule.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {schedule.isAvailable ? '예약 가능' : '예약됨'}
        </span>
        {!schedule.reservations && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(schedule.scheduleId);
            }}
            className="text-red-600 hover:text-red-800 text-xs tablet:text-sm"
          >
            삭제
          </button>
        )}
      </div>
    </div>
  </div>
); 