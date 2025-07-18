import Image from "next/image";
import icon from "@/public/OasisNoRectangle.webp";
import Link from "next/link";
import tabs from "@/components/main/tabs";
import { useAuth } from "@/contexts/authContexts";
import DeviceType from "@/components/home/deviceType";

interface SidebarProps {
  deviceCondition: DeviceType | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ deviceCondition, isOpen, onClose }: SidebarProps) => {
  const isNotPC = deviceCondition !== null && deviceCondition < DeviceType.DESKTOP;
  const { logout } = useAuth();

  if (isNotPC && !isOpen) return null;

  return (
    <>
      {isNotPC && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`bg-white z-50 w-[300px] ${
          isNotPC ? "fixed top-0 left-0 h-full" : ""
        }`}
        style={{ overflowY: "auto" }}
      >
        <div className="flex justify-between h-[60px] items-center p-4 top-0 bg-white z-10">
          <Link href="/main">
            <Image src={icon} alt="logo" width={100} height={100} />
          </Link>
          {isNotPC && (
            <button
              aria-label="Close sidebar"
              onClick={onClose}
              className="text-2xl"
            >
              ✕
            </button>
          )}
        </div>

        <div className="p-6">
          {tabs.map((tab, index) => (
            <div key={index}>
              <div className="font-sansKR-Light text-xs py-4 text-gray-700">
                {tab.label}
              </div>

              {tab.submenu.map((subtabs, index2) => {
                if (subtabs.href === "logout") {
                  return (
                    <button
                      key={index2}
                      onClick={logout}
                      className="flex items-center pb-4 text-gray-500 hover:text-blue-300 transition-all duration-200 w-full"
                    >
                      <subtabs.icon
                        className="mr-2 items-center justify-center flex"
                        size={20}
                      />
                      <span>{subtabs.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={index2}
                    href={subtabs.href}
                    className="flex items-center pb-4 text-gray-500 hover:text-blue-300 transition-all duration-200"
                  >
                    <subtabs.icon
                      className="mr-2 items-center justify-center flex"
                      size={20}
                    />
                    <span>{subtabs.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
