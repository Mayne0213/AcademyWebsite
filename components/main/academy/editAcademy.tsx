import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Academy, AcademyImage } from "@/entities/academy/model/types";
import { FileUploadMultiple } from "@/entities/file";

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

  const [images, setImages] = useState<AcademyImage[]>(academy.academyImages || []);
  const [mainImageUrl, setMainImageUrl] = useState(academy.academyMainImage || "");

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
    const academyImages: AcademyImage[] = imageFiles.map(f => ({
      academyImageId: 0,
      academyImageUrl: f.url,
      academyImageName: f.name,
      academyId: academy.academyId,
      createdAt: new Date(),
      academy: academy
    }));
    setImages(academyImages);

    // 대표 이미지가 없으면 첫 번째로 자동 지정
    if (academyImages.length > 0 && !mainImageUrl) {
      setMainImageUrl(academyImages[0].academyImageUrl);
    }
    // 대표 이미지가 삭제된 경우 자동 변경
    if (mainImageUrl && !academyImages.find(img => img.academyImageUrl === mainImageUrl)) {
      setMainImageUrl(academyImages[0]?.academyImageUrl || "");
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
      academyMainImage: mainImageUrl,
      academyImages: images,
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
      <FileUploadMultiple
        onUploadComplete={handleImageUpload} 
        initialFiles={images.map(img => ({
          url: img.academyImageUrl,
          name: img.academyImageName || "",
          type: "image/jpeg" // 기본 이미지 타입으로 설정
        }))}
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
              <option key={img.academyImageId} value={img.academyImageUrl}>
                {img.academyImageName || "이미지"}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="w-full flex justify-end">
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white p-4 rounded mr-2"
        >
          수정
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
