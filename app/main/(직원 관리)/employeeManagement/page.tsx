"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// 관리자 계정 생성 폼
const AdminRegister = ({ onSuccess }: { onSuccess?: () => void }) => {
  const userIdRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);
  const userCheckPasswordRef = useRef<HTMLInputElement>(null);
  const adminNameRef = useRef<HTMLInputElement>(null);
  const adminPhoneRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const userId = userIdRef.current?.value.trim() || "";
    const userPassword = userPasswordRef.current?.value || "";
    const userCheckPassword = userCheckPasswordRef.current?.value || "";
    const adminName = adminNameRef.current?.value.trim() || "";
    const adminPhone = adminPhoneRef.current?.value.trim() || "";

    if (!userId || !userPassword || !userCheckPassword || !adminName || !adminPhone) {
      toast.error("모든 필드를 입력해주세요.");
      return;
    }
    if (userPassword !== userCheckPassword) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          userPassword,
          userCheckPassword,
          adminName,
          adminPhone,
          role: "ADMIN",
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      toast.success("관리자 계정이 생성되었습니다.");
      [userIdRef, userPasswordRef, userCheckPasswordRef, adminNameRef, adminPhoneRef].forEach(ref => {
        if (ref.current) ref.current.value = "";
      });
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">관리자 계정 생성</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="userId">아이디</Label>
          <Input id="userId" ref={userIdRef} placeholder="아이디" />
        </div>
        <div>
          <Label htmlFor="userPassword">비밀번호</Label>
          <Input id="userPassword" type="password" ref={userPasswordRef} placeholder="비밀번호" />
        </div>
        <div>
          <Label htmlFor="userCheckPassword">비밀번호 확인</Label>
          <Input id="userCheckPassword" type="password" ref={userCheckPasswordRef} placeholder="비밀번호 확인" />
        </div>
        <div>
          <Label htmlFor="adminName">이름</Label>
          <Input id="adminName" ref={adminNameRef} placeholder="이름" />
        </div>
        <div>
          <Label htmlFor="adminPhone">전화번호</Label>
          <Input id="adminPhone" ref={adminPhoneRef} placeholder="전화번호" />
        </div>
        <Button onClick={handleRegister} disabled={loading} className="w-full mt-4">
          {loading ? "생성 중..." : "관리자 계정 생성"}
        </Button>
      </div>
    </div>
  );
};

// 관리자 목록 테이블
const AdminList = ({ onEdit, onDelete }: { onEdit?: (admin: any) => void; onDelete?: (admin: any) => void }) => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editAdmin, setEditAdmin] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editForm, setEditForm] = useState({ adminName: "", adminPhone: "", userPassword: "" });

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();
      setAdmins(data);
    } catch {
      toast.error("관리자 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (admin: any) => {
    if (!window.confirm(`정말 삭제하시겠습니까? (${admin.adminName})`)) return;
    try {
      const res = await fetch(`/api/admin?memberId=${admin.memberId}`, { method: "DELETE" });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "삭제 실패");
      toast.success("삭제되었습니다.");
      fetchAdmins();
    } catch (err: any) {
      toast.error(err.message || "삭제 실패");
    }
  };

  const handleEditClick = (admin: any) => {
    setEditAdmin(admin);
    setEditForm({ adminName: admin.adminName, adminPhone: admin.adminPhone, userPassword: "" });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    setEditLoading(true);
    try {
      const res = await fetch(`/api/admin?memberId=${editAdmin.memberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminName: editForm.adminName,
          adminPhone: editForm.adminPhone,
          userPassword: editForm.userPassword || undefined,
        }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.error || "수정 실패");
      toast.success("수정되었습니다.");
      setEditAdmin(null);
      fetchAdmins();
    } catch (err: any) {
      toast.error(err.message || "수정 실패");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">관리자 계정 목록</h2>
      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-2 border">아이디</th>
              <th className="py-2 px-2 border">이름</th>
              <th className="py-2 px-2 border">전화번호</th>
              <th className="py-2 px-2 border">수정</th>
              <th className="py-2 px-2 border">삭제</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.memberId} className="text-center">
                <td className="border px-2 py-1">{admin.userId}</td>
                <td className="border px-2 py-1">{admin.adminName}</td>
                <td className="border px-2 py-1">{admin.adminPhone}</td>
                <td className="border px-2 py-1">
                  <Button size="sm" variant="outline" onClick={() => handleEditClick(admin)}>
                    수정
                  </Button>
                </td>
                <td className="border px-2 py-1">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(admin)}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* 수정 모달/폼 */}
      {editAdmin && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
            <h3 className="text-lg font-bold mb-4">관리자 정보 수정</h3>
            <div className="space-y-2">
              <div>
                <Label>이름</Label>
                <Input name="adminName" value={editForm.adminName} onChange={handleEditChange} />
              </div>
              <div>
                <Label>전화번호</Label>
                <Input name="adminPhone" value={editForm.adminPhone} onChange={handleEditChange} />
              </div>
              <div>
                <Label>비밀번호 변경 (선택)</Label>
                <Input name="userPassword" type="password" value={editForm.userPassword} onChange={handleEditChange} placeholder="새 비밀번호(미입력시 변경 없음)" />
              </div>
            </div>
            <div className="flex gap-2 mt-4 justify-end">
              <Button variant="outline" onClick={() => setEditAdmin(null)} disabled={editLoading}>취소</Button>
              <Button onClick={handleEditSave} disabled={editLoading}>{editLoading ? "저장 중..." : "저장"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 메인 페이지
const AdminManagementPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setShowForm(false);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="py-10">
      <div className="flex justify-center mb-6">
        <Button onClick={() => setShowForm((v) => !v)}>
          {showForm ? "닫기" : "관리자 계정 생성"}
        </Button>
      </div>
      {showForm && <AdminRegister onSuccess={handleSuccess} />}
      <AdminList key={refreshKey} />
    </div>
  );
};

export default AdminManagementPage;