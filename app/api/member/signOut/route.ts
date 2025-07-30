import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 쿠키에서 토큰 혹은 세션 정보가 있으면 삭제
    // Set-Cookie 헤더를 통해 쿠키 만료 처리 (브라우저가 쿠키 삭제)
    const response = NextResponse.json({ success: true, message: "로그아웃 성공" });

    // 보통 토큰 저장 쿠키 이름이 'token' 이라 가정
    response.cookies.set({
      name: "token",
      value: "",
      path: "/",         // 쿠키 경로에 맞게
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,         // 즉시 만료시키기
    });

    // 필요하다면 다른 인증 관련 쿠키들도 삭제 처리

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "로그아웃 실패" },
      { status: 500 }
    );
  }
}
