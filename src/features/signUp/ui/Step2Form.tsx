import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import AcademySelect from "./AcademySelect";
import { SignUpFormData } from "@/src/features/signUp/model/types";
import { Academy } from "@/src/entities/academy/model/types";
import { VALIDATION_PATTERNS } from "@/src/shared/config/validation";

interface Step2FormProps {
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  onPrevious: () => void;
  onSubmit: () => void;
  academies: Academy[];
  isLoading: boolean;
  setValue: (name: keyof SignUpFormData, value: any) => void;
}

const Step2Form: React.FC<Step2FormProps> = ({
  control,
  errors,
  onPrevious,
  onSubmit,
  academies,
  isLoading,
  setValue
}) => {
  return (
    <div className="space-y-6">
      <Controller
        name="academyId"
        control={control}
        rules={{
          required: "학원을 선택해주세요",
          validate: (value) => value > 0 || "학원을 선택해주세요"
        }}
        render={({ field }) => (
          <AcademySelect
            academies={academies}
            value={field.value}
            onChange={(value) => setValue("academyId", value)}
            disabled={isLoading}
            error={errors.academyId?.message}
          />
        )}
      />

      <Controller
        name="studentName"
        control={control}
        rules={{
          required: "이름을 입력해주세요",
          minLength: {
            value: 2,
            message: "이름은 최소 2자 이상이어야 합니다"
          },
          pattern: {
            value: /^[가-힣a-zA-Z\s]+$/,
            message: "한글, 영문, 공백만 사용 가능합니다"
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">이름</label>
            <Input
              type="text"
              placeholder="이름을 입력해주세요"
              value={field.value}
              onChange={(e) => setValue("studentName", e.target.value)}
              disabled={isLoading}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.studentName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.studentName && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.studentName.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="studentPhone"
        control={control}
        rules={{
          required: "전화번호를 입력해주세요",
          pattern: {
            value: VALIDATION_PATTERNS.PHONE,
            message: "올바른 전화번호 형식이 아닙니다"
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">전화번호</label>
            <Input
              type="tel"
              placeholder="하이픈 없이 입력해주세요."
              value={field.value}
              onChange={(e) => setValue("studentPhone", e.target.value)}
              disabled={isLoading}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.studentPhone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.studentPhone && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.studentPhone.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="studentBirthYear"
        control={control}
        rules={{
          required: "출생년도를 입력해주세요",
          pattern: {
            value: VALIDATION_PATTERNS.BIRTH_YEAR,
            message: "생년을 다시 확인해주세요"
          },
          validate: (value) => {
            const year = parseInt(value);
            const currentYear = new Date().getFullYear();
            return year >= 1900 && year <= currentYear || "올바른 출생년도가 아닙니다";
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">출생년도</label>
            <Input
              type="number"
              placeholder="출생년도를 입력해주세요"
              value={field.value}
              onChange={(e) => setValue("studentBirthYear", e.target.value)}
              disabled={isLoading}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.studentBirthYear ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.studentBirthYear && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.studentBirthYear.message}
              </p>
            )}
          </div>
        )}
      />

      <Controller
        name="studentHighschool"
        control={control}
        rules={{
          required: "고등학교를 입력해주세요",
          minLength: {
            value: 4,
            message: "고등학교명을 정확히 입력해주세요"
          },
          pattern: {
            value: /^[가-힣\s]+$/,
            message: "한글과 공백만 사용 가능합니다"
          }
        }}
        render={({ field }) => (
          <div>
            <label className="block text-sm text-gray-700 mb-2">고등학교</label>
            <Input
              type="text"
              placeholder="줄임말X (양천고X , 양천고등학교O)"
              value={field.value}
              onChange={(e) => setValue("studentHighschool", e.target.value)}
              disabled={isLoading}
              className={`font-sansKR-Light h-12 px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${errors.studentHighschool ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
            />
            {errors.studentHighschool && (
              <p className="mt-1 text-sm text-red-600 font-sansKR-Regular">
                {errors.studentHighschool.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="space-y-3">
        <Button 
          onClick={onPrevious} 
          variant="secondary" 
          className="w-full h-12 bg-gray-300 text-gray-700 rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center" 
          disabled={isLoading}
        >
          이전 단계
        </Button>
        
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {isLoading ? "회원가입 중..." : "회원가입 완료"}
        </Button>
      </div>
    </div>
  );
};

export default Step2Form; 