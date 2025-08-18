import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // /home 경로는 JWT 검증 없이 즉시 통과 (로그아웃 성능 최적화)
  if (pathname === "/home" || pathname.startsWith("/home/")) {
    // 로그인 페이지에서만 토큰 체크 (리다이렉트용)
    if (pathname.startsWith("/home/signIn") || pathname.startsWith("/home/signUp")) {
      const token = req.cookies.get("token")?.value;
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET);
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } catch {
          // 토큰이 유효하지 않으면 그대로 진행
        }
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/main")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/home/signIn", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);

      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return NextResponse.next();
    } catch (err: any) {
      console.error("JWT verify error:", err);
      return NextResponse.redirect(new URL("/home/signIn", req.url));
    }
  }

  // ADMIN only: /dashboard/announcement/add, /dashboard/announcement/edit, /dashboard/announcement/edit/...
  if (
    pathname === "/dashboard/announcement/add" ||
    pathname.startsWith("/dashboard/announcement/edit")
  ) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/home/signIn", req.url));
    }
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (err: any) {
      console.error("JWT verify error:", err);
      return NextResponse.redirect(new URL("/home/signIn", req.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/home/signIn", req.url));
    }
  }



  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/home/signUp",
    "/home/signIn",
    "/main/:path*",
    "/dashboard/:path*",
  ],
};
