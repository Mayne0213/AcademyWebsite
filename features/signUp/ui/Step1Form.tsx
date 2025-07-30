import React from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import FormInput from "./FormInput";
import { Step1FormProps } from "@/features/signUp/model/types";

const Step1Form: React.FC<Step1FormProps> = ({ 
  formData, 
  onNext, 
  onFormDataChange 
}) => {
  // 모든 필수 필드가 채워졌는지 확인
  const isStep1Valid = Boolean(
    formData.userId && 
    formData.userPassword && 
    formData.userCheckPassword
  );
  
  return (
    <div className="space-y-6">
      <FormInput
        label="아이디"
        type="text"
        placeholder="영문자와 특수문자만 사용 가능"
        value={formData.userId}
        onChange={(value) => onFormDataChange("userId", value)}
        required
      />

      <FormInput
        label="비밀번호"
        type="password"
        placeholder="안전한 비밀번호를 입력해주세요"
        value={formData.userPassword}
        onChange={(value) => onFormDataChange("userPassword", value)}
        required
      />

      <FormInput
        label="비밀번호 확인"
        type="password"
        placeholder="입력하신 비밀번호를 다시 입력해주세요"
        value={formData.userCheckPassword}
        onChange={(value) => onFormDataChange("userCheckPassword", value)}
        required
      />

      <Button
        onClick={onNext}
        disabled={!isStep1Valid}
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