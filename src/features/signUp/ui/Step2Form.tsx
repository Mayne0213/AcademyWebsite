import React from "react";
import { Button } from "@/src/shared/ui/button";
import FormInput from "./FormInput";
import AcademySelect from "./AcademySelect";
import { Step2FormProps } from "@/src/features/signUp/model/types";

const Step2Form: React.FC<Step2FormProps> = ({ 
  formData, 
  onPrevious, 
  onSubmit, 
  academies, 
  isLoading,
  onFormDataChange 
}) => {
  // 모든 필수 필드가 채워졌는지 확인
  const isStep2Valid = Boolean(
    formData.academyId &&
    formData.studentName &&
    formData.studentPhone &&
    formData.studentBirthYear &&
    formData.studentHighschool
  );
  
  return (
    <div className="space-y-6">
      <AcademySelect
        academies={academies}
        value={formData.academyId}
        onChange={(value) => onFormDataChange("academyId", value)}
        disabled={isLoading}
      />

      <FormInput
        label="이름"
        type="text"
        placeholder="이름을 입력해주세요"
        value={formData.studentName}
        onChange={(value) => onFormDataChange("studentName", value)}
        required
        disabled={isLoading}
      />

      <FormInput
        label="전화번호"
        type="tel"
        placeholder="하이픈 없이 입력해주세요."
        value={formData.studentPhone}
        onChange={(value) => onFormDataChange("studentPhone", value)}
        required
        disabled={isLoading}
      />

      <FormInput
        label="출생년도"
        type="number"
        placeholder="출생년도를 입력해주세요"
        value={formData.studentBirthYear}
        onChange={(value) => onFormDataChange("studentBirthYear", value)}
        required
        disabled={isLoading}
      />

      <FormInput
        label="고등학교"
        type="text"
        placeholder="줄임말X (양천고X , 양천고등학교O)"
        value={formData.studentHighschool}
        onChange={(value) => onFormDataChange("studentHighschool", value)}
        required
        disabled={isLoading}
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
          disabled={!isStep2Valid || isLoading}
          className="w-full h-12 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-xl shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
        >
          {isLoading ? "회원가입 중..." : "회원가입 완료"}
        </Button>
      </div>
    </div>
  );
};

export default Step2Form; 