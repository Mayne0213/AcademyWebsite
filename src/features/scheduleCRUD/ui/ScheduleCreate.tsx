import { useForm, Controller } from 'react-hook-form';
import { TIME_SLOTS } from '@/src/shared/config';
import { useScheduleCRUDFeatureStore } from '@/src/features/scheduleCRUD/model/store';
import { Modal } from '@/src/shared/ui/Modal';

// 폼 데이터 타입 정의
interface ScheduleFormData {
  date: string;
  timeSlotId: number;
}

interface ScheduleCreateProps {
  selectedDate: string;
  onCancel: () => void;
}

export const ScheduleCreate = ({
  selectedDate,
  onCancel,
}: ScheduleCreateProps) => {
  const { createSchedule } = useScheduleCRUDFeatureStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<ScheduleFormData>({
    defaultValues: {
      date: selectedDate,
      timeSlotId: 0,
    },
    mode: 'onChange'
  });

  const onSubmit = async (data: ScheduleFormData) => {
    try {
      await createSchedule({
        date: data.date,
        timeSlotId: data.timeSlotId
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 tablet:space-y-4">
        <div className="space-y-1 tablet:space-y-2">
          <label className="block font-medium text-gray-700 text-xs tablet:text-sm mb-1 tablet:mb-2">
            날짜
          </label>
          <Controller
            name="date"
            control={control}
            rules={{ required: '날짜를 선택해주세요' }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="date"
                  className="w-full border border-gray-300 rounded-md bg-gray-50 px-2 py-1.5 tablet:px-3 tablet:py-2 text-sm tablet:text-base"
                  min={new Date().toISOString().split('T')[0]}
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">선택된 날짜가 자동으로 설정됩니다.</p>
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>
            )}
          />
        </div>
        
        <div className="space-y-1 tablet:space-y-2">
          <label className="block font-medium text-gray-700 text-xs tablet:text-sm mb-1 tablet:mb-2">
            시간대
          </label>
          <Controller
            name="timeSlotId"
            control={control}
            rules={{
              required: '시간대를 선택해주세요',
              validate: (value) => value > 0 || '시간대를 선택해주세요'
            }}
            render={({ field }) => (
              <div>
                <select
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-2 py-1.5 tablet:px-3 tablet:py-2 text-sm tablet:text-base"
                >
                  <option value="">시간대 선택</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.timeSlotId} value={slot.timeSlotId}>
                      {slot.displayName}
                    </option>
                  ))}
                </select>
                {errors.timeSlotId && (
                  <p className="text-red-500 text-xs mt-1">{errors.timeSlotId.message}</p>
                )}
              </div>
            )}
          />
        </div>
        
        <div className="flex gap-2 justify-end mt-4 tablet:mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors px-3 py-1.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors px-3 py-1.5 tablet:px-4 tablet:py-2 text-sm tablet:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            추가
          </button>
        </div>
      </form>
    </Modal>
  );
}; 