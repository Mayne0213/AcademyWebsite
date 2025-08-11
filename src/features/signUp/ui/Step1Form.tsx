import React from "react";
import Link from "next/link";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { SignUpFormData } from "@/src/features/signUp/model/types";
import { VALIDATION_PATTERNS } from "@/src/shared/config/validation";

interface Step1FormProps {
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  onNext: () => void;
  setValue: (name: keyof SignUpFormData, value: any) => void;
}

const Step1Form: React.FC<Step1FormProps> = ({
  control,
  errors,
  onNext,
  setValue
}) => {
  return (
    <div className="space-y-6">
      <Controller
        name="userId"
        control={control}
        rules={{
          required: "아이디를 입력해주세요",
          pattern: {
            value: VALIDATION_PATTERNS.USER_ID,
            message: "영문자와 특수문자만 사용 가능합니다"
          },
          minLength: {
            value: 4,
            message: "아이디는 최소 4자 이상이어야 합니다"
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">아이디</label>
            <Input
              type="text"
              placeholder="영문자와 특수문자만 사용 가능"
              value={field.value}
              onChange={(e) => setValue("userId", e.target.value)}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.userId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.userId && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.userId.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="userPassword"
        control={control}
        rules={{
          required: "비밀번호를 입력해주세요",
          minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상이어야 합니다"
          },
          pattern: {
            value: VALIDATION_PATTERNS.PASSWORD,
            message: "영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다"
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">비밀번호</label>
            <Input
              type="password"
              placeholder="안전한 비밀번호를 입력해주세요"
              value={field.value}
              onChange={(e) => setValue("userPassword", e.target.value)}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.userPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.userPassword && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.userPassword.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="userCheckPassword"
        control={control}
        rules={{
          required: "비밀번호 확인을 입력해주세요",
          validate: (value, formValues) => {
            return value === formValues.userPassword || "비밀번호가 일치하지 않습니다";
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">비밀번호 확인</label>
            <Input
              type="password"
              placeholder="입력하신 비밀번호를 다시 입력해주세요"
              value={field.value}
              onChange={(e) => setValue("userCheckPassword", e.target.value)}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.userCheckPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.userCheckPassword && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.userCheckPassword.message}
              </p>
            )}
          </div>
        )}
      />

      <Button
        onClick={onNext}
        className="w-full h-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
      >
        다음 단계
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          이미 계정이 있으신가요?{" "}
          <Link
            href={"/home/signIn"}
            className="font-sansKR-SemiBold text-gray-800 hover:text-gray-900 hover:font-sansKR-Bold"
          >
            로그인하기
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Step1Form; 