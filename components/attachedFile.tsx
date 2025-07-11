"use client";

import Image from "next/image";
import { File, FileText, FileSpreadsheet, FileAudio } from "lucide-react";

// 확장자에 따라 아이콘 반환
const getFileIcon = (ext: string) => {
  switch (ext) {
    case "pdf":
    case "docx":
    case "hwp":
    case "hwpx":
      return <FileText className="w-5 h-5 text-gray-600" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
    case "mp3":
    case "mpeg":
      return <FileAudio className="w-5 h-5 text-orange-600" />;
    default:
      return <File className="w-5 h-5 text-gray-500" />;
  }
};

// 이미지인지 확인
const isImageFile = (url: string) => {
  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  console.log("isImageFile check:", { url, isImage });
  return isImage;
};

// 오디오 파일인지 확인
const isAudioFile = (url: string) => /\.(mp3|mpeg)$/i.test(url);

// 다운로드 가능한 파일인지 확인
const isDownloadableFile = (url: string) => {
  return /\.(pdf|hwp|hwpx|docx|xls|xlsx|mp3|mpeg)$/i.test(url);
};

interface Props {
  files?: {
    url: string;
    name: string;
    type: string;
  }[];
  fileUrl?: string;
  isCompact?: boolean;
}

const AttachedFile: React.FC<Props> = ({ files, fileUrl, isCompact }) => {
  console.log("AttachedFile props:", { files, fileUrl, isCompact });
  
  // If both files and fileUrl are falsy or null, return null early
  if ((!files || files.length === 0) && (!fileUrl || fileUrl === null)) {
    return null;
  }
  
  let displayFiles = files;
  if ((!files || files.length === 0) && fileUrl) {
    // fileUrl만 있는 경우(예: QnA)
    displayFiles = [
      {
        url: fileUrl,
        name: decodeURIComponent(fileUrl.split("/").pop() || "첨부파일"),
        type: fileUrl.split(".").pop() || "",
      },
    ];
  }
  console.log("displayFiles:", displayFiles);
  
  if (!displayFiles || displayFiles.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {displayFiles.map((file, idx) => {
        const { url, name, type } = file;
        if (!url) return null;
        const fileExt = url.split(".").pop()?.toLowerCase() || "";
        if (isImageFile(url)) {
          console.log("이미지 렌더링:", { url, name, type });
          return (
            <div key={idx} className="relative w-full rounded-lg border border-gray-200 shadow-sm">
              <Image
                src={url}
                alt={name}
                width={800}
                height={isCompact ? 300 : 500}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  console.error("이미지 로드 실패:", url);
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
                onLoad={() => {
                  console.log("이미지 로드 성공:", url);
                }}
              />
              <p className="text-xs text-gray-500 mt-1">{name}</p>
            </div>
          );
        } else if (isAudioFile(url)) {
          return (
            <div key={idx} className="flex flex-col gap-1 border rounded-md p-3 bg-gray-50 shadow-sm">
              {getFileIcon(fileExt)}
              <audio controls src={url} className="w-full mt-1">
                Your browser does not support the audio element.
              </audio>
              <span className="text-xs text-gray-500">{name}</span>
            </div>
          );
        } else if (isDownloadableFile(url)) {
          return (
            <div key={idx} className="flex items-center gap-2 border rounded-md p-3 bg-gray-50 shadow-sm">
              {getFileIcon(fileExt)}
              <a
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {name}
              </a>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default AttachedFile;
