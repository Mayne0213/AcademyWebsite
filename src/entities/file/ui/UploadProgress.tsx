import React from 'react';

interface UploadProgressProps {
  uploadProgress: Record<string, number>;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ uploadProgress }) => {
  if (Object.keys(uploadProgress).length === 0) return null;

  return (
    <div className="w-full max-w-xs space-y-2">
      {Object.entries(uploadProgress).map(([fileName, progress]) => (
        <div key={fileName} className="text-xs">
          <div className="flex justify-between mb-1">
            <span className="truncate">{fileName}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { UploadProgress }; 