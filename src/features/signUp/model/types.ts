import { Academy } from "@/src/entities/academy/model/types";

export interface SignUpFormData {
  userId: string;
  userPassword: string;
  userCheckPassword: string; // 회원가입용 임시 필드
  academyId: number;
  studentName: string;
  studentPhone: string;
  studentBirthYear: string;
  studentHighschool: string;
}

export interface Step1FormData {
  userId: string;
  userPassword: string;
  userCheckPassword: string;
}

export interface Step1FormProps {
  formData: Step1FormData;
  onNext: () => void;
  onFormDataChange: (field: string, value: string) => void;
}

export interface Step2FormData {
  academyId: number | undefined;
  studentName: string;
  studentPhone: string;
  studentBirthYear: string;
  studentHighschool: string;
}

export interface Step2FormProps {
  formData: Step2FormData;
  onPrevious: () => void;
  onSubmit: () => void;
  academies: Academy[];
  isLoading: boolean;
  onFormDataChange: (field: string, value: any) => void;
}

