import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TIME_SLOTS } from '@/src/shared/config';
import { CounselingReservation } from '../model/types';

export const ReservationItem = ({
  reservation,
}: {
  reservation: CounselingReservation;
}) => (
  <li
    className={`border-b p-3 tablet:p-4`}
  >
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h3 className="font-semibold text-base tablet:text-lg">
          {reservation.student.studentName}
        </h3>
        <p className="text-gray-500 text-xs tablet:text-sm">
          {format(new Date(reservation.schedule.date), 'MM월 dd일 (EEEE)', { locale: ko })} 
          {TIME_SLOTS.find(slot => slot.timeSlotId === reservation.schedule.timeSlot.timeSlotId)?.displayName || `${reservation.schedule.timeSlot.timeSlotId}번 시간대`}
        </p>
      </div>
    </div>
  </li>
);
