"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";
import { useQnABoardStore } from "@/src/entities/qna/model/store";
import { useQnAFeatureStore } from "@/src/features/qnaCRUD";
import { useAuth } from "@/src/app/providers";
import Link from "next/link";
import { FORMATS } from "@/src/shared/lib/formats";
import { SUBTITLES } from "@/src/shared/config";
import DashboardFooter from "@/src/widgets/footer/DashboardFooter";
import { Announcement } from "@/src/entities/announcement/model/types";
import { ReservationCard } from "@/src/entities/reservation/ui";

// 공통 게시판 컴포넌트
const DashboardBoard = ({
  title,
  href,
  items,
  isLoading,
  getTitle,
  getDate
}: {
  title: string;
  href: string;
  items: any[];
  isLoading: boolean;
  getTitle: (item: any) => string;
  getDate: (item: any) => Date;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-MaruBuri-Bold text-gray-900">
          {title}
        </h3>
        <a
          href={href}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          전체보기 →
        </a>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="py-3 border-b border-gray-50 last:border-b-0 -mx-2 px-2 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <div
                    className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"
                    style={{ width: `${Math.random() * 30 + 60}%` }}
                  />
                </div>
                <div className="h-3 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : !items || items.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">등록된 항목이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.slice(0, 4).map((item, index) => (
            <Link
              key={index}
              href={href}
              className="py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-25 -mx-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer block"
            >
              <div className="flex justify-between items-start">
                <div className="text-sm text-gray-900 flex-1 pr-2 truncate">
                  {getTitle(item)}
                </div>
                <div className="text-xs text-gray-500 whitespace-nowrap">
                  {getDate(item).toLocaleDateString("ko-KR")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { qnas, isLoading: isQnaLoading } = useQnABoardStore();
  const { readAnnouncements } = useAnnouncementFeatureStore();
  const { readQnAs, readPersonalQnAs } = useQnAFeatureStore();

  // 대시보드 전용 임시 상태
  const [dashboardAnnouncements, setDashboardAnnouncements] = useState<Announcement[]>([]);
  const [dashboardAssets, setDashboardAssets] = useState<Announcement[]>([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [randomSubtitle, setRandomSubtitle] = useState<string>("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * SUBTITLES.length);
    setRandomSubtitle(SUBTITLES[randomIndex]);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 로딩 중이거나 user가 없으면 대기
    if (isAuthLoading || !user?.memberId) return;

    // 공지사항과 자료실을 각각 별도로 로드
    const loadDashboardData = async () => {
      try {
        // 공지사항 로드 (isAssetOnly = false)
        setIsLoadingAnnouncements(true);
        const announcementResult = await readAnnouncements(1, 4, false);
        setDashboardAnnouncements(announcementResult.announcements);
        setIsLoadingAnnouncements(false);

        // 자료실 로드 (isAssetOnly = true)
        setIsLoadingAssets(true);
        const assetResult = await readAnnouncements(1, 4, true);
        setDashboardAssets(assetResult.announcements);
        setIsLoadingAssets(false);
      } catch (error) {
        setIsLoadingAnnouncements(false);
        setIsLoadingAssets(false);
      }
    };

    loadDashboardData();

    if (user.role === "ADMIN" || user.role === "DEVELOPER") {
      readQnAs();
    } else {
      readPersonalQnAs();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthLoading, user?.memberId]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            {/* Teacher Profile */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {isAuthLoading || !user
                  ? "로딩 중..."
                  : `${FORMATS.formatUserDisplayName(user)}님`}
              </h2>
              <p className="font-MaruBuri-Regular text-lg text-gray-600 mx-auto">
                {randomSubtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 space-y-8 mt-4">
        <ReservationCard />
        <div className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-8">
          {/* 공지사항 */}
          <DashboardBoard
            title="공지사항"
            href="/dashboard/announcement"
            items={dashboardAnnouncements}
            isLoading={isLoadingAnnouncements}
            getTitle={(item: Announcement) => item.announcementTitle}
            getDate={(item: Announcement) => new Date(item.updatedAt)}
          />

          {/* 자료실 */}
          <DashboardBoard
            title="자료실"
            href="/dashboard/asset"
            items={dashboardAssets}
            isLoading={isLoadingAssets}
            getTitle={(item: Announcement) => item.announcementTitle}
            getDate={(item: Announcement) => new Date(item.updatedAt)}
          />

          {/* 질문 게시판 */}
          <DashboardBoard
            title="질문 게시판"
            href="/dashboard/qna"
            items={qnas}
            isLoading={isQnaLoading}
            getTitle={(item: any) => item.qnaTitle}
            getDate={(item: any) => new Date(item.updatedAt)}
          />
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}
