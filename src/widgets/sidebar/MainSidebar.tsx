import Image from "next/image";
import icon from "@/public/OasisNoRectangle.webp";
import Link from "next/link";
import tabs from "@/src/widgets/sidebar/model/MainSidebarTabs";
import { useAuth } from "@/src/app/providers";
import DeviceType from "@/src/shared/lib/deviceType";

interface SidebarProps {
  deviceCondition: DeviceType | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ deviceCondition, isOpen, onClose }: SidebarProps) => {
  const isMobile = deviceCondition !== null && deviceCondition !== DeviceType.DESKTOP;
  const { logout } = useAuth();

  // 모바일에서 사이드바가 닫혀있으면 렌더링하지 않음
  if (isMobile && !isOpen) return null;

  return (
    <>
      {/* 모바일용 오버레이 */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* 사이드바 컨테이너 */}
      <div
        className="bg-white z-50 w-[250px] fixed top-0 left-0 h-full overflow-y-scroll scrollbar-hide"
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none'  /* Internet Explorer 10+ */
        }}
      >
        {/* 헤더 */}
        <SidebarHeader isMobile={isMobile} onClose={onClose} />

        {/* 메뉴 목록 */}
        <SidebarMenu logout={logout} />
      </div>
    </>
  );
};

// 헤더 컴포넌트
const SidebarHeader = ({ isMobile, onClose }: { isMobile: boolean; onClose: () => void }) => (
  <div className="flex justify-between h-[60px] items-center p-3 top-0 bg-white z-10">
    <Link href="/main">
      <Image src={icon} alt="logo" width={100} height={100} />
    </Link>
    {isMobile && (
      <button
        aria-label="Close sidebar"
        onClick={onClose}
        className="text-2xl hover:text-gray-600 transition-colors"
      >
        ✕
      </button>
    )}
  </div>
);

// 메뉴 컴포넌트
const SidebarMenu = ({ logout }: { logout: () => void }) => (
  <div className="p-4">
    {tabs.map((tab, index) => (
      <div key={index}>
        <div className="font-sansKR-Light text-xs py-4 text-gray-700">
          {tab.label}
        </div>

        {tab.submenu.map((subtab, index2) => (
          <MenuItem key={index2} subtab={subtab} logout={logout} />
        ))}
      </div>
    ))}
  </div>
);

// 개별 메뉴 아이템 컴포넌트
const MenuItem = ({
  subtab,
  logout
}: {
  subtab: any;
  logout: () => void;
}) => {
  const isLogout = subtab.href === "logout";

  const commonClasses = "flex items-center pb-4 text-gray-500 hover:text-blue-300 transition-all duration-200";

  if (isLogout) {
    return (
      <button
        onClick={logout}
        className={`${commonClasses} w-full`}
      >
        <subtab.icon
          className="mr-2 items-center justify-center flex"
          size={20}
        />
        <span>{subtab.label}</span>
      </button>
    );
  }

  return (
    <Link href={subtab.href} className={commonClasses}>
      <subtab.icon
        className="mr-2 items-center justify-center flex"
        size={20}
      />
      <span>{subtab.label}</span>
    </Link>
  );
};

export default Sidebar;
