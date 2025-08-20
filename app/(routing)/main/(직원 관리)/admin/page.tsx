"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Modal } from "@/src/shared/ui";
import { useAdminStore } from "@/src/entities/admin/model/store";
import { AdminCreate, AdminRead } from "@/src/features/adminCRUD";

// 메인 페이지
const AdminPage = () => {
  const { admins } = useAdminStore();
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4 smalltablet:mb-6">
        <div className="flex items-center gap-2 smalltablet:gap-3">
          <h1 className="text-2xl smalltablet:text-2xl tablet:text-2xl desktop:text-3xl font-sansKR-Bold">
            직원 관리
          </h1>
          <span className="text-xs flex items-center justify-center text-center smalltablet:text-sm tablet:text-base text-gray-500 bg-gray-100 px-2 smalltablet:px-3 py-1 rounded-lg smalltablet:rounded-full">
            총 {admins.length}명
          </span>
        </div>
        <Plus
          className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
          onClick={() => setShowForm(!showForm)}
        />
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="관리자 계정 생성"
        size="lg"
      >
        <AdminCreate onClose={() => setShowForm(false)} />
      </Modal>

      <AdminRead />
    </main>
  );
};

export default AdminPage;