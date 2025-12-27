import React from "react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// YouTube URL에서 video ID를 추출하는 함수
export const extractYouTubeVideoId = (content: string): string | null => {
  if (!content || typeof content !== 'string') {
    return null;
  }

  const youtubePatterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/g,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)\?t=\d+/g,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)&list=([a-zA-Z0-9_-]+)/g,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)\??[a-zA-Z0-9_=&-]*/g,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/g,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]+)/g,
  ];

  for (const pattern of youtubePatterns) {
    const matches = [...content.matchAll(pattern)];
    if (matches.length > 0) {
      return matches[0][1];
    }
  }

  return null;
};

// 텍스트 내의 URL을 하이퍼링크로 변환하는 함수
export const convertUrlsToLinks = (text: string): (string | React.ReactElement)[] => {
  if (!text || typeof text !== 'string') {
    return [text];
  }

  // http:// 또는 https://로 시작하는 URL 패턴
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = urlPattern.exec(text)) !== null) {
    // URL 이전의 텍스트 추가
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // URL을 링크로 변환
    const url = match[0];
    parts.push(
      React.createElement(
        'a',
        {
          key: key++,
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'text-blue-600 hover:text-blue-800 underline break-all',
        },
        url
      )
    );

    lastIndex = match.index + match[0].length;
  }

  // 마지막 URL 이후의 텍스트 추가
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // URL이 없는 경우 원본 텍스트 반환
  if (parts.length === 0) {
    return [text];
  }

  return parts;
};

