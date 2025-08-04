"use client";

import { User, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdownMenu";
import { useRouter } from "next/navigation";

interface AttendanceItemProps {
  user: any;
  status: string;
  onStatusChange: (
    studentId: number,
    studentName: string,
    currentStatus: string,
    newStatus: string,
  ) => void;
  onAllChangeToAttend: () => void;
}

const AttendanceItem = ({
  user,
  status,
  onStatusChange,
}: AttendanceItemProps) => {
  const router = useRouter();

  return (
    <div className="text-sm text-gray-800 border-b border-gray-200 py-3 hover:bg-gray-50 transition flex justify-between">
      <div
        className="text-center cursor-pointer flex items-center font-sansKR-SemiBold"
        onClick={() => router.push(`/main/student/${user.studentId}`)}
      >
        <User className="mr-2" />
        {user.studentName}
        <div className="text-center font-sansKR-Light ml-4">
          {user.studentPhone}
        </div>
      </div>

      <div className="flex flex-row items-center">
        {status ? (
          <span
            className={`text-sm font-semibold flex items-center text-center justify-between ${
              status === "출석"
                ? "text-green-700"
                : status === "결석"
                  ? "text-red-700"
                  : status === "인강"
                    ? "text-blue-700"
                    : "text-purple-700"
            }`}
          >
            {status}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="text-black cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["출석", "결석", "지각", "인강", ""].map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() =>
                      onStatusChange(
                        user.studentId,
                        user.studentName,
                        status,
                        s,
                      )
                    }
                  >
                    {s === "" ? "초기화" : `${s} 처리`}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        ) : (
          ["출석", "지각", "결석", "인강"].map((s) => (
            <button
              key={s}
              className={`rounded-sm px-2 py-1 mr-1 ${
                s === "출석"
                  ? "bg-green-200 text-green-600"
                  : s === "결석"
                    ? "bg-red-200 text-red-600"
                    : s === "인강"
                      ? "bg-blue-200 text-blue-600"
                      : "bg-purple-200 text-purple-600"
              }`}
              onClick={() =>
                onStatusChange(user.studentId, user.studentName, "", s)
              }
            >
              {s}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default AttendanceItem;
