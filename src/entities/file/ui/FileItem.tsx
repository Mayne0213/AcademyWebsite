
import { Download, Eye } from 'lucide-react';
import { getFileIcon, isPreviewable, getDownloadUrl } from '@/src/entities/file';
import { toast } from 'sonner';

interface FileItemProps {
  file: {
    fileType?: string;
    announcementFileType?: string;
    originalName?: string;
    announcementFileOriginalName?: string;
    announcementFileKey?: string;
    key?: string;
    url?: string;
  };
}

const FileItem = ({ file }: FileItemProps) => {
  const fileType = file.fileType || file.announcementFileType;
  const fileName = file.originalName || file.announcementFileOriginalName;
  const fileKey = file.key || file.announcementFileKey || file.url;

  // 파일 다운로드 핸들러
  const handleFileDownload = async () => {
    if (!fileKey) {
      toast.error('파일 키가 없습니다.');
      return;
    }

    try {
      const downloadUrl = await getDownloadUrl(fileKey);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'download';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error('파일 다운로드에 실패했습니다.');
    }
  };

  // 파일 미리보기 핸들러
  const handleFilePreview = async () => {
    if (!fileKey) {
      toast.error('파일 키가 없습니다.');
      return;
    }

    try {
      const downloadUrl = await getDownloadUrl(fileKey);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      toast.error('파일 미리보기에 실패했습니다.');
    }
  };

  if (!fileType || !fileName || !fileKey) {
    return null;
  }

  return (
    <div onClick={handleFileDownload} className={`flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer`}>
      <div className="flex items-center space-x-3 flex-1">
        {getFileIcon(fileType)}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {fileName}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-3">
        {/* 미리보기 버튼 (PDF, 이미지 등) */}
        {isPreviewable(fileType) && (
          <button
            onClick={handleFilePreview}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
            title="미리보기"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileItem; 