import React from 'react';

interface JsonLdProps {
  data: object;
}

/**
 * JSON-LD 구조화 데이터를 HTML에 삽입하는 컴포넌트
 * 
 * @description
 * Google 검색 엔진이 웹사이트 정보를 이해할 수 있도록
 * Schema.org 형식의 구조화된 데이터를 <script> 태그로 삽입합니다.
 * 
 * @example
 * ```tsx
 * import { JsonLd } from '@/src/shared/seo/JsonLd';
 * import { academySchema } from '@/src/app/config/schemas';
 * 
 * <JsonLd data={academySchema} />
 * ```
 * 
 * @param data - Schema.org 형식의 JSON-LD 객체
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

