"use client";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useAnnouncementStore } from "@/src/entities/announcement/model/store";
import { useAnnouncementFeatureStore } from "@/src/features/announcementCRUD/model/store";
import { useQna } from "@/components/hooks/useQna";
import { useAuth } from "@/src/app/providers";
import Link from "next/link";
import { FORMATS } from "@/src/shared/lib/formats";
import DashboardFooter from "@/src/widgets/footer/DashboardFooter";
import { Announcement } from "@/src/entities/announcement/model/types";
import { ReservationDisplay } from "@/src/entities/reservation/ui";

export default function Dashboard() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isLoading } = useAnnouncementStore();
  const { readAnnouncements } = useAnnouncementFeatureStore();
  const { Qnas, loadInitialPersonalQna, loadInitialQna } = useQna();

  // 대시보드 전용 임시 상태
  const [dashboardAnnouncements, setDashboardAnnouncements] = useState<Announcement[]>([]);
  const [dashboardAssets, setDashboardAssets] = useState<Announcement[]>([]);
  const [isLoadingAnnouncements, setIsLoadingAnnouncements] = useState(true);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);

  const subTitles = [
    "너의 오늘이 내일의 성과로 이어질 거야. 매 순간을 소중히 여기고, 끝까지 밀고 나가자!",
    "어떤 어려움이 와도 결국 너의 노력은 반드시 빛을 볼 거야. 계속 나아가자!",
    "작은 진전이라도 매일 꾸준히 나아가는 너에게 박수를 보내. 결국 큰 성과가 될 거야.",
    "지금까지 잘 해왔듯이, 앞으로도 절대 포기하지 마. 너의 노력은 결국 결실을 맺을 거야.",
    "오늘의 힘듦이 내일의 큰 성취로 바뀔 거야. 끝까지 너 자신을 믿고 가자!",
    "너는 그 누구보다 강하고, 지금까지도 잘 해왔어. 조금만 더 힘내면 빛을 볼 날이 올 거야!",
    "실패는 성공의 일부야. 그걸 겪고 있는 너는 이미 성장 중이야.",
    "완벽하지 않아도 괜찬아. 지금 최선을 다하고 있다는 게 가장 중요해.",
    "긴 터널 끝엔 반드시 빛이 있어. 너는 그 끝을 향해 잘 가고 있어.",
    "매일 쌓이는 작은 노력들이 결국 너를 원하는 곳으로 데려다줄 거야.",
    "비교하지 마. 너만의 속도로, 너만의 길을 가고 있는 중이야.",
    "포기하고 싶은 순간이 가장 성장하는 순간이기도 해. 조금만 더 가보자!",
    "지금 버티는 너는 그 자체로도 대단해. 스스로를 꼭 칭찬해줘.",
    "하루하루가 쌓여서 기적이 돼. 오늘도 그 기적의 일부야.",
    "무언가를 시도했다는 것 자체가 이미 큰 용기야. 너는 잘하고 있어.",
    "노력은 절대 배신하지 않아. 다만 때로는 시간이 조금 더 걸릴 뿐이야.",
  ];

  // 컴포넌트 함수 안에서 바로 랜덤 선택
  const randomSubtitle = subTitles[Math.floor(Math.random() * subTitles.length)];

  const [subTitle, setSubTitle] = useState<string>("");

  useEffect(() => {
    setSubTitle(randomSubtitle);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user?.memberId) return;

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
      loadInitialQna();
    } else {
      loadInitialPersonalQna();
    }
  }, [readAnnouncements, loadInitialQna, loadInitialPersonalQna, user?.memberId, user?.role]);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            {/* Teacher Profile */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-sm">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {isAuthLoading || !user
                  ? "로딩 중..."
                  : `${FORMATS.formatUserDisplayName(user)}님`}
              </h2>
              <p className="font-MaruBuri-Regular text-lg text-gray-600 mx-auto">
                {subTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 예약 정보 섹션 - subTitle 아래에 표시 */}
      {user?.role === "STUDENT" && (
        <div className="max-w-6xl mx-auto px-6">
          <ReservationDisplay />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 min-h-scren">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 공지사항 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-MaruBuri-Bold text-gray-900">
                공지사항
              </h3>
              <a
                href="/dashboard/announcement"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                전체보기 →
              </a>
            </div>

            {isLoadingAnnouncements ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="py-3 border-b border-gray-50 last:border-b-0 -mx-2 px-2 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      {/* 제목 스켈레톤 */}
                      <div className="flex-1 pr-2">
                        <div
                          className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"
                          style={{ width: `${Math.random() * 30 + 60}%` }}
                        />
                      </div>

                      {/* 날짜 스켈레톤 */}
                      <div className="h-3 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !dashboardAnnouncements || dashboardAnnouncements.length === 0 ? (
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
                <p className="text-gray-400 text-sm">
                  등록된 공지사항이 없습니다.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {dashboardAnnouncements.slice(0, 4).map((item, index) => (
                  <Link
                    key={index}
                    href={`/dashboard/announcement`}
                    className="py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-25 -mx-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer block"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-900 flex-1 pr-2 truncate">
                        {item.announcementTitle}
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(item.updatedAt).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 자료실 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-MaruBuri-Bold text-gray-900">
                자료실
              </h3>
              <a
                href="/dashboard/asset"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                전체보기 →
              </a>
            </div>
            {isLoadingAssets ? (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="py-3 border-b border-gray-50 last:border-b-0 -mx-2 px-2 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      {/* 제목 스켈레톤 */}
                      <div className="flex-1 pr-2">
                        <div
                          className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"
                          style={{ width: `${Math.random() * 30 + 60}%` }}
                        />
                      </div>

                      {/* 날짜 스켈레톤 */}
                      <div className="h-3 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !dashboardAssets || dashboardAssets.length === 0 ? (
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
                <p className="text-gray-400 text-sm">등록된 자료가 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dashboardAssets.slice(0, 4).map((item, index) => (
                  <Link
                    key={index}
                    href={`/dashboard/assets`}
                    className="py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-25 -mx-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer block"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-900 flex-1 pr-2 truncate">
                        {item.announcementTitle}
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(item.updatedAt).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 질문 게시판 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-MaruBuri-Bold text-gray-900">
                질문 게시판
              </h3>
              <a
                href="/dashboard/qnaBoard"
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
                      {/* 제목 스켈레톤 */}
                      <div className="flex-1 pr-2">
                        <div
                          className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"
                          style={{ width: `${Math.random() * 30 + 60}%` }}
                        />
                      </div>

                      {/* 날짜 스켈레톤 */}
                      <div className="h-3 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !Qnas || Qnas.length === 0 ? (
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
                <p className="text-gray-400 text-sm">자신이 올린 질문만 표시됩니다.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Qnas.slice(0, 4).map((item, index) => (
                  <Link
                    key={index}
                    href={`/dashboard/qnaBoard`}
                    className="py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-25 -mx-2 px-2 rounded-lg transition-colors duration-200 cursor-pointer block"
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-sm text-gray-900 flex-1 pr-2 truncate">
                        {item.qnaTitle}
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(item.updatedAt).toLocaleDateString("ko-KR")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}
