import React from "react";
import { Button } from "@/shared/ui";
import { UserInfo,Admin } from "@/shared/types/entities";

interface UserCardProps {
  user: UserInfo;
  onEdit?: (user: UserInfo) => void;
  onDelete?: (userId: string) => void;
  showActions?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  showActions = false
}) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "STUDENT":
        return "bg-blue-100 text-blue-800";
      case "DEVELOPER":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "관리자";
      case "STUDENT":
        return "학생";
      case "DEVELOPER":
        return "개발자";
      default:
        return role;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">ID: {user.userId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
          {getRoleLabel(user.role)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">사용자 ID:</span>
          <span className="font-medium">{user.userId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">전화번호:</span>
          <span className="font-medium">{user.role}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">역할:</span>
          <span className="font-medium">{getRoleLabel(user.role)}</span>
        </div>
      </div>

      {showActions && (
        <div className="flex space-x-2 pt-4 border-t border-gray-200">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
              className="flex-1"
            >
              수정
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(user.userId)}
              className="flex-1"
            >
              삭제
            </Button>
          )}
        </div>
      )}
    </div>
  );
}; 