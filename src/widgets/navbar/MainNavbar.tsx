import { Menu } from "lucide-react";
import { useAuth } from "@/src/app/providers";
import { FORMATS } from "@/src/shared/lib/formats";

const Navbar = ({ onChange }: { onChange: () => void }) => {


  const { user } = useAuth();
  return (
    <div className="w-full h-[60px] bg-white flex items-center justify-between px-8 border-b shadow-sm fixed top-0 left-0 z-30">
      <div className="flex items-center">
        <Menu
          className="cursor-pointer block desktop:hidden"
          onClick={onChange}
        />
      </div>
      <div className="text-sm text-gray-700">
        {FORMATS.formatUserDisplayName(user)}님
      </div>
    </div>
  );
};

export default Navbar;
