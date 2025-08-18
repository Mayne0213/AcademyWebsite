import { Menu, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/src/app/providers";
import { FORMATS } from "@/src/shared/lib/formats";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdownMenu";

const Navbar = ({ onChange }: { onChange: () => void }) => {


  const { user, logout } = useAuth();
  return (
    <div className="w-full h-[60px] bg-white flex items-center justify-between px-8 border-b shadow-sm fixed top-0 left-0 z-30">
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
          <DropdownMenuItem className="cursor-pointer">
            <span>프로필 수정</span>
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
  );
};

export default Navbar;
