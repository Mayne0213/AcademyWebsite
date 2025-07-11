"use client"

import React, { useRef } from "react";

const UploadTextbook = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadedFileName, setUploadedFileName] = React.useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadedFileName(e.target.files[0].name);
        }
    };

    return(
        <section
            className={`w-full border border-dashed border-gray-300 rounded-lg items-center justify-center flex flex-col cursor-pointer hover:bg-blue-50 transition-colors h-[160px]`}
            onClick={() => inputRef.current?.click()}
        >
            <label htmlFor="upload-file" className="text-blue-600 font-semibold text-lg cursor-pointer">
            + 교재 PDF 파일 업로드
            </label>
            <input
            id="upload-file"
            type="file"
            accept=".pdf"
            className="hidden"
            ref={inputRef}
            onChange={handleFileChange}
            />
            {uploadedFileName && (
            <p className="mt-3 text-gray-700">
                업로드할 파일: <span className="font-mono">{uploadedFileName}</span>
            </p>
            )}
        </section>
    );
}

export default UploadTextbook;