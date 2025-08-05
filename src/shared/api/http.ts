import { toast } from "sonner";

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
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getDefaultHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    let errorMessage = errorText;

    // JSON 응답인지 확인하고 message 필드 추출
    try {
      const errorJson = JSON.parse(errorText);
      
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch (parseError) {}

    throw new Error(errorMessage);
  }

  return response;
};

// GET 요청
export const apiGet = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiRequest(url);
    const result = await response.json();

    // success 필드가 있고 data 필드가 있으면 data를 반환
    if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
      return result.data;
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// POST 요청
export const apiPost = async <T>(
  url: string,
  data: any
): Promise<T> => {
  try {
    const response = await apiRequest(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    const result = await response.json();

    // success 필드가 있고 data 필드가 있으면 data를 반환
    if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
      return result.data;
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// PUT 요청
export const apiPut = async <T>(
  url: string,
  data: any
): Promise<T> => {
  try {
    const response = await apiRequest(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    const result = await response.json();

    // success 필드가 있고 data 필드가 있으면 data를 반환
    if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
      return result.data;
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// DELETE 요청
export const apiDelete = async <T>(url: string): Promise<T> => {
  try {
    const response = await apiRequest(url, {
      method: 'DELETE',
    });
    const result = await response.json();

    // success 필드가 있고 data 필드가 있으면 data를 반환
    if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
      return result.data;
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
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