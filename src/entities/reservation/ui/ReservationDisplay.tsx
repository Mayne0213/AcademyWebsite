"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { CounselingReservation } from "../model/types";
import { getStudentReservations } from "../api/reservationApi";
import { useAuth } from "@/src/app/providers";

interface ReservationDisplayProps {
  className?: string;
}

export function ReservationDisplay({ className = "" }: ReservationDisplayProps) {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<CounselingReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "STUDENT") {
      setIsLoading(false);
      return;
    }

    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getStudentReservations();
        setReservations(data);
      } catch (err) {
        setError("상담 예약 정보를 불러오는데 실패했습니다.");
        console.error("Failed to fetch reservations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  // 학생이 아닌 경우 컴포넌트를 렌더링하지 않음
  if (!user || user.role !== "STUDENT") {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const formatTimeSlot = (timeSlot: any) => {
    if (!timeSlot) return "시간 미정";
    return timeSlot.displayName || `${timeSlot.startTime}-${timeSlot.endTime}`;
  };

  // 로딩 중이거나 예약이 없으면 컴포넌트를 렌더링하지 않음
  if (isLoading || !reservations || reservations.length === 0) {
    return null;
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 mt-4 p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-MaruBuri-Bold text-gray-900">나의 상담 예약</h3>
        </div>
        <a
          href="/dashboard/reservation"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          예약하기 →
        </a>
      </div>

      <div className="space-y-4">
        {reservations.slice(0, 3).map((reservation) => (
          <div
            key={reservation.reservationId}
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">
                    {formatDate(reservation.schedule.date)}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-800">
                    {reservation.admin?.adminName} {reservation.admin?.adminPosition}
                  </span>
                </div>
                <div className="text-xs text-blue-700">
                  시간: {formatTimeSlot(reservation.schedule.timeSlot)}
                </div>
              </div>
              <div className="ml-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            {reservation.consultationContent && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-600 leading-relaxed">
                  &ldquo;{reservation.consultationContent}&rdquo;
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {reservations.length > 3 && (
        <div className="mt-4 text-center">
          <a
            href="/dashboard/reservation"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            더 많은 예약 보기 ({reservations.length - 3}개 더)
          </a>
        </div>
      )}
    </div>
  );
}
