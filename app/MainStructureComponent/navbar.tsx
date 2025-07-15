import { MailCheck } from "lucide-react";
import { useAuth } from "@/contexts/authContexts";
import { Power, PowerCircle, LogOut } from "lucide-react";
import DeviceType from "@/components/home/deviceType";

interface NavbarProps {
  deviceCondition: DeviceType | null;
  onChange: () => void;
}

const Navbar = ({ deviceCondition, onChange }: NavbarProps) => {
  const { user } = useAuth();
  return (
    <div className="w-full h-[60px] bg-white flex items-center px-8 border-b gap-4 shadow-sm">
      <MailCheck
        className={`${deviceCondition === DeviceType.DESKTOP ? "hidden" : ""} cursor-pointer`}
        onClick={onChange}
      />
      <div className="ml-auto flex items-center gap-4">
        <div className="text-sm text-gray-700 flex items-center gap-2">
          <span
            onClick={() => {
              console.log(user?.userId);
            }}
          >
            {user?.name}님
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
