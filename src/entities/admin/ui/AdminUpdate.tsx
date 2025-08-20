"use client";

import React, { useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Admin } from '@/src/entities/admin/model/types';
import { useAdminFeatureStore } from '@/src/features/adminCRUD';
import { VALIDATION_PATTERNS } from "@/src/shared/config/validation";

// 편집 폼 데이터 타입
interface AdminEditFormData {
  adminName: string;
  adminPhone: string;
  adminPosition: string;
  userPassword: string;
  userCheckPassword: string;
}

interface AdminUpdateProps {
  admin: Admin;
  onSuccess?: () => void;
  onClose?: () => void;
}

// 관리자 정보 수정 컴포넌트
export const AdminUpdate: React.FC<AdminUpdateProps> = ({
  admin,
  onSuccess,
  onClose
}) => {
  const { updateAdmin } = useAdminFeatureStore();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<AdminEditFormData>({
    defaultValues: {
      adminName: admin.adminName,
      adminPhone: admin.adminPhone || "",
      adminPosition: admin.adminPosition || "",
      userPassword: "",
      userCheckPassword: ""
    },
    mode: 'onChange'
  });

  const password = watch("userPassword");

  // admin이 변경될 때 폼 리셋
  useEffect(() => {
    reset({
      adminName: admin.adminName,
      adminPhone: admin.adminPhone || "",
      adminPosition: admin.adminPosition || "",
      userPassword: "",
      userCheckPassword: ""
    });
  }, [admin, reset]);

  const onSubmit = async (data: AdminEditFormData) => {
    try {
      await updateAdmin(admin.memberId, {
        adminName: data.adminName,
        adminPhone: data.adminPhone,
        adminPosition: data.adminPosition,
        userPassword: data.userPassword || undefined,
      });
      
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("관리자 수정 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-sansKR-Medium text-gray-700 mb-1">이름</label>
        <Controller
          name="adminName"
          control={control}
          rules={{
            required: '이름을 입력해주세요',
            minLength: { value: 2, message: '이름은 2자 이상 입력해주세요' }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field}
                placeholder="이름을 입력하세요"
                className={errors.adminName ? 'border-red-500' : ''}
              />
              {errors.adminName && (
                <p className="text-red-500 text-xs mt-1">{errors.adminName.message}</p>
              )}
            </div>
          )}
        />
      </div>
      
      <div>
        <label className="block text-sm font-sansKR-Medium text-gray-700 mb-1">전화번호</label>
        <Controller
          name="adminPhone"
          control={control}
          rules={{
            required: '전화번호를 입력해주세요',
            pattern: {
              value: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
              message: '올바른 전화번호 형식을 입력해주세요 (예: 01012345678)'
            }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field}
                placeholder="전화번호를 입력하세요 (예: 01012345678)"
                className={errors.adminPhone ? 'border-red-500' : ''}
              />
              {errors.adminPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.adminPhone.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-sansKR-Medium text-gray-700 mb-1">직책</label>
        <Controller
          name="adminPosition"
          control={control}
          rules={{
            required: '직책을 입력해주세요'
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field}
                placeholder="직책을 입력하세요"
                className={errors.adminPosition ? 'border-red-500' : ''}
              />
              {errors.adminPosition && (
                <p className="text-red-500 text-xs mt-1">{errors.adminPosition.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-sansKR-Medium text-gray-700 mb-1">비밀번호 변경 (선택)</label>
        <Controller
          name="userPassword"
          control={control}
          rules={{
            minLength: { 
              value: 8, 
              message: '비밀번호는 최소 8자 이상이어야 합니다' 
            },
            pattern: {
              value: VALIDATION_PATTERNS.PASSWORD,
              message: '영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다'
            }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field}
                type="password"
                placeholder="안전한 비밀번호를 입력해주세요 (미입력시 변경 없음)"
                className={errors.userPassword ? 'border-red-500' : ''}
              />
              {errors.userPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.userPassword.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-sansKR-Medium text-gray-700 mb-1">비밀번호 확인</label>
        <Controller
          name="userCheckPassword"
          control={control}
          rules={{
            validate: (value) => {
              if (!password) return true; // 비밀번호가 입력되지 않았으면 확인도 검증하지 않음
              if (!value) return '비밀번호 확인을 입력해주세요';
              return value === password || '비밀번호가 일치하지 않습니다';
            }
          }}
          render={({ field }) => (
            <div>
              <Input 
                {...field}
                type="password"
                placeholder="입력하신 비밀번호를 다시 입력해주세요"
                className={errors.userCheckPassword ? 'border-red-500' : ''}
              />
              {errors.userCheckPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.userCheckPassword.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button 
          type="button"
          variant="outline" 
          onClick={onClose} 
          disabled={isSubmitting}
        >
          취소
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </Button>
      </div>
    </form>
  );
};
