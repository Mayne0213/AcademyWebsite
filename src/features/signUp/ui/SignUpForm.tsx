"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signUpApi } from "@/src/features/signUp/model";
import { SignUpFormData } from "@/src/features/signUp/model";
import { SIGNUP_VALIDATION } from "@/src/features/signUp/model/validation";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import { SUCCESS_MESSAGES } from "@/src/shared/config/messages";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";

const SignUpForm = () => {
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    trigger
  } = useForm<SignUpFormData>({
    defaultValues: {
      userId: "",
      userPassword: "",
      userCheckPassword: "",
      academyId: 0,
      studentName: "",
      studentPhone: "",
      studentBirthYear: "",
      studentHighschool: "",
    },
    mode: 'onChange'
  });

  const [step, setStep] = useState(1);

  // 학원 목록 불러오기
  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  // 다음 단계로 이동 (1단계 검증 후)
  const handleNextStep = async () => {
    const isStep1Valid = await trigger(['userId', 'userPassword', 'userCheckPassword']);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  // 이전 단계로 이동
  const handlePreviousStep = () => {
    setStep(1);
  };

  // 회원가입 제출
  const onSubmit = async (data: SignUpFormData) => {
    try {
      SIGNUP_VALIDATION.validateSignUpData(data);

      const result = await signUpApi.submitSignUp(data);

      if (result.success) {
        alert(SUCCESS_MESSAGES.AUTH.SIGNUP_SUCCESS);
        window.location.href = "/home/signIn";
      }
    } catch (error: any) {
      // 서버 에러 처리 - toast는 이미 apiPost에서 표시됨
      if (error.message) {
        // 아이디 중복 에러
        if (error.message === "이미 사용 중인 아이디입니다.") {
          setError("userId", {
            type: "manual",
            message: error.message
          });
          setStep(1); // 1단계로 돌아가기
          return;
        }

        // 전화번호 중복 에러
        if (error.message === "이미 등록된 전화번호입니다.") {
          setError("studentPhone", {
            type: "manual",
            message: error.message
          });
          setStep(2); // 2단계로 이동
          return;
        }
      }
      // 기타 에러는 apiPost에서 이미 toast로 표시됨
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8`}>
      {step === 1 ? (
        <Step1Form
          control={control}
          errors={errors}
          onNext={handleNextStep}
          setValue={setValue}
        />
      ) : (
        <Step2Form
          control={control}
          errors={errors}
          onPrevious={handlePreviousStep}
          onSubmit={handleSubmit(onSubmit)}
          academies={academies}
          isLoading={isSubmitting}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default SignUpForm;
