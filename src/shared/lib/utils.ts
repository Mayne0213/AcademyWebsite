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

