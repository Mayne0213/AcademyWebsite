import { ReservationCreate } from '@/src/features/reservationCRUD/ui';
import DashboardHeader from '@/src/widgets/header/DashboardHeader';

export default function CounselingBookingPage() {
  return (
    <main>
      <DashboardHeader title="상담 예약" description="내신부터 정시까지. 무엇이든 가능합니다." />
      <div className="max-w-6xl mx-auto px-8">
        <ReservationCreate />
      </div>
    </main>
  );
}
