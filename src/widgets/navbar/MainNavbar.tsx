import { Menu, User, LogOut, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/src/app/providers";
import { FORMATS } from "@/src/shared/lib/formats";
import { Avatar, AvatarFallback } from "@/src/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdownMenu";
import { Modal } from "@/src/shared/ui/Modal";
import { AdminUpdate } from "@/src/entities/admin/ui/AdminUpdate";
import { adminApi } from '@/src/entities/admin/api';
import { Admin } from '@/src/entities/admin/model/types';

const Navbar = ({ onChange }: { onChange: () => void }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

  const { user, logout } = useAuth();

  // 프로필 모달이 열릴 때 현재 사용자의 admin 정보 로드
  const handleProfileModalOpen = async () => {
    if (user && user.memberId) {
      setIsLoadingAdmin(true);
      try {
        const adminInfo = await adminApi.getAdmin(user.memberId);
        setCurrentAdmin(adminInfo);
        setIsProfileModalOpen(true);
      } catch (error) {
        console.error("관리자 정보 로드 실패:", error);
      } finally {
        setIsLoadingAdmin(false);
      }
    }
  };

  return (
    <>
      <div className="w-full h-[60px] bg-white flex items-center justify-between px-8 border-b shadow-sm fixed top-0 left-0 z-10">
        <div className="flex items-center">
          <Menu
            className="cursor-pointer block desktop:hidden"
            onClick={onChange}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-500 text-white text-sm font-sansKR-Bold">
                  {FORMATS.formatUserDisplayName(user)?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-full flex flex-col font-sansKR-SemiBold text-end items-end justify-end">
            <DropdownMenuItem className="cursor-pointer" onClick={handleProfileModalOpen} disabled={isLoadingAdmin}>
              <span>{isLoadingAdmin ? "로딩 중..." : "프로필 수정"}</span>
              <User className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => {
              logout();
            }}>
              <span>로그아웃</span>
              <LogOut className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 프로필 수정 모달 */}
      {currentAdmin && (
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => {
            setIsProfileModalOpen(false);
            setCurrentAdmin(null);
          }}
          title="프로필 수정"
          size="lg"
        >
          <AdminUpdate
            admin={currentAdmin}
            onSuccess={() => {
              setIsProfileModalOpen(false);
              setCurrentAdmin(null);
              // 성공 알림 등 필요한 처리
            }}
            onClose={() => {
              setIsProfileModalOpen(false);
              setCurrentAdmin(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
