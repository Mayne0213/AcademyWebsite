"use client";

import React, { useEffect, useState } from "react";
import { signUpApi } from "@/features/signUp/model";
import { SignUpFormData } from "@/features/signUp/model";
import { useAcademyFeatureStore } from "@/features/academy/model";
import { useAcademyStore } from "@/entities/academy/model/store";
import { SUCCESS_MESSAGES } from "@/shared/config/messages";
import { SIGNUP_VALIDATION } from "@/features/signUp/model/validation";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";


const SignUpForm = () => {
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<SignUpFormData>({
    userId: "",
    userPassword: "",
    userCheckPassword: "",
    academyId: undefined,
    studentName: "",
    studentPhone: "",
    studentBirthYear: "",
    studentHighschool: "",
  });

  // 학원 목록 불러오기
  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  // 폼 데이터 업데이트
  const handleFormDataChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 회원가입 제출
  const handleSubmit = async () => {
    const validationResult = SIGNUP_VALIDATION.validateSignUpData(formData);
    if (!validationResult.isValid) {
      alert(validationResult.errors[0]);
      return;
    }

    try {
      setIsLoading(true);
      const result = await signUpApi.submitSignUp(formData);

      if (result.success) {
        alert(SUCCESS_MESSAGES.AUTH.SIGNUP_SUCCESS);
        window.location.href = "/home/signIn";
      } else {
        alert(result.message || "회원가입에 실패했습니다.");
      }
    } catch (error: any) {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8`}>
      {step === 1 ? (
        <Step1Form
          formData={{
            userId: formData.userId || "",
            userPassword: formData.userPassword || "",
            userCheckPassword: formData.userCheckPassword || "",
          }}
          onNext={() => setStep(2)}
          onFormDataChange={handleFormDataChange}
        />
      ) : (
        <Step2Form
          formData={{
            academyId: formData.academyId,
            studentName: formData.studentName || "",
            studentPhone: formData.studentPhone || "",
            studentBirthYear: formData.studentBirthYear || "",
            studentHighschool: formData.studentHighschool || "",
          }}
          onPrevious={() => setStep(1)}
          onSubmit={handleSubmit}
          academies={academies}
          isLoading={isLoading}
          onFormDataChange={handleFormDataChange}
        />
      )}
    </div>
  );
};

export default SignUpForm;
