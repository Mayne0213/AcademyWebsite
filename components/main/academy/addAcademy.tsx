import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUploadMultiple } from "@/entities/file";

interface AcademyFormInput {
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  images: { url: string; name: string; type: string }[]; // 이미지 정보
  mainImageUrl?: string; // 대표 이미지
}

interface AddAcademyProps {
  onAdd: (academy: Omit<AcademyFormInput, "academyId" | "createdAt">) => void;
  onCancel: () => void;
}

const AddAcademy: React.FC<AddAcademyProps> = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState<AcademyFormInput>({
    academyName: "",
    academyPhone: "",
    academyAddress: "",
    images: [],
    mainImageUrl: "",
  });
  const [files, setFiles] = useState<{ url: string; name: string; type: string }[]>([]);
  const [mainImageUrl, setMainImageUrl] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.academyName.trim()) {
      alert("단과 이름을 입력해 주세요.");
      return;
    }
    onAdd({
      academyName: form.academyName,
      academyPhone: form.academyPhone,
      academyAddress: form.academyAddress,
      images: files,
      mainImageUrl,
    });
    setForm({ academyName: "", academyPhone: "", academyAddress: "", images: [], mainImageUrl: "" });
    setFiles([]);
    setMainImageUrl("");
    onCancel();
  };

  return (
    <div className="rounded-md border-2 p-4 mb-4">
      <h1 className="text-xl ml-2 mb-2">신규 단과 추가</h1>
      <input
        type="text"
        name="academyName"
        value={form.academyName}
        onChange={handleChange}
        placeholder="단과 이름"
        required
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyPhone"
        value={form.academyPhone}
        onChange={handleChange}
        placeholder="전화번호"
        required
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyAddress"
        value={form.academyAddress}
        onChange={handleChange}
        placeholder="주소"
        required
        className="w-full border p-2 mb-2"
      />
      <FileUploadMultiple
        onUploadComplete={setFiles} 
        initialFiles={files} 
      />
      {files.length > 0 && (
        <div className="mb-2">
          <label className="block text-sm font-semibold mb-1">대표 이미지 선택</label>
          <select
            className="w-full border p-2"
            value={mainImageUrl}
            onChange={e => setMainImageUrl(e.target.value)}
          >
            {files.map(img => (
              <option key={img.url} value={img.url}>{img.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="w-full flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded mr-2"
        >
          추가
        </Button>
        <Button
          onClick={onCancel}
          className="bg-green-500 hover:bg-green-700 text-white p-4 rounded"
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default AddAcademy;
