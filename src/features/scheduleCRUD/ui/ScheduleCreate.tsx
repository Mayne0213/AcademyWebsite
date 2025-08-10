import { useState } from 'react';
import { TIME_SLOTS } from '@/src/shared/config';
import { useScheduleCRUDFeatureStore } from '@/src/features/scheduleCRUD/model/store';
import { Modal } from '@/src/shared/ui/Modal';

interface ScheduleCreateProps {
  selectedDate: string;
  onCancel: () => void;
}

export const ScheduleCreate = ({
  selectedDate,
  onCancel,
}: ScheduleCreateProps) => {
  const { createSchedule } = useScheduleCRUDFeatureStore();
  const [newScheduleDate, setNewScheduleDate] = useState(selectedDate);
  const [newScheduleTimeSlot, setNewScheduleTimeSlot] = useState<number | null>(null);

  const handleAdd = async () => {
    if (!newScheduleDate || !newScheduleTimeSlot) {
      return;
    }
    
    try {
      await createSchedule({
        date: newScheduleDate,
        timeSlotId: newScheduleTimeSlot
      });
      
      onCancel();
    } catch (error) {
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      title="스케줄 추가"
      size="sm"
    >
      <div className="space-y-3 tablet:space-y-4">
        <div className="space-y-1 tablet:space-y-2">
          <label className="block font-medium text-gray-700 text-xs tablet:text-sm mb-1 tablet:mb-2">날짜</label>
          <input
            type="date"
            value={newScheduleDate}
            onChange={(e) => setNewScheduleDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md bg-gray-50 px-2 py-1.5 tablet:px-3 tablet:py-2 text-sm tablet:text-base"
            min={new Date().toISOString().split('T')[0]}
            disabled
          />
          <p className="text-xs text-gray-500 mt-1">선택된 날짜가 자동으로 설정됩니다.</p>
        </div>
        
        <div className="space-y-1 tablet:space-y-2">
          <label className="block font-medium text-gray-700 text-xs tablet:text-sm mb-1 tablet:mb-2">시간대</label>
          <select
            value={newScheduleTimeSlot || ''}
            onChange={(e) => setNewScheduleTimeSlot(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-2 py-1.5 tablet:px-3 tablet:py-2 text-sm tablet:text-base"
          >
            <option value="">시간대 선택</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot.timeSlotId} value={slot.timeSlotId}>
                {slot.displayName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2 justify-end mt-4 tablet:mt-6">
          <button onClick={onCancel} className="bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors px-3 py-1.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base">
            취소
          </button>
          <button onClick={handleAdd} className="bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors px-3 py-1.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base">
            추가
          </button>
        </div>
      </div>
    </Modal>
  );
}; 