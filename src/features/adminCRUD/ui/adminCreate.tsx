"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { VALIDATION_PATTERNS } from "@/src/shared/config/validation";
import { useAdminFeatureStore } from "@/src/features/adminCRUD";

// 관리자 생성 폼 데이터 타입
interface AdminFormData {
  userId: string;
  userPassword: string;
  userCheckPassword: string;
  adminName: string;
  adminPhone: string;
  adminPosition: string;
}

interface AdminCreateProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

// 관리자 계정 생성 폼
export const AdminCreate = ({ onSuccess, onClose }: AdminCreateProps) => {
  const { createAdmin } = useAdminFeatureStore();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<AdminFormData>({
    defaultValues: {
      userId: "",
      userPassword: "",
      userCheckPassword: "",
      adminName: "",
      adminPhone: "",
      adminPosition: "",
    },
    mode: 'onChange'
  });

  const password = watch("userPassword");

  const onSubmit = async (data: AdminFormData) => {
    try {
      await createAdmin({
        userId: data.userId,
        userPassword: data.userPassword,
        userCheckPassword: data.userCheckPassword,
        adminName: data.adminName,
        adminPhone: data.adminPhone,
        adminPosition: data.adminPosition,
        role: "ADMIN",
      });

      reset();
      onSuccess?.();
    } catch (error) {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-4">
        <div>
          <label htmlFor="userId" className="block text-sm font-sansKR-Medium text-gray-700 mb-1">아이디</label>
          <Controller
            name="userId"
            control={control}
            rules={{
              required: '아이디를 입력해주세요',
              minLength: { value: 4, message: '아이디는 4자 이상 입력해주세요' },
              pattern: {
                value: VALIDATION_PATTERNS.USER_ID,
                message: '영문, 숫자, 특수문자만 사용 가능합니다'
              }
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="userId"
                  placeholder="아이디를 입력하세요"
                  className={errors.userId ? 'border-red-500' : ''}
                />
                {errors.userId && (
                  <p className="text-red-500 text-xs mt-1">{errors.userId.message}</p>
                )}
              </div>
            )}
          />
        </div>
        <div>
          <label htmlFor="adminName" className="block text-sm font-sansKR-Medium text-gray-700 mb-1">이름</label>
          <Controller
            name="adminName"
            control={control}
            rules={{
              required: '이름을 입력해주세요',
              minLength: { value: 2, message: '이름은 2자 이상 입력해주세요' },
              pattern: {
                value: VALIDATION_PATTERNS.NAME,
                message: '한글 또는 영문만 입력 가능합니다'
              }
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="adminName"
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
          <label htmlFor="userPassword" className="block text-sm font-sansKR-Medium text-gray-700 mb-1">비밀번호</label>
          <Controller
            name="userPassword"
            control={control}
            rules={{
              required: '비밀번호를 입력해주세요',
              pattern: {
                value: VALIDATION_PATTERNS.PASSWORD,
                message: '영문, 숫자, 특수문자 조합 8자 이상 입력해주세요'
              }
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="userPassword"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
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
          <label htmlFor="userCheckPassword" className="block text-sm font-sansKR-Medium text-gray-700 mb-1">비밀번호 확인</label>
          <Controller
            name="userCheckPassword"
            control={control}
            rules={{
              required: '비밀번호 확인을 입력해주세요',
              validate: (value) => value === password || '비밀번호가 일치하지 않습니다'
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="userCheckPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  className={errors.userCheckPassword ? 'border-red-500' : ''}
                />
                {errors.userCheckPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.userCheckPassword.message}</p>
                )}
              </div>
            )}
          />
        </div>
        <div>
          <label htmlFor="adminPosition" className="block text-sm font-sansKR-Medium text-gray-700 mb-1">직책</label>
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
                  id="adminPosition"
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
        <div className="smalltablet:col-span-2">
          <label htmlFor="adminPhone" className="block text-sm font-sansKR-Medium text-gray-700 mb-1">전화번호</label>
          <Controller
            name="adminPhone"
            control={control}
            rules={{
              required: '전화번호를 입력해주세요',
              pattern: {
                value: VALIDATION_PATTERNS.PHONE,
                message: '올바른 전화번호 형식을 입력해주세요 (예: 01012345678)'
              }
            }}
            render={({ field }) => (
              <div>
                <Input
                  {...field}
                  id="adminPhone"
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
      </div>
      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "생성 중..." : "관리자 계정 생성"}
        </Button>
      </div>
    </form>
  );
};
