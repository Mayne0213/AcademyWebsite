"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Student } from "@/src/entities/student/model/types";
import { Modal } from "@/src/shared/ui/Modal";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import AcademySelect from "@/src/features/signUp/ui/AcademySelect";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";
import { VALIDATION_PATTERNS } from "@/src/shared/config/validation";

interface StudentEditModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: Student) => Promise<void>;
  isLoading?: boolean;
}

interface StudentEditFormData {
  academyId: number;
  studentName: string;
  studentPhone: string;
  studentHighschool: string;
  studentBirthYear: number;
  studentMemo: string;
}

export function StudentEditModal({
  student,
  isOpen,
  onClose,
  onSave,
  isLoading = false
}: StudentEditModalProps) {
  const { academies } = useAcademyStore();
  const { readAcademies } = useAcademyFeatureStore();

  // 학원 목록 불러오기
  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  // React Hook Form 설정
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<StudentEditFormData>({
    defaultValues: {
      academyId: 0,
      studentName: "",
      studentPhone: "",
      studentHighschool: "",
      studentBirthYear: 0,
      studentMemo: ""
    },
    mode: 'onChange'
  });

  // 폼 데이터 초기화
  useEffect(() => {
    if (student && isOpen) {
      reset({
        academyId: student.academyId || 0,
        studentName: student.studentName || "",
        studentPhone: student.studentPhone || "",
        studentHighschool: student.studentHighschool || "",
        studentBirthYear: student.studentBirthYear || 0,
        studentMemo: student.studentMemo || ""
      });
    }
  }, [student, isOpen, reset]);

  // 저장 핸들러
  const onSubmit = async (data: StudentEditFormData) => {
    try {
      const updatedStudent: Student = {
        ...student,
        academyId: data.academyId,
        studentName: data.studentName.trim(),
        studentPhone: data.studentPhone.trim(),
        studentHighschool: data.studentHighschool.trim() || undefined,
        studentBirthYear: data.studentBirthYear,
        studentMemo: data.studentMemo.trim() || undefined
      };

      await onSave(updatedStudent);
      onClose();
    } catch (error) {
      console.error("학생 정보 수정 실패:", error);
    }
  };

  // 전화번호 포맷팅 (숫자만 허용)
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    // 최대 11자리까지만 허용 (010xxxxxxxx)
    return numbers.slice(0, 11);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="학생 정보 수정"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* 학원 선택 */}
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
              onChange={(value) => field.onChange(value)}
              disabled={isLoading || isSubmitting}
              error={errors.academyId?.message}
            />
          )}
        />

        {/* 학생 이름 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            학생 이름 *
          </label>
          <Controller
            name="studentName"
            control={control}
            rules={{
              required: "학생 이름을 입력해주세요",
              minLength: {
                value: 2,
                message: "이름은 최소 2자 이상이어야 합니다"
              },
              pattern: {
                value: VALIDATION_PATTERNS.NAME,
                message: "한글, 영문, 공백만 사용 가능합니다"
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="학생 이름을 입력하세요"
                disabled={isLoading || isSubmitting}
                className={errors.studentName ? "border-red-500" : ""}
              />
            )}
          />
          {errors.studentName && (
            <p className="text-red-500 text-sm mt-1">{errors.studentName.message}</p>
          )}
        </div>

        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            전화번호 *
          </label>
          <Controller
            name="studentPhone"
            control={control}
            rules={{
              required: "전화번호를 입력해주세요",
              pattern: {
                value: VALIDATION_PATTERNS.PHONE,
                message: "올바른 전화번호 형식을 입력해주세요. (예: 01012345678)"
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                placeholder="01012345678"
                maxLength={11}
                disabled={isLoading || isSubmitting}
                className={errors.studentPhone ? "border-red-500" : ""}
              />
            )}
          />
          {errors.studentPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.studentPhone.message}</p>
          )}
        </div>

        {/* 고등학교 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            고등학교
          </label>
          <Controller
            name="studentHighschool"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="고등학교명을 입력하세요"
                disabled={isLoading || isSubmitting}
              />
            )}
          />
        </div>

        {/* 출생년도 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            출생년도 *
          </label>
          <Controller
            name="studentBirthYear"
            control={control}
            rules={{
              required: "출생년도를 입력해주세요",
              pattern: {
                value: VALIDATION_PATTERNS.BIRTH_YEAR,
                message: "올바른 출생년도를 입력해주세요 (1900-2099)"
              },
              min: {
                value: 1900,
                message: "1900년 이후의 출생년도를 입력해주세요"
              },
              max: {
                value: new Date().getFullYear(),
                message: "올바른 출생년도를 입력해주세요"
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="2000"
                min="1900"
                max={new Date().getFullYear()}
                disabled={isLoading || isSubmitting}
                className={errors.studentBirthYear ? "border-red-500" : ""}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            )}
          />
          {errors.studentBirthYear && (
            <p className="text-red-500 text-sm mt-1">{errors.studentBirthYear.message}</p>
          )}
        </div>

        {/* 메모 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            메모
          </label>
          <Controller
            name="studentMemo"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="학생에 대한 메모를 입력하세요"
                rows={3}
                disabled={isLoading || isSubmitting}
              />
            )}
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading || isSubmitting}
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
