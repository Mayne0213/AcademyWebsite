import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
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

  if (
    pathname.startsWith("/home/signIn") ||
    pathname.startsWith("/home/signUp")
  ) {
    const token = req.cookies.get("token")?.value;

    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
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
