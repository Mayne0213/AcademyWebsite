// 공통 헤더
const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
});

// 인증 헤더 (쿠키 포함)
const getAuthHeaders = () => ({
  ...getDefaultHeaders(),
  credentials: 'include' as const,
});


// 기본 fetch 래퍼
const apiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      // JSON 응답인지 확인하고 message 필드 추출
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          // 에러 정보를 포함한 Response 객체 생성
          const errorResponse = new Response(JSON.stringify({ success: false, message: errorJson.message }), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
          return errorResponse;
        } else {
          const errorResponse = new Response(JSON.stringify({ success: false, message: errorText }), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
          return errorResponse;
        }
      } catch (parseError) {
        // JSON 파싱 실패 시 원본 텍스트 사용
        const errorResponse = new Response(JSON.stringify({ success: false, message: errorText }), {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
        return errorResponse;
      }
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// GET 요청
export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url);
  return response.json();
};

// POST 요청
export const apiPost = async <T>(
  url: string,
  data: any
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

// PUT 요청
export const apiPut = async <T>(
  url: string,
  data: any
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.json();
};

// DELETE 요청
export const apiDelete = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'DELETE',
  });
  return response.json();
};

// 인증 GET 요청
export const apiGetWithAuth = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url, {
    headers: getAuthHeaders(),
  });
  return response.json();
};

// 인증 POST 요청
export const apiPostWithAuth = async <T>(
  url: string,
  data: any
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: getAuthHeaders(),
  });
  return response.json();
};

// 인증 PUT 요청
export const apiPutWithAuth = async <T>(
  url: string,
  data: any
): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: getAuthHeaders(),
  });
  return response.json();
};

// 인증 DELETE 요청
export const apiDeleteWithAuth = async <T>(url: string): Promise<T> => {
  const response = await apiRequest(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return response.json();
};