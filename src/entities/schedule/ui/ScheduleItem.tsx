import { TIME_SLOTS } from '@/src/shared/config';
import { CounselingSchedule } from '../model/types';

interface ScheduleItemProps {
  schedule: CounselingSchedule;
  onDelete: (scheduleId: number) => void;
}

export const ScheduleItem = ({
  schedule,
  onDelete,
}: ScheduleItemProps) => {
  // 현재 시간과 스케줄 시간 비교하여 만료 여부 확인
  const isExpired = () => {
    const now = new Date();
    const scheduleDate = new Date(schedule.date);
    const timeSlot = TIME_SLOTS.find(slot => slot.timeSlotId === schedule.timeSlotId);

    if (!timeSlot) return false;

    // 스케줄 날짜와 종료 시간을 결합하여 만료 시간 계산
    const [hours, minutes] = timeSlot.endTime.split(':').map(Number);
    const expirationTime = new Date(scheduleDate);
    expirationTime.setHours(hours, minutes, 0, 0);

    return now > expirationTime;
  };

  const expired = isExpired();

  return (
    <div className={`border rounded-lg p-2 tablet:p-3`}>
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
          <span className={`font-medium px-2 py-1 rounded text-xs tablet:text-sm ${
            expired
              ? 'bg-gray-100 text-gray-800'
              : schedule.isAvailable
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {expired ? '시간 만료' : schedule.isAvailable ? '예약 가능' : '예약됨'}
          </span>
          {!schedule.reservations && !expired && (
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
};
