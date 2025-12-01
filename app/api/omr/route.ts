import { NextRequest, NextResponse } from 'next/server';

// FastAPI 서버 URL (환경변수로 설정 가능)
const OMR_API_URL = process.env.OMR_API_URL || 'https://joossameng.kro.kr';

// 개발 환경에서 SSL 인증서 검증 우회 (프로덕션에서는 사용하지 않음)
if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const imageFile = formData.get('image') as File;
    const correctAnswers = formData.get('correctAnswers') as string;
    const questionScores = formData.get('questionScores') as string;
    const questionTypes = formData.get('questionTypes') as string;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: '이미지 파일이 필요합니다' },
        { status: 400 }
      );
    }

    // JSON 파싱 검증
    try {
      JSON.parse(correctAnswers);
      JSON.parse(questionScores);
      JSON.parse(questionTypes);
    } catch (parseError) {
      console.error('FormData 파싱 오류:', parseError);
      return NextResponse.json(
        { success: false, message: '잘못된 데이터 형식입니다' },
        { status: 400 }
      );
    }

    // FastAPI 서버로 전송할 FormData 생성
    const apiFormData = new FormData();
    apiFormData.append('image', imageFile);
    apiFormData.append('correct_answers', correctAnswers);
    apiFormData.append('question_scores', questionScores);
    apiFormData.append('question_types', questionTypes);

    // FastAPI 서버에 요청
    const apiUrl = `${OMR_API_URL}/api/omr/grade`;
    console.log(`OMR API 요청 시작: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: apiFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FastAPI 서버 오류:', response.status, errorText);
      return NextResponse.json(
        { success: false, message: `OMR 서버 오류: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();

    if (result.error || result.detail) {
      return NextResponse.json(
        { success: false, message: result.error || result.detail },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('OMR API 전체 오류:', error);
    
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: '잘못된 JSON 형식입니다' },
        { status: 400 }
      );
    }

    // 네트워크 오류 처리
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { success: false, message: 'OMR 서버에 연결할 수 없습니다' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'OMR 채점 처리 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
