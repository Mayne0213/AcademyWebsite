import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Academy } from "@/components/type/academyType";
import S3ImageUploadMultiple from "@/components/s3ImageUploadMultiple";

interface EditAcademyProps {
  academy: Academy;
  onUpdate: (academy: Academy) => void;
  onCancel: () => void;
}

const EditAcademy: React.FC<EditAcademyProps> = ({
  academy,
  onUpdate,
  onCancel,
}) => {
  const [form, setForm] = useState({
    academyName: academy.academyName,
    academyPhone: academy.academyPhone,
    academyAddress: academy.academyAddress,
  });

  const [images, setImages] = useState(academy.images || []);
  const [mainImageUrl, setMainImageUrl] = useState(academy.mainImageUrl || "");

  useEffect(() => {
    setForm({
      academyName: academy.academyName,
      academyPhone: academy.academyPhone,
      academyAddress: academy.academyAddress,
    });
  }, [academy]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (files: { url: string; name: string; type: string }[]) => {
    // 이미지 파일만 허용
    const imageFiles = files.filter(f => f.type && f.type.startsWith("image/"));
    setImages(imageFiles);
    // 대표 이미지가 없으면 첫 번째로 자동 지정
    if (imageFiles.length > 0 && !mainImageUrl) {
      setMainImageUrl(imageFiles[0].url);
    }
    // 대표 이미지가 삭제된 경우 자동 변경
    if (mainImageUrl && !imageFiles.find(f => f.url === mainImageUrl)) {
      setMainImageUrl(imageFiles[0]?.url || "");
    }
  };

  const handleSubmit = () => {
    if (!form.academyName.trim()) {
      alert("단과 이름을 입력해 주세요.");
      return;
    }
    onUpdate({
      ...academy,
      academyName: form.academyName,
      academyPhone: form.academyPhone,
      academyAddress: form.academyAddress,
      images,
      mainImageUrl,
    });
    onCancel();
  };

  return (
    <div>
      <h1 className="text-xl ml-2 mb-2">단과 수정</h1>
      <input
        type="text"
        name="academyName"
        value={form.academyName}
        onChange={handleChange}
        placeholder="단과 이름"
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyPhone"
        value={form.academyPhone}
        onChange={handleChange}
        placeholder="전화번호 (선택)"
        className="w-full border p-2 mb-2"
      />
      <input
        type="text"
        name="academyAddress"
        value={form.academyAddress}
        onChange={handleChange}
        placeholder="주소 (선택)"
        className="w-full border p-2 mb-2"
      />
      <S3ImageUploadMultiple 
        onUploadComplete={handleImageUpload} 
        initialFiles={images} 
      />
      {images.length > 0 && (
        <div className="mb-2">
          <label className="block text-sm font-semibold mb-1">대표 이미지 선택</label>
          <select
            className="w-full border p-2"
            value={mainImageUrl}
            onChange={e => setMainImageUrl(e.target.value)}
          >
            {images.map(img => (
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
          저장
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

export default EditAcademy;
