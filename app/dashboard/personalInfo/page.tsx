"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/app/providers";
import { useRouter } from "next/navigation";
import Header from "@/src/widgets/header/DashboardHeader";
import { useAcademyFeatureStore } from "@/src/features/academyCRUD/model/store";
import { useAcademyStore } from "@/src/entities/academy/model/store";

const PersonalInfoPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    userId: "",
    userPassword: "",
    userPasswordCheck: "",
    academyId: "",
    studentName: "",
    studentPhone: "",
    studentHighschool: "",
    studentBirthYear: "",
  });
  const [initialForm, setInitialForm] = useState(form);
  const { readAcademies } = useAcademyFeatureStore();
  const { academies } = useAcademyStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isFormLoaded = initialForm.userId !== "";

  // 학생 상세 정보 불러오기
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role !== "STUDENT") {
        router.replace("/dashboard");
        return;
      }
      // GET /api/member/me에서 학생 상세 정보 요청
      fetch("/api/member/me", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            const u = data.user;
            const loaded = {
              userId: u.userId || "",
              userPassword: "",
              userPasswordCheck: "",
              academyId: u.student?.academyId?.toString() || "",
              studentName: u.student?.studentName || "",
              studentPhone: u.student?.studentPhone || "",
              studentHighschool: u.student?.studentHighschool || "",
              studentBirthYear: u.student?.studentBirthYear?.toString() || "",
            };
            setForm(loaded);
            setInitialForm(loaded);
          }
        });
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    readAcademies();
  }, [readAcademies]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // 비밀번호 변경 시 확인
    if (form.userPassword && form.userPassword !== form.userPasswordCheck) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      setLoading(false);
      return;
    }
    try {
      // 변경된 값만 추출 (userPasswordCheck는 제외)
      const changedFields: any = {};
      Object.keys(form).forEach((key) => {
        if (key === "userPasswordCheck") return;
        if (form[key as keyof typeof form] !== initialForm[key as keyof typeof form] && form[key as keyof typeof form] !== "") {
          // academyId, studentBirthYear는 number로 변환
          if (key === "academyId" && form.academyId !== "") {
            changedFields[key] = Number(form.academyId);
          } else if (key === "studentBirthYear" && form.studentBirthYear !== "") {
            changedFields[key] = Number(form.studentBirthYear);
          } else {
            changedFields[key] = form[key as keyof typeof form];
          }
        }
      });
      if (Object.keys(changedFields).length === 0) {
        setError("변경된 내용이 없습니다.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/member/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changedFields),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("저장되었습니다.");
        setInitialForm({ ...form, userPassword: "", userPasswordCheck: "" });
        setForm((prev) => ({ ...prev, userPassword: "", userPasswordCheck: "" }));
      } else {
        setError(data.message || "저장에 실패했습니다.");
      }
    } catch (err) {
      setError("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;
  if (!user || user.role !== "STUDENT") return null;

  return (
    <div className="min-h-screen bg-gray-50 space-y-6">
      <Header title="개인정보 수정" description="내 정보를 안전하게 관리하세요" />
      <div className="max-w-3xl mx-auto px-4 mt-6">
        {!isFormLoaded ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center text-gray-400 text-lg">
            학생 정보를 불러오는 중...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">아이디</label>
                <input
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">비밀번호</label>
                <input
                  name="userPassword"
                  type="password"
                  value={form.userPassword}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="new-password"
                  placeholder="변경 시에만 입력"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">비밀번호 확인</label>
                <input
                  name="userPasswordCheck"
                  type="password"
                  value={form.userPasswordCheck}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="new-password"
                  placeholder="비밀번호 변경 시 동일하게 입력"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">학원</label>
                <select
                  name="academyId"
                  value={form.academyId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">학원을 선택하세요</option>
                  {academies.map((academy) => (
                    <option key={academy.academyId} value={academy.academyId}>
                      {academy.academyName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">이름</label>
                <input
                  name="studentName"
                  value={form.studentName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">전화번호</label>
                <input
                  name="studentPhone"
                  value={form.studentPhone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">고등학교</label>
                <input
                  name="studentHighschool"
                  value={form.studentHighschool}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">생년(YYYY)</label>
                <input
                  name="studentBirthYear"
                  type="number"
                  value={form.studentBirthYear}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min={1900}
                  max={2100}
                  required
                />
              </div>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "저장 중..." : "저장"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPage; 