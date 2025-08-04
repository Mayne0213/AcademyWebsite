"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SignedImageProps {
  fileKey: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

const SignedImage: React.FC<SignedImageProps> = ({
  fileKey,
  alt,
  className = "",
  fill = false,
  sizes
}) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        const response = await fetch('/api/files/download-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileKey: fileKey,
          }),
        });

        if (!response.ok) {
          throw new Error('서명된 URL 생성에 실패했습니다.');
        }

        const { downloadUrl } = await response.json();
        setSignedUrl(downloadUrl);
      } catch (error) {
        console.error('서명된 URL 생성 실패:', error);
        setError('이미지를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    getSignedUrl();
  }, [fileKey]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !signedUrl) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 ${className}`}>
        <span className="text-gray-500 text-sm">{error || '이미지 없음'}</span>
      </div>
    );
  }

  return (
    <Image
      src={signedUrl}
      alt={alt}
      fill={fill}
      sizes={sizes}
      className={className}
    />
  );
};

export default SignedImage; 